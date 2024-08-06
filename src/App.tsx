import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import ProtectedRoute from "./Global/Helper/ProtectedRoute";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
