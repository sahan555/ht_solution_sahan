import { Navigate } from "react-router-dom";
import LoginForm from "../Components/Login/LoginForm";

const Login = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <div className="h-[100vh] w-full relative flex justify-center items-center">
      <div className="w-full max-w-[360px] rounded-2xl overflow-hidden border shadow-sm">
        <figure className="h-[260px]">
          <img
            src="./assets/images/bg.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </figure>
        <div className="login-content px-6 pt-6 pb-8">
          <div className="heading-wrapper text-center mb-4">
            <h1 className="text-2xl font-medium">Login into Account</h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
