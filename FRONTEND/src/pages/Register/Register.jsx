import style from './register.module.scss';
import { User, AtSign, LockKeyhole } from "lucide-react";
import { Link } from 'react-router';

const Register = () => {
  return (
    <div className={style.registerContainer}>
      <h2>Join US</h2>
      <form >
        <div className={style.inputs}>
          <User className={style.icons}/>
          <input type="text" placeholder="Full Name" />
        </div>
        <div className={style.inputs}>
          <AtSign className={style.icons}/>
          <input type="text" placeholder="Username" />
        </div>
        <div className={style.inputs}>
          <LockKeyhole className={style.icons}/>
          <input type="password" placeholder="Password" />
        </div>

        <button type="submit">Register</button>
        <p>Already registerd? <Link to='/login'>Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
