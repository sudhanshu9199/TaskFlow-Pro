import { Route, Routes } from "react-router";
import { lazy } from "react";
const MainPage = lazy(() => import("../pages/MainPage/MainPage"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
const MainRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default MainRouter;
