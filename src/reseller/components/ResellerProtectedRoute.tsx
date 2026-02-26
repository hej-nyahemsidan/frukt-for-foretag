import { Navigate } from 'react-router-dom';
import { useResellerAuth } from '../contexts/ResellerAuthContext';

interface ResellerProtectedRouteProps {
  children: React.ReactNode;
}

const ResellerProtectedRoute = ({ children }: ResellerProtectedRouteProps) => {
  const { user, loading, isReseller } = useResellerAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Laddar...</p>
        </div>
      </div>
    );
  }

  if (!user || !isReseller) {
    return <Navigate to="/af/login" replace />;
  }

  return <>{children}</>;
};

export default ResellerProtectedRoute;
