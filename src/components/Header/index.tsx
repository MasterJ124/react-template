import type { FC } from 'react';
import logo from '@/assets/images/logo.png';
import styles from './index.less';
// 组件
import AvatarDropdown from '@/components/AvatarDropdown';

const Header: FC = () => {
  return (
    <div className={styles.headerContainer}>
      <img src={logo} className={styles.appLogo} alt="logo" />
      <AvatarDropdown />
    </div>
  );
};
export default Header;
