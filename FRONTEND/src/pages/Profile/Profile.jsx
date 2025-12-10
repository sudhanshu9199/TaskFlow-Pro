import { ArrowLeft, LogOut } from "lucide-react";
import style from "./Profile.module.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../../Redux/Slice/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className={style.profileContainer}>
      <div className={style.header}>
        <ArrowLeft className={style.backArrow} onClick={handleBack} />
        <p>TaskFlow</p>
        <div className={style.logoutContainer} onClick={handleLogout}>
          <p>Logout</p>
          <LogOut className={style.logout} />
        </div>
      </div>
      <div className={style.profileSummary}>
        <img src="" alt="" />
        <p className={style.name}>Sudhanshu</p>
        <p className={style.username}>@sudhanshu9199</p>
      </div>
      <form>
        <div className="names">
          <label>Name</label>
          <input type="text" className="name" />
        </div>
        <div className="usernames">
          <label>Username</label>
          <input type="text" className="username" placeholder="sudhanshu9199" />
        </div>
        <div className="passwords">
          <label>Password</label>
          <input type="text" className="password" placeholder="******" />
        </div>
        <button type="submit">Edit Profile</button>
      </form>
    </div>
  );
};

export default Profile;
