import type { FC } from 'react';
import { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import logo from '@/assets/images/logo.png';
import '@/pages/login/index.less';

const Home: FC = () => {
  const [current, setCurrent] = useState(0);
  const setCurrentFn = (num: number) => {
    setCurrent(num);
  };
  return (
    <div className="login-container">
      <div className="head">
        <img src={logo} className="App-logo" alt="logo" width={224} />
      </div>
      <div className="content">
        <div className="form-container">
          <div className="tabs">
            <a onClick={() => setCurrentFn(0)} className={current === 0 ? 'active' : ''}>
              手机登录
            </a>
            <a onClick={() => setCurrentFn(1)} className={current === 1 ? 'active' : ''}>
              密码登录
            </a>
          </div>
          <Form>
            {current === 0 && (
              <div>
                <Form.Item name="mobile" rules={[{ required: true, message: '请输入手机号码' }]}>
                  <Input size="large" placeholder="请输入您的手机号码" />
                </Form.Item>
                <Form.Item>
                  <Row gutter={12}>
                    <Col span={15}>
                      <Form.Item
                        name="captcha"
                        rules={[{ required: true, message: '请输入验证码' }]}
                      >
                        <Input size="large" placeholder="验证码" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Button size="large">获取验证码</Button>
                    </Col>
                  </Row>
                </Form.Item>
              </div>
            )}
            {current === 1 && (
              <div>
                <Form.Item name="user" rules={[{ required: true, message: '请输入账号' }]}>
                  <Input size="large" placeholder="请输入您的账号" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                  <Input size="large" type="password" placeholder="输入您的密码" />
                </Form.Item>
              </div>
            )}
            <Form.Item>
              <Button size="large" type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Home;
