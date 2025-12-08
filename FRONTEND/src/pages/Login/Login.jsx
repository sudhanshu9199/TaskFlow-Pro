import style from "./Login.module.scss";
import { User, LockKeyhole, FingerprintPattern } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/Slice/authSlice";
import keyImg from "../../assets/keyImg.png";

const Login = () => {
  const [form, setform] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, user } = useSelector((s) => s.auth);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const result = await dispatch(loginUser(form));
      if (result?.meta?.requestStatus === "fulfilled") {
        navigate("/");
      }
    },
    [dispatch, form, navigate]
  );
  return (
    <div className={style.loginContainer}>
      <div className={style.fullContainer}>
        <img src={keyImg} alt="" />
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.inputs}>
            <User className={style.icons} />
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setform((p) => ({ ...p, username: e.target.value }))
              }
            />
          </div>
          <div className={style.inputs}>
            <LockKeyhole className={style.icons} />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setform((p) => ({ ...p, password: e.target.value }))
              }
            />
          </div>

          <button type="submit" disabled={status === "loading"}>
            <p>{status === "loading" ? "Logging in..." : "Log In"}</p>
          </button>
          {error && <p className={style.message}>{error}</p>}
          <p>
            Don't have an account? <Link to="/register">Sign up now.</Link>
          </p>
        </form>
      </div>
      <FingerprintPattern className={style.FingerprintPattern} />
    </div>
  );
};

export default Login;
