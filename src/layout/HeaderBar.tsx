import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Space } from 'antd';
import type { MenuProps } from 'antd';

import './HeaderBar.less';

const items: MenuProps['items'] = [
  {
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
    key: '1',
  },
];

const HeaderBar: React.FC = () => {
  return (
    <div className="main_header">
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default HeaderBar;
