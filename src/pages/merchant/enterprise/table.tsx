import React from 'react';
import { Space, Table, Tag } from 'antd';

const { Column, ColumnGroup } = Table;
interface PropsType {
  list: any;
}
const UserTable: React.FC<PropsType> = ({ list }) => {
  return (
    <Table dataSource={list}>
      <Column title="ID" dataIndex="id" key="id" />
      <Column title="公司名称" dataIndex="user" key="user" />
      <Column title="统一社会信用代码" dataIndex="userId" key="userId" />
      <Column title="营业期限" dataIndex="mobile" key="mobile" />
      <Column title="审核状态" dataIndex="name" key="name" />
      <Column title="商户状态" dataIndex="shop" key="shop" />
      <Column title="经营" dataIndex="status" key="status" />
      <Column
        title="操作"
        render={(_: any, record: any) => (
          <Space size="middle">
            <a>禁用</a>
            <a>启用</a>
          </Space>
        )}
      />
    </Table>
  );
};

export default UserTable;
