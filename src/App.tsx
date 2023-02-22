import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Router from './router';
import { themeConfig } from '@/style/themeConfig';

function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <BrowserRouter>
        {/* The rest of your app goes here */}
        <Router />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
