import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function GuestRoute({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return children;
  }

  switch (user?.role) {
    case "ADMIN":
      return <Navigate to="/admin/dashboard" replace />;

    case "OWNER":
      return <Navigate to="/owner/dashboard" replace />;

    default:
      return <Navigate to="/user/dashboard" replace />;
  }
}