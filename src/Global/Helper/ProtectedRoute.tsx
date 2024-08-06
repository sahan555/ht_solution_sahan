import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../Redux/store";

const ProtectedRoute = () => {
  const token = useAppSelector((state) => state.auth.token);
  console.log(token);

  return token ? <Outlet /> : <Navigate to="login" />;
};

export default ProtectedRoute;
