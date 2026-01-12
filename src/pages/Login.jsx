import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/login.css";
import Logo from "../components/common/Logo";

export default function Login() {
  const route = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(
        "http://localhost:3002/api/empmgmt/admin/login",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            emailOrMobile: email,
            password,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.message === "Login Successfull") {
        localStorage.setItem(
          "login",
          JSON.stringify({
            email: email,
            loginState: true,
          })
        );
        route("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error.message, "jhj");
      setError(error.message);
    }
  };
  return (
    <div className="login-container">
      <Logo />
      <h1 className="primary">Employee Management System</h1>
      <div className="login-section flex flex-column">
        <div className="flex flex-column gap-0-5 mb-1">
          <label className="txt-primary">Email or Mobile Number</label>
          <input
            className="input"
            type="text"
            placeholder="Email / Mobile"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-column gap-0-5 mb-1">
          <label>Password</label>
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error ? (
          <div className="txt-danger text-center mb-1">{error}</div>
        ) : (
          ""
        )}
        <button
          className="btn btn-primary"
          onClick={() => handleLogin(email, password)}
        >
          Login
        </button>
      </div>
      <footer className="login-footer">
        <div className="txt-secondary">Copyright EMS@2026</div>
      </footer>
    </div>
  );
}
