//  请求token别名
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
// 用户信息
export const USER_INFO = 'USER_INFO';
// 商户类型
export const MERCHANT_TYPE = [
  //{
  //  value: 0,
  //  label: '全部',
  //},
  {
    value: 1,
    label: 'MCN',
  },
  {
    value: 2,
    label: '供应商',
  },
  //{
  //  value: 3,
  //  label: '个体工商户',
  //},
];
// 审核状态
export const AUDIT_STATUS = [
  {
    value: 0,
    label: '全部',
  },
  {
    value: 1,
    label: '审核通过',
  },
  {
    value: 2,
    label: '审核拒绝',
  },
  {
    value: 3,
    label: '待审核',
  },
];
// 商户状态
export const MERCHANT_STATUS = [
  {
    value: 0,
    label: '全部',
  },
  {
    value: 1,
    label: '启用',
  },
  {
    value: 2,
    label: '禁用',
  },
];
