import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN_ROUTE } from '../constants/routes';
import { useUser } from '../hooks/useUser';

export function ProtectedRoute() {
  const { user, isLoading } = useUser();

  if (!user && !isLoading) {
    return <Navigate to={LOGIN_ROUTE} replace />;
  } else {
    return <Outlet context={{ user, isLoading }} />;
  }
}
