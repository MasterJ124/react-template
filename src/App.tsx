import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Router from './router';
import dayjs from 'dayjs';
import { themeConfig } from '@/style/themeConfig';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import 'antd/dist/reset.css';
import '@/style/common.less';

dayjs.locale('zh-cn');

function App() {
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
