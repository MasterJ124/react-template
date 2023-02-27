import { Navigate, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN } from '@/utils/config';
import ls from '@/utils/Storage';

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = ls.get(ACCESS_TOKEN);
  const location = useLocation();

  if (location.pathname.includes('/login') && token) {
    // 登录页跳转验证
    return <Navigate to="/user" state={{ from: location }} replace />;
  } else if (!location.pathname.includes('/login') && !token) {
    // 验证登录
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
