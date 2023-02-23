import React, { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// 权限层
import RequireAuth from './auth';
// layout
import MainLayout from '@/layouts/MainLayout';
// spin
import Spinner from '@/components/spinner';
import NoFoundPage from '@/pages/404';
import Login from '@/pages/login';

// page
const Home = lazy(() => import('@/pages/home'));
const User = lazy(() => import('@/pages/user'));
const Staff = lazy(() => import('@/pages/staff'));
const Enterprise = lazy(() => import('@/pages/merchant/enterprise'));
const Individuality = lazy(() => import('@/pages/merchant/individuality'));

// 上层加载
const lazyComponent = (element: JSX.Element) => {
  return <React.Suspense fallback={<Spinner />}>{element}</React.Suspense>;
};

const routes = [
  { path: '/', element: <Navigate to="/home" /> },
  {
    path: '/home',
    element: lazyComponent(<Home />),
  },
  {
    path: '/login',
    element: lazyComponent(<Login />),
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/user',
        element: <RequireAuth>{lazyComponent(<User />)}</RequireAuth>,
      },
      {
        path: '/enterprise/list',
        element: <RequireAuth>{lazyComponent(<Enterprise />)}</RequireAuth>,
      },
      {
        path: '/individuality/list',
        element: <RequireAuth>{lazyComponent(<Individuality />)}</RequireAuth>,
      },
      {
        path: '/staff',
        element: <RequireAuth>{lazyComponent(<Staff />)}</RequireAuth>,
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
