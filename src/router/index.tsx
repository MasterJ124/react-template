import React, { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// 权限层
import RequireAuth from './auth';
// layout
import MainLayout from '@/layouts/MainLayout';
// spin
import Spinner from '@/components/Spinner';
import NoFoundPage from '@/pages/404';
import Login from '@/pages/login';

// page
const Home = lazy(() => import('@/pages/home'));
import Refs from '@/pages/ClassComponents/refs';
import Form from '@/pages/ClassComponents/form';
import Cycle from '@/pages/ClassComponents/cycle';
import Key from '@/pages/ClassComponents/key';

// 上层加载
const lazyComponent = (element: JSX.Element) => {
  return <React.Suspense fallback={<Spinner />}>{element}</React.Suspense>;
};

export const routes = [
  { path: '/', element: <Navigate to="/home" /> },
  {
    path: '/home',
    element: lazyComponent(<Home />),
  },
  {
    path: '/login',
    element: <RequireAuth>{lazyComponent(<Login />)}</RequireAuth>,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/refs',
        element: <Refs />,
      },
      {
        path: '/form',
        element: <Form />,
      },
      {
        path: '/cycle',
        element: <Cycle />,
      },
      {
        path: '/key',
        element: <Key />,
      },
      { path: '*', element: <Navigate to="/404" /> },
      {
        path: '/404',
        element: <NoFoundPage />,
      },
    ],
  },
];

function Router() {
  return useRoutes(routes);
}

export default Router;
