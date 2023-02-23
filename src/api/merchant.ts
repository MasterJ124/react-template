import { $get, $post } from '@/utils/axios';

// 商户列表
export async function getMerchantList(parameter: any): Promise<any> {
  return $get('/admin/merchant/list', parameter);
}

// 启用禁用
export async function setMerchantStatus(parameter: any): Promise<any> {
  return $post('/admin/merchant/status', parameter);
}

// 审核
export async function merchantCheck(parameter: any): Promise<any> {
  return $post('/admin/merchant/check', parameter);
}
