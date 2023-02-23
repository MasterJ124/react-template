import type { FC } from 'react';
import { Form, Input, Button, Row, Col, message, Select, Table, Pagination } from 'antd';
import { useState, useEffect } from 'react';
import type { PaginationProps } from 'antd';
import '@/pages/login/index.less';
import { getMerchantList } from '@/api/merchant';
import { AUDIT_STATUS, MERCHANT_STATUS } from '@/utils/config';

const Home: FC = () => {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record: any) => <p>{record.company_info.id}</p>,
    },
    {
      title: '字号名称',
      key: 'title',
      render: (text, record: any) => <p>{record.company_info.title}</p>,
    },
    {
      title: '注册号',
      key: 'title',
      render: (text, record: any) => <p>{record.company_info.cert_code}</p>,
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
      title: '经营地址',
      key: 'address',
      render: (text, record: any) => <p>{record.company_info.address}</p>,
    },
    {
      title: '操作',
      key: 'opea',
      render: (text, record: any) => <p>{record.status}</p>,
    },
  ];
  const search = (page: number, page_size: number) => {
    const data = form.getFieldsValue();
    const params = Object.assign(
      { category: 2, page: page || current, page_size: page_size || pageSize },
      data,
    );
    getMerchantList(params).then((res) => {
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
      <div className="containerCard">
        <h4>个体工商户管理</h4>
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Row gutter={12}>
            <Col span={6}>
              <Form.Item name="title" label="字号名称">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="cert_code" label="注册号">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="operator_phone" label="申请人手机号">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="admin_phone" label="超管手机号">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="operator_name" label="申请人姓名">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="audit_status" label="审核状态">
                <Select placeholder="请选择" options={AUDIT_STATUS} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="merchant_status" label="商户状态">
                <Select placeholder="请选择" options={MERCHANT_STATUS} />
              </Form.Item>
            </Col>
            <Col
              span={6}
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
      </div>
      <div className="containerCard">
        <h4>个体工商户管理列表</h4>
        <Table
          dataSource={list}
          rowKey={(record) => record.id}
          columns={columns}
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
            onShowSizeChange={onShowSizeChange}
            showSizeChanger
            showQuickJumper
          />
        </div>
        {contextHolder}
      </div>
    </div>
  );
};

export default Home;
