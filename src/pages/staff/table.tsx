import React from 'react';
import { Space, Table, Tag } from 'antd';

const { Column, ColumnGroup } = Table;

interface DataType {
  id: number;
  user: string;
  userId: number;
  mobile: string;
  name: string;
}

const data: DataType[] = [
  {
    id: 324325345,
    user: '李某某',
    userId: 324325345,
    mobile: '18616318730',
    name: 'xcxcvxcvx',
  },
];

const UserTable: React.FC = () => (
  <Table dataSource={data}>
    <Column title="ID" dataIndex="id" key="id" />
    <Column title="用户名称" dataIndex="user" key="user" />
    <Column title="手机号" dataIndex="mobile" key="mobile" />
    <Column title="用户ID" dataIndex="userId" key="userId" />
    <Column title="角色" dataIndex="name" key="name" />
    <Column title="授权状态" dataIndex="status" key="status" />
    <Column title="最近登录时间" dataIndex="remark" key="remark" />
  </Table>
);

export default UserTable;
