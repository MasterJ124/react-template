import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';

function RequireAuth({ children }: { children: JSX.Element }) {
  const userInfo = useAppSelector((state) => state.userInfo);
  const location = useLocation();

  if (!userInfo?.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
