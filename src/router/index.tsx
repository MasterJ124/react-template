import { Navigate, useRoutes } from 'react-router-dom';
import Home from '@/pages/home';
import NoFoundPage from '@/pages/404';

const routes = [
  { path: '/', element: <Navigate to="/home" /> },
  {
    path: '/home',
    element: <Home />,
  },
  { path: '*', element: <Navigate to="/404" /> },
  {
    path: '/404',
    element: <NoFoundPage />,
  },
];

function Router() {
  return useRoutes(routes);
}

export default Router;
