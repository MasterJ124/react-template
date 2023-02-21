import React, { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// layout
import MainLayout from '@/layouts/MainLayout';
// spin
import Spinner from '@/components/spinner';
import NoFoundPage from '@/pages/404';

// page
const Home = lazy(() => import('@/pages/home'));
const Login = lazy(() => import('@/pages/login'));

// 上层加载
const withLoadingComponent = (element: JSX.Element) => {
  return <React.Suspense fallback={<Spinner />}>{element}</React.Suspense>;
};

const routes = [
  { path: '/', element: <Navigate to="/home" /> },
  {
    path: '/home',
    element: withLoadingComponent(<Home />),
  },
  {
    path: '/login',
    element: withLoadingComponent(<Login />),
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
