import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/common/variables.css";
import "./styles/common/global.css";
import "./styles/common/common.css";
import "./styles/common/utility.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import AddEmployee from "./pages/AddEmployee";

function App() {
  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path={"/dashboard"}
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={"/add-employee"}
        element={
          <ProtectedRoute>
            <AddEmployee />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
