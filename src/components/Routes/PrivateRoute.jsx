import { useAuth } from "../../context/authContext";
import { Navigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
