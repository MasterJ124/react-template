import type { FC } from 'react';
import { Spin } from 'antd';

const Spinner: FC = () => {
  return (
    <Spin tip="Loading" size="large">
      <div style={{ padding: '50px', background: 'rgba(0, 0, 0, 0.05)', borderRadius: ' 4px' }} />
    </Spin>
  );
};

export default Spinner;
