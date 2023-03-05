import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Dropdown, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { useAppSelector } from '@/app/hooks';
import styles from './index.less';

import { clearUserInfo } from '@/utils/util';
// api
import { logout } from '@/api/login';

interface Props {
  menu?: MenuProps['items'];
  overlayClassName?: string;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
}

const AvatarDropdown: FC = ({ menu, overlayClassName, placement }: Props) => {
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.userInfo.info);

  const logoutItem = {
    key: 'logout',
    label: (
      <a className={styles.MenuItem} onClick={logoutHandler}>
        <LogoutOutlined />
        退出登录
      </a>
    ),
  };

  const items: MenuProps['items'] = menu?.length ? [...menu, logoutItem] : [logoutItem];

  function logoutHandler() {
    logout().then(() => {
      clearUserInfo();
      navigate('/login');
    });
  }

  return (
    <>
      <Dropdown
        menu={{ items }}
        overlayClassName={classnames(styles.avatarDropdown, overlayClassName)}
        placement={placement || 'bottomLeft'}
      >
        <div className={styles.avatarContainer}>
          <p>{userInfo.nickname}</p>
          <Avatar
            size={32}
            className={styles.avatar}
            src={userInfo.avatar}
            icon={<UserOutlined />}
            alt="avatar"
          />
        </div>
      </Dropdown>
    </>
  );
};

export default AvatarDropdown;
