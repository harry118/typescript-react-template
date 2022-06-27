import React from 'react';
import { Layout, Menu } from 'antd';
import * as Icon from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import './SideBar.less';

export interface IMenuItems {
  code: string;
  label: React.ReactNode;
  path: string;
  icon: string;
  children?: IMenuItems[];
}

const menus: IMenuItems[] = [
  {
    code: 'home',
    label: '首页',
    path: '/',
    icon: 'HomeOutlined',
  },
  {
    code: 'auth',
    label: '权限管理',
    path: '/auth',
    icon: 'LockOutlined',
    children: [
      {
        code: 'user',
        label: '用户管理',
        path: '/auth/user',
        icon: 'UsergroupDeleteOutlined',
      },
      {
        code: 'role',
        label: '角色管理',
        path: '/auth/role',
        icon: 'AuditOutlined',
      },
    ],
  },
];

const { Sider } = Layout;
const renderMenuLabel = (menu: IMenuItems) => {
  // 如果有children, 则直接显示label
  if (menu?.children && menu?.children.length > 0) {
    return menu.label;
  }
  return <Link to={menu.path}>{menu.label}</Link>;
};
const renderMenu = (menus: IMenuItems[]): MenuProps['items'] => {
  return menus.map((item) => ({
    // 这里用path作为key，为了react-router的path能对应到Menu的key
    key: item.path,
    icon: React.createElement(Icon[item.icon]),
    label: renderMenuLabel(item),
    children: item.children?.length > 0 ? renderMenu(item?.children) : null,
  }));
};
const items: MenuProps['items'] = renderMenu(menus);
const SideBar: React.FC = () => {
  const location = useLocation();
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['home']}
        selectedKeys={[location.pathname]}
        items={items}
      />
    </Sider>
  );
};

export default SideBar;
