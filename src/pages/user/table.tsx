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
    <Column title="用户名" dataIndex="user" key="user" />
    <Column title="用户ID" dataIndex="userId" key="userId" />
    <Column title="手机号码" dataIndex="mobile" key="mobile" />
    <Column title="真实姓名" dataIndex="name" key="name" />
    <Column title="所属商户" dataIndex="shop" key="shop" />
    <Column title="状态" dataIndex="status" key="status" />
    <Column title="备注" dataIndex="remark" key="remark" />
    <Column
      title="操作"
      key="action"
      render={(_: any, record: DataType) => (
        <Space size="middle">
          <a>禁用</a>
          <a>启用</a>
        </Space>
      )}
    />
  </Table>
);

export default UserTable;
