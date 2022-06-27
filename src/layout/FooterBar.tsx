import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;
const FooterBar: React.FC = () => {
  return (
    <Footer className="main_footer" style={{ textAlign: 'center' }}>
      typescript-react-template ©2022 Created by 君铉
    </Footer>
  );
};

export default FooterBar;
