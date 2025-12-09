import { useDispatch } from "react-redux";
import MainRouter from "./router/MainRouter";
import { useEffect } from "react";
import { clearUser, setUser } from "./Redux/Slice/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await fetch('http://localhost:3000/api/auth/me', {
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
    </>
  );
};

export default App;
