import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" /> // Redirect to login page if not authenticated
  );
};

export default PrivateRoute;
