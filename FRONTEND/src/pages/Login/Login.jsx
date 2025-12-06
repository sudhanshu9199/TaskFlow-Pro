import style from "./Login.module.scss";
import { User, LockKeyhole, FingerprintPattern } from "lucide-react";
import { Link } from "react-router";
import keyImg from "../../assets/keyImg.png";

const Login = () => {
  return (
    <div className={style.loginContainer}>
        <div className={style.fullContainer}>


      <img src={keyImg} alt="" />
      <h2>Welcome Back</h2>
      <form>
        <div className={style.inputs}>
          <User className={style.icons} />
          <input type="text" placeholder="Username" />
        </div>
        <div className={style.inputs}>
          <LockKeyhole className={style.icons} />
          <input type="password" placeholder="Password" />
        </div>

        <button type="submit">
          <p>Log In</p>
        </button>
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
