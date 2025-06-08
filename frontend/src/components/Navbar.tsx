import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ErrorHandler from "../handler/ErrorHandler";
import SpinnerSmall from "./SpinnerSmall";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [loadingLogout, setLoadingLogout] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true); // for toggling nav

  const menuItems = [
    { route: "/roles", title: "Roles" },
    { route: "/users", title: "Users" },
    { route: "/suppliers", title: "Suppliers" },
  ];

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingLogout(true);

    logout()
      .then(() => navigate("/"))
      .catch((error) => ErrorHandler(error, null))
      .finally(() => setLoadingLogout(false));
  };

  const handleUserFullName = () => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;

    if (!parsedUser) return "";

    return parsedUser.middle_name
      ? `${parsedUser.last_name}, ${parsedUser.first_name} ${parsedUser.middle_name[0]}.`
      : `${parsedUser.last_name}, ${parsedUser.first_name}`;
  };

  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          RnL Demo
        </Link>

        {/* Custom toggler */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={toggleNav}
        >
          {/* Custom hamburger icon */}
          <div
            style={{
              width: 24,
              height: 18,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                height: 3,
                backgroundColor: "white",
                borderRadius: 2,
              }}
            />
            <span
              style={{
                height: 3,
                backgroundColor: "white",
                borderRadius: 2,
              }}
            />
            <span
              style={{
                height: 3,
                backgroundColor: "white",
                borderRadius: 2,
              }}
            />
          </div>
        </button>

        {/* Collapsible nav content */}
        <div
          className={`collapse navbar-collapse ${isNavCollapsed ? "" : "show"}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {menuItems.map((menuItem, idx) => (
              <li className="nav-item" key={idx}>
                <Link className="nav-link" to={menuItem.route}>
                  {menuItem.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center">
            <div className="me-3 text-white fw-semibold">
              {handleUserFullName()}
            </div>

            <button
              type="button"
              className="btn btn-outline-light"
              onClick={handleLogout}
              disabled={loadingLogout}
              aria-label="Logout"
            >
              {loadingLogout ? (
                <>
                  <SpinnerSmall /> Logging Out...
                </>
              ) : (
                "Logout"
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
