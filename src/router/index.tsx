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
