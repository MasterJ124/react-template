import { $get, $post } from '@/utils/axios';

// 用户列表
export async function getUserList(parameter: any): Promise<any> {
  return $get('/userManage/getList', parameter);
}
