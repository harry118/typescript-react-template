import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import SideBar from './SideBar';
import FooterBar from './FooterBar';
import './MainLayout.less';

const { Header, Content } = Layout;
const MainLayout: React.FC = () => {
  return (
    <Layout hasSider className="main">
      <SideBar />
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="main_header" style={{ padding: 0 }} />
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
