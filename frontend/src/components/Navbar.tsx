import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FormEvent, useState } from "react";
import ErrorHandler from "../handler/ErrorHandler";
import SpinnerSmall from "./SpinnerSmall";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [loadingLogout, setLoadingLogout] = useState(false);

  const menuItems = [
    {
      route: "/roles",
      title: "Roles",
    },
    {
      route: "/users",
      title: "Users",
    },
  ];

  const handleLogout = (e: FormEvent) => {
    e.preventDefault();
    console.log("Logout button clicked");
    setLoadingLogout(true);

    logout()
      .then(() => {
        console.log("Logout successful");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        ErrorHandler(error, null);
      })
      .finally(() => {
        setLoadingLogout(false);
      });
  };

  const handleUserFullName = () => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;

    if (!parsedUser) return ""; // Prevent error if user is null

    const { first_name, middle_name, last_name } = parsedUser;

    if (middle_name) {
      return `${last_name}, ${first_name} ${middle_name[0]}.`;
    } else {
      return `${last_name}, ${first_name}`;
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            POS
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {menuItems.map((menuItem, index) => (
                <li className="nav-item" key={index}>
                  <Link className="nav-link" to={menuItem.route}>
                    {menuItem.title}
                  </Link>
                </li>
              ))}
            </ul>
            {handleUserFullName()}
          </div>
          <button
            type="submit"
            className="btn btn-danger"
            onClick={handleLogout}
            disabled={loadingLogout}
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
      </nav>
    </>
  );
};

export default Navbar;
