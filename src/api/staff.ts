import { $get, $post } from '@/utils/axios';

// 员工列表
export async function getMemberList(parameter: any): Promise<any> {
  return $get('/member/memberList', parameter);
}

// 添加员工
export async function addMember(parameter: any): Promise<any> {
  return $post('/member/add', parameter);
}

// 启用、禁用员工
export async function memberSwitch(parameter: any): Promise<any> {
  return $post('/member/memberSwitch', parameter);
}

// 获取角色列表
export async function getRoleList(parameter?: any): Promise<any> {
  return $get(`/role/getRoleList`, parameter);
}
