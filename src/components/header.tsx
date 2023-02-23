import logo from '@/assets/images/logo.png';
import ls from '@/utils/Storage';
import { USER_INFO } from '@/utils/config';
import type { FC } from 'react';
const Header: FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <img src={logo} className="App-logo" alt="logo" width={224} />
      </div>
      <div></div>
    </div>
  );
};
export default Header;
