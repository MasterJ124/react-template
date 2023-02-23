import type { FC } from 'react';
import { Form, Input, Button, Row, Col, message, Select, Table, Pagination, Card } from 'antd';
import { useState, useEffect } from 'react';
import type { PaginationProps } from 'antd';
import { getMerchantList } from '@/api/merchant';
import { AUDIT_STATUS, MERCHANT_STATUS } from '@/utils/config';

const Individuality: FC = () => {
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
      width: 60,
      key: 'id',
    },
    {
      title: '字号名称',
      key: 'title',
      width: 140,
      render: (text, record: any) => <p>{record.company_info.title}</p>,
    },
    {
      title: '注册号',
      key: 'cert_code',
      width: 160,
      render: (text, record: any) => <p>{record.company_info.cert_code}</p>,
    },
    {
      title: '审核状态',
      key: 'status',
      width: 100,
      render: (text, record: any) => (
        <div>
          {record.status === 1 && <p>审核通过</p>}
          {record.status === 2 && <p>审核拒绝</p>}
          {record.status === 3 && <p>待审核</p>}
        </div>
      ),
    },
    {
      title: '商户状态',
      key: 'company_status',
      width: 100,
      render: (text, record: any) => (
        <div>
          {record.company_info.status === 1 && <p>启用</p>}
          {record.company_info.status === 2 && <p>禁用</p>}
        </div>
      ),
    },
    {
      title: '申请人用户名',
      key: 'nickname',
      width: 120,
      render: (text, record: any) => <p>{record.operator_info.nickname}</p>,
    },
    {
      title: '经营地址',
      key: 'address',
      width: 120,
      render: (text, record: any) => <p>{record.company_info.address}</p>,
    },
    {
      title: '经营者姓名',
      key: 'corporate_name',
      width: 120,
      render: (text, record: any) => <p>{record.company_info.corporate_name}</p>,
    },
    {
      title: '营业执照',
      key: 'license',
      width: 120,
      render: (text, record: any) => <p>{record.company_info.license}</p>,
    },
    {
      title: '经营范围',
      key: 'business_range',
      width: 120,
      render: (text, record: any) => <p>{record.company_info.business_range}</p>,
    },
    {
      title: '申请人用户名',
      key: 'nickname',
      width: 120,
      render: (text, record: any) => <p>{record.operator_info.nickname}</p>,
    },
    {
      title: '营业期限',
      key: 'title',
      width: 200,
      render: (text, record: any) => (
        <p>
          {record.company_info.company_end_at
            ? record.company_info.company_start_at + '-' + record.company_info.company_end_at
            : '长期'}
        </p>
      ),
    },
    {
      title: '商户类型',
      key: 'corporate_name',
      width: 140,
      render: (text, record: any) => <p>个体工商户</p>,
    },
    {
      title: '超管手机号',
      key: 'admin_info',
      width: 130,
      render: (text, record: any) => <p>{record.admin_info.phone}</p>,
    },
    {
      title: '申请时间',
      key: 'created_at',
      width: 160,
      render: (text, record: any) => <p>{record.company_info.created_at}</p>,
    },
    {
      title: '审核时间',
      key: 'audited_at',
      width: 160,
      render: (text, record: any) => <p>{record.audited_at || '-'}</p>,
    },
    {
      title: '失败原因',
      key: 'reason',
      width: 120,
      render: (text, record: any) => <p>{record.reason || '-'}</p>,
    },
    {
      title: '备注',
      key: 'remark',
      width: 120,
      render: (text, record: any) => <p>{record.remark || '-'}</p>,
    },
    {
      title: '操作',
      key: 'opea',
      width: 80,
      fixed: 'right',
      render: (text, record: any) => (
        <div>
          {record.status === 3 && <a>审核</a>}
          {record.status === 1 && record.company_info.status === 2 && <a>启用</a>}
          {record.status === 1 && record.company_info.status === 1 && <a>禁用</a>}
        </div>
      ),
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
      <Card>
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
      </Card>
      <Card>
        <h4>个体工商户管理列表</h4>
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
            onShowSizeChange={onShowSizeChange}
            showSizeChanger
            showQuickJumper
          />
        </div>
        {contextHolder}
      </Card>
    </div>
  );
};

export default Individuality;
