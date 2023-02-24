import { Menu, MenuProps } from "antd";
import { useState } from "react";
import type { FC } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import IconFont from "@/components/IconFont";

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
      label: '用户管理',
      key: '/user',
      icon: <IconFont type="icon-yonghuguanli" />,
  },
  {
      label: '商户管理',
      key: '/manage',
      icon: <IconFont type="icon-shanghuguanli" />,
      children:[
          {
              label: '企业商户管理',
              key: '/manage/enterprise',
          },
          {
              label: '个体工商户管理',
              key: '/manage/individuality',
          },
      ]
  },
  {
      label: '员工管理',
      key: '/staff',
      icon: <IconFont type="icon-yuangongguanli" />,
  },
]

const SideMenu: FC = () => {

  const navigateTo = useNavigate();
  const currentRoute = useLocation()
  console.log('当前路由',currentRoute.pathname)

  const menuClick = (e: { key: string }) => {
    navigateTo(e.key)
  }


    //拿着currentRoute.pathname跟items数组的每一项的children的key值进行对比,如果找到了相等,
    //就要他上一级的key,这个key给到openKeys数组的元素，作为初始值
    let firstOpenKey = "";
    function findKey(obj:{key:string}){
      return obj.key === currentRoute.pathname;
    }
    //对比的是多个children
    for(let i = 0; i < items.length; i++){
      if(items[i]!['children'] && items[i]!['children'].length > 0 && items[i]!['children'].find(findKey)){
        firstOpenKey = items[i]!.key as string;
        break;
      }
    }
    //设置展开项的初始值
    const [openKeys, setOpenKeys] = useState([firstOpenKey]);
    const handleOpenChange = (keys: string[]) => {
      setOpenKeys([keys[keys.length - 1]])
    }

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
