import { Navigate } from 'react-router-dom';
import { useResellerCustomerAuth } from '../contexts/ResellerCustomerAuthContext';

interface Props {
  children: React.ReactNode;
}

const ResellerCustomerProtectedRoute = ({ children }: Props) => {
  const { user, loading, isResellerCustomer } = useResellerCustomerAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Laddar...</p>
        </div>
      </div>
    );
  }

  if (!user || !isResellerCustomer) {
    return <Navigate to="/af/kund/login" replace />;
  }

  return <>{children}</>;
};

export default ResellerCustomerProtectedRoute;
