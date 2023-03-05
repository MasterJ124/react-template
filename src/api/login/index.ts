import { $get, $post } from '@/utils/axios';

// 用户登录
export async function login(parameter: any): Promise<any> {
  return $post('/user/login', parameter);
}

/**
 * 获取用户信息
 */
export async function getUserInfo(): Promise<any> {
  return $get('/user/info');
}

/**
 * 获取用户角色
 */
export async function getMyRoleList(): Promise<any> {
  return $get('/role/getMyRoleList');
}

// 发送短信
export async function smsSend(parameter: any): Promise<any> {
  return $post('/sms/send', parameter);
}

// 退出登录
export async function logout(): Promise<any> {
  return $post('/user/logout');
}
