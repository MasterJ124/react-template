import type { FC } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import '@/pages/login/index.less';
import UserTable from './table';

const Home: FC = () => {
  return (
    <div className="user-container">
      <div className="form-container">
        <h4>员工管理</h4>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Row gutter={12}>
            <Col span={6}>
              <Form.Item name="mobile" label="手机号码">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="user" label="用户名">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="name" label="真实姓名">
                <Input placeholder="请输入" />
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
              >
                重置
              </Button>
              <Button type="primary">查询</Button>
            </Col>
          </Row>
        </Form>
        <h4>员工列表</h4>
        <UserTable></UserTable>
      </div>
    </div>
  );
};

export default Home;
