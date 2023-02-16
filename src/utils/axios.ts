import axios, { AxiosRequestHeaders, AxiosResponse, AxiosError } from 'axios';
import { notification } from 'antd';
import { ACCESS_TOKEN } from './config';
import ls from './Storage';
import { clearUserInfo } from './util';

// 创建 axios 实例   withCredentials: true,
const service = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000 * 60 * 3, // 请求超时时间
  responseType: 'json',
  headers: {},
});

// 异常拦截处理器
const errorHandler = (error: AxiosError) => {
  if (error && error.message && error.message.includes('timeout')) {
    notification.error({
      message: '请求超时',
      description: '请重试',
      duration: 0,
    });
  }
  if ((error as any).data) {
    const data = (error as any).data;
    if (data.code === 403) {
      notification.error({
        message: '请求错误',
        description: data.message,
      });
    }
  }
  return Promise.reject(error);
};

// 请求拦截
service.interceptors.request.use((config) => {
  if (!navigator.onLine) {
    notification.error({
      message: '网络断开',
      description: '请检查网络',
    });
  }
  if (!config?.headers?.Authorization) {
    const token = ls.get(ACCESS_TOKEN);
    (config.headers as AxiosRequestHeaders)['X-Token'] = token;
  }
  return config;
}, errorHandler);

// 响应拦截
let hasExist = false;

service.interceptors.response.use((res: AxiosResponse<any>) => {
  // 身份已失效，请重新登录
  if (res.data.code === 4001) {
    if (!hasExist) hasExist = true;
    hasExist = true;
    notification.error({
      message: '提示',
      description: '身份已失效，请重新登录',
    });
    // 登出操作
  } else {
    hasExist = false;
  }
  return res.data;
}, errorHandler);

// 通用get
const $get = (url: string, params?: object, _object = {}): Promise<any> => {
  return service.get(url, { params, ..._object });
};
// 通用post
const $post = (url: string, params?: object, _object = {}): Promise<any> => {
  return service.post(url, params, _object);
};

export { $get, $post };

export { service as axios };
