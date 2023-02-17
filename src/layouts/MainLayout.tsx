import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header, Content, Sider } = Layout;

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        运营管理
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#FFF' }}>
          <Menu mode="inline" style={{ height: '100%', borderRight: 0 }} />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#FFF',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
