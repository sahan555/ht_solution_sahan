import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { LuUser2 } from "react-icons/lu";
import { IoKeyOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAuthData } from "../../Global/Redux/authSlice";
import { useAppDispatch } from "../../Global/Redux/store";

interface LoginValues {
  username: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const initialValues: LoginValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters long"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: LoginValues) => {
    console.log(values);
    setLoading(true);
    try {
      const response = await axios.post(
        `http://hrmis.himalayanhackers.com/api/login`,
        {
          ...values,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log(response);
      const token = response?.data?.user?.token;
      const username = response?.data?.user?.username;
      if (token && response?.statusText === "OK") {
        dispatch(setAuthData({ username, token }));
        toast.success(`Login successfully!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setRedirecting(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(`No user Found`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="form-wrapper text-left">
              <div className="form-group mb-4">
                <div className="input-group relative">
                  <Field
                    className="border border-solid border-[#dddddd] outline-0 pl-8 pr-4 w-full h-10 rounded-lg focus:border-primary duration-300"
                    type="text"
                    name="username"
                    placeholder="Username"
                  />
                  <LuUser2 className="absolute top-3 left-2 text-primary pointer-events-none" />
                </div>
                <ErrorMessage
                  component="div"
                  className="text-red-500 text-sm"
                  name="username"
                />
              </div>

              <div className="form-group mb-4">
                <div className="input-group relative">
                  <Field
                    className="border border-solid border-[#dddddd] outline-0 pl-8 pr-4 w-full h-10 rounded-lg focus:border-primary duration-300"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <IoKeyOutline className="absolute top-3 left-2 text-primary pointer-events-none" />
                </div>
                <ErrorMessage
                  component="div"
                  className="text-red-500 text-sm"
                  name="password"
                />
              </div>

              <div className="btn-wrapper">
                <button
                  className={`px-[15px] py-[4px] font-medium w-full h-10 rounded-lg text-white ${
                    loading ? "cursor-not-allowed bg-slate-500" : "bg-primary"
                  }`}
                  disabled={loading}
                  type="submit"
                >
                  Login
                </button>
              </div>

              {loading && (
                <div
                  className="overlay fixed inset-0 bg-[#8a8a8a2c]"
                  style={{ zIndex: "99999" }}
                >
                  <div className="flex flex-col h-full items-center justify-center">
                    <div className="">{loading ? "Login..." : ""}</div>
                    {redirecting && (
                      <div className="mt-[20px] text-center text-[14px] text-green-500">
                        Redirecting to dashboard...
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
      />
    </>
  );
};

export default LoginForm;
