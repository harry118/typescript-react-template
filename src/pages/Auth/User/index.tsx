import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { queryUserList } from './service';
import { useQuery } from 'react-query';
interface IUserProps {
  test?: string;
}
interface DataType {
  id: string;
  name: string;
  avatar: string;
  isActive: boolean;
}

const columns: ColumnsType<DataType> = [
  {
    title: '用户id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'age',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const User: React.FC<IUserProps> = () => {
  const { data, isLoading, error } = useQuery('queryUserList', () =>
    queryUserList()
  );
  // if (isLoading) {
  //   return null;
  // }
  return (
    <div>
      <Table
        rowKey={`id`}
        columns={columns}
        loading={isLoading}
        dataSource={data?.data || []}
      />
    </div>
  );
};
export default User;
