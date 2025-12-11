import { useDispatch } from "react-redux";
import MainRouter from "./router/MainRouter";
import { useEffect } from "react";
import { clearUser, setUser } from "./Redux/Slice/authSlice";
import { ToastContainer } from 'react-toastify';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          credentials: 'include',
        });
        if(!res.ok) {
          dispatch(clearUser());
          return;
        }

        const data = await res.json();
        dispatch(setUser(data.user));
      } catch (error) {
        dispatch(clearUser());
      }
    }
    checkLogin();
  }, []);
  return (
    <>
      <MainRouter />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
