import { $get, $post } from '@/utils/axios';

// 用户列表
export async function getUserList(parameter: any): Promise<any> {
  return $get('/userManage/getList', parameter);
}

// 用户公司列表
export async function getUserCompanyList(parameter: any): Promise<any> {
  return $get('/user/company_list', parameter);
}

// 启用禁用成员
export async function setMemberSwitch(parameter: any): Promise<any> {
  return $post('/member/memberSwitch', parameter);
}
