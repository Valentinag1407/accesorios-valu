import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { LoadingFullScreen } from "../atoms/LoadingFullScreen";
import { checkAuth } from "./validateAuth";

export const ProtectedRoute = ({ element: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const result = await checkAuth();
      setIsAuthenticated(result);
    };

    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    return <LoadingFullScreen />;
  }

  return isAuthenticated ? Component : <Navigate to="/login" />;
};
