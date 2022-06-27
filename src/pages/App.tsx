import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  RouteObject,
  useRoutes,
} from 'react-router-dom';
import { ConfigProvider } from 'antd';

import Home from '@pages/Home';
import User from '@pages/Auth/User';
import Role from '@pages/Auth/Role';
import Login from '@pages/Login';
import MainLayout from '@layout/MainLayout';

// import png from '@assets/shop.png';
import '@utils/index';
import './App.less';

interface IAppProps {
  test?: string;
}
const App: React.FC<IAppProps> = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: '/auth/user', element: <User /> },
        { path: '/auth/role', element: <Role /> },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
  ];
  const element = useRoutes(routes);
  return <ConfigProvider componentSize="small">{element}</ConfigProvider>;
};
export default App;
