import React from 'react';
import { Layout, Menu } from 'antd';
import * as Icon from '@ant-design/icons';
import type { MenuProps } from 'antd';
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
    path: '/home',
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
const renderMenu = (menus: IMenuItems[]): MenuProps['items'] => {
  return menus.map((item) => ({
    key: item.code,
    icon: React.createElement(Icon[item.icon]),
    label: item.label,
    children: item.children?.length > 0 ? renderMenu(item?.children) : null,
  }));
};
const items: MenuProps['items'] = renderMenu(menus);
const SideBar: React.FC = () => {
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
        defaultSelectedKeys={['4']}
        items={items}
      />
    </Sider>
  );
};

export default SideBar;
