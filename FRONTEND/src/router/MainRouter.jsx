import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
const MainPage = lazy(() => import("../pages/MainPage/MainPage"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const MainRouter = () => {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
      }
    >
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
    </Suspense>
  );
};

export default MainRouter;
