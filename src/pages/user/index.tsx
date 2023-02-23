import type { FC } from 'react';
import { Form, Input, Button, Row, Col, message, Select, Table, Pagination, Card } from 'antd';
import { useState, useEffect } from 'react';
import type { PaginationProps } from 'antd';
import { getUserList } from '@/api/user';
import { USER_STATUS } from '@/utils/config';

const User: FC = () => {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'app_id',
      width: 60,
      key: 'app_id',
    },
    {
      title: '用户名',
      key: 'nickname',
      dataIndex: 'nickname',
      width: 140,
    },
    {
      title: '用户ID',
      key: 'user_id',
      dataIndex: 'user_id',
      width: 140,
    },
    {
      title: '手机号',
      key: 'phone',
      dataIndex: 'phone',
      width: 140,
    },
    {
      title: '真实姓名',
      key: 'name',
      width: 100,
      dataIndex: 'name',
    },
    {
      title: '所属商户',
      key: 'title',
      dataIndex: 'title',
      width: 120,
    },
    {
      title: '状态',
      key: 'status',
      width: 120,
      render: (text, record: any) => (
        <div>
          {record.status === 1 && <p>启用</p>}
          {record.status === 0 && <p>禁用</p>}
        </div>
      ),
    },
    {
      title: '备注',
      key: 'remark',
      dataIndex: 'remark',
      width: 120,
    },
    {
      title: '操作',
      key: 'opea',
      width: 80,
      fixed: 'right',
      render: (text, record: any) => (
        <div>
          {record.status === 0 && <a>启用</a>}
          {record.status === 1 && <a>禁用</a>}
        </div>
      ),
    },
  ];
  const search = (page: number, page_size: number) => {
    const data = form.getFieldsValue();
    const params = Object.assign({ page: page || current, page_size: page_size || pageSize }, data);
    getUserList(params).then((res) => {
      const { code, data, message } = res;
      if (code !== 0) {
        messageApi.open({
          type: 'error',
          content: message,
        });
      }
      setList(data?.lists || []);
      setTotal(data?.paginate?.total || 0);
    });
  };
  const showTotal: PaginationProps['showTotal'] = (total) => `共 ${total} 项数据`;
  const onShowSizeChange = async (current: number, size: number) => {
    setCurrent(current);
    setPageSize(size);
    search(current, size);
  };
  const reset = () => {
    form.resetFields();
    setCurrent(1);
    setPageSize(10);
    search(1, 10);
  };
  useEffect(() => {
    search(current, pageSize);
  }, []);
  return (
    <div className="user-container">
      <Card>
        <h4>用户管理</h4>
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Row gutter={12}>
            <Col span={6}>
              <Form.Item name="phone" label="手机号码">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="nickname" label="用户名">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="name" label="真实姓名">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="user_id" label="用户ID">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="company_name" label="所属商户">
                <Select placeholder="请选择" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label="状态">
                <Select placeholder="请选择" options={USER_STATUS} />
              </Form.Item>
            </Col>
            <Col
              span={6}
              offset={6}
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                style={{
                  marginRight: '16px',
                }}
                onClick={reset}
              >
                重置
              </Button>
              <Button type="primary" onClick={() => search(1, pageSize)}>
                查询
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <h4>用户管理列表</h4>
        <Table
          dataSource={list}
          rowKey={(record) => record.id}
          columns={columns}
          scroll={{ x: 1500 }}
          pagination={false}
        />
        <div
          style={{
            textAlign: 'right',
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}
        >
          <Pagination
            current={current}
            total={total}
            showTotal={showTotal}
            onChange={onShowSizeChange}
            showSizeChanger
            showQuickJumper
          />
        </div>
        {contextHolder}
      </Card>
    </div>
  );
};

export default User;
