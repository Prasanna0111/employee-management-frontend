import Logo from "./Logo";
import "./../../styles/navbar.css";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const route = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("login");
    route("/");
  };
  return (
    <div className="flex p-1 justify-between items-center navbar ">
      <Logo />
      <button className="btn logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
