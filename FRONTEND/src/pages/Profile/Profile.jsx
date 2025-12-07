import { ArrowLeft, LogOut } from "lucide-react";
import style from './Profile.module.scss';

const Profile = () => {
  return (
    <div className={style.profileContainer}>
      <div className={style.header}>
        <ArrowLeft className={style.backArrow} />
        <p>TaskFlow</p>
        <LogOut className={style.logout} />
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
          <label>Name</label>
          <input type="text" className="password" placeholder="******" />
        </div>
        <button type="submit">Edit Profile</button>
      </form>
    </div>
  );
};

export default Profile;
