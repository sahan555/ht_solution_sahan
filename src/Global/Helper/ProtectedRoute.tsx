import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  console.log(token);

  return token ? "" : <Navigate to="login" />;
};

export default ProtectedRoute;
