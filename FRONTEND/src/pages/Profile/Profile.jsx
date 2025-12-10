import { ArrowLeft, LogOut, Trash2 } from "lucide-react";
import style from "./Profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  logoutUser,
  updateUser,
  deleteUserAccount,
} from "../../Redux/Slice/authSlice";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        username: user.username || "",
        password: "",
      });
    }
  }, [user]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Name is required");

    try {
      const payload = { name: form.name };
      if (form.password.trim()) payload.password = form.password;

      await dispatch(updateUser(payload)).unwrap();
      toast.success("Profile updated successfully! ✅");
      setForm((p) => ({ ...p, password: "" })); // Clear password field
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        await dispatch(deleteUserAccount()).unwrap();
        toast.info("Account deleted 👋");
        navigate("/login");
      } catch (err) {
        toast.error("Failed to delete account");
      }
    }
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
        <p className={style.name}>{user?.name}</p>
        <p className={style.username}>@{user?.username}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="names">
          <label>Name</label>
          <input
            type="text"
            className="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="usernames">
          <label>Username</label>
          <input
            type="text"
            className="username"
            value={form.username}
            readOnly
            disabled
            style={{ opacity: 0.7, cursor: "not-allowed" }}
          />
        </div>
        <div className="passwords">
          <label>New Password</label>
          <input
            type="text"
            className="password"
            placeholder="Change Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button type="submit">Edit Profile</button>
        <button type="button" onClick={handleDelete}>
          <Trash2 size={18} style={{ marginRight: "8px", verticalAlign: "middle" }} />
          Delete Account</button>
      </form>
    </div>
  );
};

export default Profile;
