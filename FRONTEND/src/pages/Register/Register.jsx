import style from "./register.module.scss";
import { User, AtSign, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Redux/Slice/authSlice";
import { useCallback } from "react";

const Register = () => {
  const [form, setform] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [msg, setmsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((s) => s.auth);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setmsg("Registering...");
      const result = await dispatch(register(form));
      if (result?.meta?.requestStatus === "fulfilled") {
        setmsg("Registration successful 🎉");
        navigate("/");
      } else {
        setmsg(result?.payload?.message || "Something went wrong. Try again.");
      }
    },
    [dispatch, form, navigate]
  );
  return (
    <div className={style.registerContainer}>
      <h2>Join US</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.inputs}>
          <User className={style.icons} />
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setform({
                ...form,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className={style.inputs}>
          <AtSign className={style.icons} />
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setform({ ...form, username: e.target.value })}
          />
        </div>
        <div className={style.inputs}>
          <LockKeyhole className={style.icons} />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setform({ ...form, password: e.target.value })}
          />
        </div>

        <button type="submit">Register</button>
        <p className={style.message}>{msg}</p>
        <p>
          Already registerd? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
