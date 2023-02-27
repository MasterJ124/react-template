import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { fetchUserInfo } from '@/utils/util';
import Router from './router';
import dayjs from 'dayjs';
import { themeConfig } from '@/style/themeConfig';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import 'antd/dist/reset.css';

dayjs.locale('zh-cn');

function App() {
  useEffect(() => {
    // 获取用户信息
    fetchUserInfo();
  }, []);

  return (
    <ConfigProvider locale={zhCN} theme={themeConfig}>
      <BrowserRouter>
        {/* The rest of your app goes here */}
        <Router />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
