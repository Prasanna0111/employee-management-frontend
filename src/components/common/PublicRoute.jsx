import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../helpers/auth";

export default function PublicRoute({ children }) {
  return isAuthenticated() ? <Navigate to={"/dashboard"} /> : children;
}
