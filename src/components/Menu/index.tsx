import { Menu, MenuProps } from 'antd';
import { useState } from 'react';
import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IconFont from '@/components/IconFont';

type MenuItem = Required<MenuProps>['items'][number];

// 待用未完成动态Menu
//const processRoute = (routes: any, result: any) => {
//  routes.forEach((item: any ) => {
//    const temp: any = {
//      key: item.path,
//      icon: '',
//      label: item.title,
//    };
//    console.log('temp',temp);
//    result.push(temp);
//    if (item?.children?.length) {
//      temp.children = [];
//      processRoute(item.children, temp.children);
//    }
//  });
//};

const items: MenuItem[] = [
  {
    label: '首页',
    key: '/home',
    icon: <IconFont type="icon-yonghuguanli" />,
  },
  {
    label: '基本资料',
    key: '/information',
    icon: <IconFont type="icon-shanghuguanli" />,
    children: [
      {
        label: '个人资料',
        key: '/information/personal',
      },
      {
        label: '商户资料',
        key: '/information/tenant',
      },
    ],
  },
];

const SideMenu: FC = () => {
  const navigateTo = useNavigate();
  const currentRoute = useLocation();
  console.log('当前路由', currentRoute.pathname);

  const menuClick = (e: { key: string }) => {
    navigateTo(e.key);
  };

  //拿着currentRoute.pathname跟items数组的每一项的children的key值进行对比,如果找到了相等,
  //就要他上一级的key,这个key给到openKeys数组的元素，作为初始值
  let firstOpenKey = '';
  function findKey(obj: { key: string }) {
    return obj.key === currentRoute.pathname;
  }
  //对比的是多个children
  for (let i = 0; i < items.length; i++) {
    if (
      items[i]!['children'] &&
      items[i]!['children'].length > 0 &&
      items[i]!['children'].find(findKey)
    ) {
      firstOpenKey = items[i]!.key as string;
      break;
    }
  }
  //设置展开项的初始值
  const [openKeys, setOpenKeys] = useState([firstOpenKey]);
  const handleOpenChange = (keys: string[]) => {
    setOpenKeys([keys[keys.length - 1]]);
  };

  return (
    <Menu
      defaultSelectedKeys={[currentRoute.pathname]}
      mode="inline"
      items={items}
      onClick={menuClick}
      onOpenChange={handleOpenChange}
      openKeys={openKeys}
    />
  );
};
export default SideMenu;
