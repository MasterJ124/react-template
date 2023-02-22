import React from 'react';
import { Space, Table, Tag } from 'antd';

const { Column, ColumnGroup } = Table;
interface PropsType {
  list: any;
}
const UserTable: React.FC<PropsType> = ({ list }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record: any) => <p>{record.company_info.id}</p>,
    },
    {
      title: '公司名称',
      key: 'title',
      render: (text, record: any) => <p>{record.company_info.title}</p>,
    },
    {
      title: '统一社会信用代码',
      key: 'title',
      render: (text, record: any) => <p>{record.company_info.cert_code}</p>,
    },
    {
      title: '营业期限',
      key: 'title',
      render: (text, record: any) => (
        <p>
          {record.company_info.company_end_at
            ? record.company_info.company_start_at + '-' + record.company_info.company_end_at
            : '长期'}
        </p>
      ),
    },
    {
      title: '审核状态',
      key: 'status',
      render: (text, record: any) => <p>{record.status}</p>,
    },
    {
      title: '商户状态',
      key: 'company_status',
      render: (text, record: any) => <p>{record.company_info.status}</p>,
    },
    {
      title: '经营',
      key: 'address',
      render: (text, record: any) => <p>{record.company_info.address}</p>,
    },
    {
      title: '操作',
      key: 'opea',
      render: (text, record: any) => <p>{record.status}</p>,
    },
  ];
  return <Table dataSource={list} columns={columns} />;
};

export default UserTable;
