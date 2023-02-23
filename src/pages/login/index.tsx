import type { FC } from 'react';
import { useState } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import logo from '@/assets/images/logo.png';
import '@/pages/login/index.less';
import { login, smsSend, getUserInfo } from '@/api/login';
import { ACCESS_TOKEN, COMPANY_ID } from '@/utils/config';
import { useNavigate } from 'react-router-dom';
import ls from '@/utils/Storage';
import { useAppDispatch } from '@/app/hooks';
import { setUserToken, setUserInfo } from '@/features/userInfoSlice';

const Login: FC = () => {
  const [current, setCurrent] = useState(0);
  const [codeText, setCodeText] = useState('获取验证码');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const history = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();

  const getCode = async () => {
    try {
      const values = await form.validateFields(['mobile']);
      setBtnDisabled(true);
      smsSend({
        phone: values.mobile,
        type: 'login',
      }).then((res) => {
        if (res.code === 0) {
          setTimeFn();
          messageApi.open({
            type: 'success',
            content: '验证码发送成功',
          });
        } else {
          setBtnDisabled(false);
          messageApi.open({
            type: 'error',
            content: res.message,
          });
        }
      });
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  const setTimeFn = () => {
    let num = 60;
    const timer = setInterval(() => {
      setCodeText(`${--num}s`);
      if (num === 0) {
        clearInterval(timer);
        setCodeText(`获取验证码`);
        setBtnDisabled(false);
      }
    }, 1000);
  };
  const onFinish = (values: any) => {
    const params: any = {
      channel: 7,
      source: 2,
    };
    if (current === 0) {
      params.username = values.mobile;
      params.password = values.captcha;
      params.type = 4;
    } else {
      params.username = values.user;
      params.password = values.password;
      params.type = 1;
    }
    setLoading(true);
    login(params)
      .then((res) => {
        const { code, data, message } = res;
        if (code !== 0) {
          messageApi.error(message);
        }
        ls.set(ACCESS_TOKEN, data.token);
        fetchUserInfo();
        history('/user');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // 获取用户信息
  const fetchUserInfo = () => {
    getUserInfo()
      .then((res) => {
        const { data, code, message } = res;
        if (code !== 0) {
          messageApi.error(message);
          return;
        }
        if (data?.company?.company_id) ls.set(COMPANY_ID, data.company.company_id);
        dispatch(setUserToken(data.token));
        dispatch(setUserInfo(data));
      })
      .catch((err) => {
        messageApi.error(err.message);
      });
  };

  return (
    <div className="login-container">
      <div className="head">
        <img src={logo} className="App-logo" alt="logo" width={224} />
      </div>
      <div className="content">
        <div className="form-container">
          <div className="tabs">
            <a onClick={() => setCurrent(0)} className={current === 0 ? 'active' : ''}>
              手机登录
            </a>
            <a onClick={() => setCurrent(1)} className={current === 1 ? 'active' : ''}>
              密码登录
            </a>
          </div>
          <Form onFinish={onFinish} form={form}>
            {current === 0 && (
              <div
                style={{
                  marginBottom: '24px',
                }}
              >
                <Form.Item
                  name="mobile"
                  rules={[
                    { required: true, message: '请输入手机号码' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || /^1\d{10}$/.test(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('手机号码格式错误'));
                      },
                    }),
                  ]}
                >
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
                      {contextHolder}
                      <Button
                        size="large"
                        onClick={() => getCode()}
                        disabled={btnDisabled}
                        style={{
                          width: '112px',
                        }}
                      >
                        {codeText}
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </div>
            )}
            {current === 1 && (
              <div
                style={{
                  marginBottom: '48px',
                }}
              >
                <Form.Item name="user" rules={[{ required: true, message: '请输入账号' }]}>
                  <Input size="large" placeholder="请输入您的账号" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                  <Input size="large" type="password" placeholder="输入您的密码" />
                </Form.Item>
              </div>
            )}
            <Form.Item>
              <Button size="large" loading={loading} type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
