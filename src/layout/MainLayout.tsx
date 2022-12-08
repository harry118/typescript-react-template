import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import SideBar from './SideBar';
import FooterBar from './FooterBar';
import HeaderBar from './HeaderBar';

import './MainLayout.less';

const { Content } = Layout;
const MainLayout: React.FC = () => {
  return (
    <Layout hasSider className="main">
      <SideBar />
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <HeaderBar />
        <Content
          className="main_content"
          style={{ margin: '24px 16px 0', overflow: 'initial' }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: 'center' }}
          >
            <Outlet />
          </div>
        </Content>
        <FooterBar />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
