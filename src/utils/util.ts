import { message } from 'antd';
import ls from './Storage';
import { ACCESS_TOKEN, COMPANY_ID } from '@/utils/config';
import { store } from '@/app/store';
import { setUserInfo } from '@/features/userInfoSlice';
// api
import { getUserInfo } from '@/api/login';

// 获取用户信息
export function fetchUserInfo() {
  const token = ls.get(ACCESS_TOKEN);
  if (!token) return;
  getUserInfo()
    .then((res) => {
      const { data, code, message } = res;
      if (code !== 0) {
        message.error(message);
        return;
      }
      if (data?.company?.company_id) ls.set(COMPANY_ID, data.company.company_id);
      store.dispatch(setUserInfo(data));
    })
    .catch((err) => {
      message.error(err.message);
    });
}
// 清空用户信息
export function clearUserInfo() {
  store.dispatch(setUserInfo({}));
  ls.clear();
}
