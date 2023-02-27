import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import HeadTop from '@/components/Header';
import SideMenu from '@/components/Menu';

import styles from './MainLayout.less';

const { Header, Content, Sider } = Layout;

const MainLayout: FC = () => {
  return (
    <Layout className={styles.mainLayout}>
      <Header className={styles.header}>
        <HeadTop />
      </Header>
      <Layout>
        <Sider className={styles.sider}>
          <SideMenu />
        </Sider>
        <Layout className={styles.layoutContent}>
          <Content className={styles.content}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
