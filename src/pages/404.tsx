import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import noPermission from '@/assets/images/no-permission.jpg';

const NoFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      icon={<img src={noPermission} />}
      title="404"
      subTitle="对不起，您访问的页面不存在或无访问权限"
      extra={
        <Button type="primary" onClick={() => navigate('/home')}>
          返回首页
        </Button>
      }
    />
  );
};

export default NoFoundPage;
