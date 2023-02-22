import type { FC } from 'react';
import { Form, Input, Button, Row, Col, message, Select } from 'antd';
import { useState } from 'react';
import '@/pages/login/index.less';
import UserTable from './table';
import { getMerchantList } from '@/api/merchant';
import { MERCHANT_TYPE, AUDIT_STATUS, MERCHANT_STATUS } from '@/utils/config';

const Home: FC = () => {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const search = () => {
    const data = form.getFieldsValue();
    const params = Object.assign({ category: 1 }, data);
    getMerchantList(params).then((res) => {
      const { code, data, message } = res;
      if (code !== 0) {
        messageApi.open({
          type: 'error',
          content: message,
        });
      }
      setList(data?.lists || []);
    });
  };
  const reset = () => {
    form.resetFields();
    search();
  };
  return (
    <div className="user-container">
      <div className="form-container">
        <h4>企业商户管理</h4>
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Row gutter={12}>
            <Col span={6}>
              <Form.Item name="title" label="公司名称">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="cert_code" label="统一代码">
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
              <Form.Item name="type" label="商户类型">
                <Select placeholder="请选择" options={MERCHANT_TYPE} />
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
              <Button type="primary" onClick={search}>
                查询
              </Button>
            </Col>
          </Row>
        </Form>
        <h4>企业商户管理列表</h4>
        <UserTable list={list}></UserTable>
        {contextHolder}
      </div>
    </div>
  );
};

export default Home;
