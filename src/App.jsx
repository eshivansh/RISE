import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Welcome from "./pages/Welcome.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoutes from "./components/layout/ProtectedRoutes.jsx";
import Layout from "./components/layout/Layout.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoutes />}>
        <Route element={<Layout />}>
          <Route
            path="/welcome"
            element={<Welcome />}
          />
        </Route>

        {/* Dashboard is full screen with its own header, so no sidebar layout */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}