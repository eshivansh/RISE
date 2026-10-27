import { useState } from "react";
import { AuthContext } from "./AuthContext.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (localStorage.getItem("rise_loggedIn") === "true") {
      return JSON.parse(localStorage.getItem("rise_user"));
    }
    return null;
  });

  function loginUser(userData) {
    setUser(userData);
    localStorage.setItem("rise_user", JSON.stringify(userData));
    localStorage.setItem("rise_loggedIn", "true");
  }

  function logoutUser() {
    setUser(null);
    localStorage.removeItem("rise_loggedIn");
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}