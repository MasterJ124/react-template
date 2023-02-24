import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
// import HeadTop from '@/components/header';
import SideMenu from '@/components/Menu';

const { Header, Content, Sider } = Layout;

const MainLayout: FC = () => {


  return (
    <Layout style={{ height: '100%' }}>
      <Header
        style={{
          background: '#fff',
        }}
      >
        {/* <HeadTop /> */}
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#FFF' }}>
          {/*<Menu mode="inline" style={{ height: '100%', borderRight: 0 }} />*/}
          <SideMenu />
        </Sider>
        <Layout style={{ padding: '16px 24px' }}>
          <Content
            style={{
              minHeight: 400,
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
