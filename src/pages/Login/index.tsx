import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { login } from './service';

interface ILoginProps {
  test?: string;
}
const Login: React.FC<ILoginProps> = () => {
  const navigate = useNavigate();

  const onFinish = async (values: unknown) => {
    console.log('Success:', values);
    const result = await login(values);
    // eslint-disable-next-line no-debugger
    // debugger;
    if (result.success) {
      Cookies.set('token', result.data.token);
      navigate('/', { replace: true });
    }
    console.log('result', result);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
