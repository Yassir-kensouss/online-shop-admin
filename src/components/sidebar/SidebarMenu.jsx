import React from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../../services/auth";

const SidebarMenu = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut()
      .then(() => {
        localStorage.removeItem("jwt_data");
        return navigate("/sign-in");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="sidebar__menu">
      <ul className="sidebar__list">
        <li className="sidebar__item">
          <Link
            className={
              pathname === "/" ? "sidebar__link active" : "sidebar__link"
            }
            to="/"
          >
            <span className="sidebar__MenuItemIcon">
              <i className="pi pi-home" />
            </span>
            Dashboard
          </Link>
        </li>
        <li className="sidebar__item">
          <Link
            className={
              pathname === "/customers"
                ? "sidebar__link active"
                : "sidebar__link"
            }
            to="/customers"
          >
            <span className="sidebar__MenuItemIcon">
              <i className="pi pi-users" />
            </span>
            Customers
          </Link>
        </li>
        <li className="sidebar__item">
          <Link
            className={
              pathname === "/categories"
                ? "sidebar__link active"
                : "sidebar__link"
            }
            to="/categories"
          >
            <span className="sidebar__MenuItemIcon">
              <i className="pi pi-folder-open" />
            </span>
            Categories
          </Link>
        </li>
        <li className="sidebar__item">
          <Link
            className={
              pathname === "/products"
                ? "sidebar__link active"
                : "sidebar__link"
            }
            to="/products"
          >
            <span className="sidebar__MenuItemIcon">
              <i className="pi pi-shopping-bag" />
            </span>
            Products
          </Link>
        </li>
        <li className="sidebar__item">
          <Link
            className={
              pathname === "/analytics"
                ? "sidebar__link active"
                : "sidebar__link"
            }
            to="/analytics"
          >
            <span className="sidebar__MenuItemIcon">
              <i className="pi pi-chart-line" />
            </span>
            Analytics
          </Link>
        </li>
        <li className="sidebar__item">
          <Link
            className={
              pathname === "/profile" ? "sidebar__link active" : "sidebar__link"
            }
            to="/profile"
          >
            <span className="sidebar__MenuItemIcon">
              <i className="pi pi-user" />
            </span>
            Profile
          </Link>
        </li>
        <li className="sidebar__item">
          <Link
            className={
              pathname === "/logout" ? "sidebar__link active" : "sidebar__link"
            }
            onClick={handleSignout}
          >
            <span className="sidebar__MenuItemIcon">
              <i className="pi pi-lock" />
            </span>
            Log out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
