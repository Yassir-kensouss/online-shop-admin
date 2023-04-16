import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../../services/auth";
import { getCategries } from "../../store/categories";
import { isAuthenticated } from "../../utils/helpers";
import OrdersItem from "./OrdersItem";

const SidebarMenu = ({collapse}) => {
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut()
      .then(() => {
        localStorage.removeItem("jwt_data");
        return navigate("/sign-in");
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="sidebar__menu">
      <div className="sidebar__topMenu">
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
              {!collapse ? "Dashboard" : null}
            </Link>
          </li>
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
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
                {!collapse ? "Customers" : null}
              </Link>
            </li>
          )}
          {isAuthenticated() && (
            <li
              className="sidebar__item"
              onClick={() => dispatch(getCategries(0))}
            >
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
                {!collapse ? "Categories" : null}
              </Link>
            </li>
          )}
          {isAuthenticated() && (
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
                {!collapse ? "Products" : null}
              </Link>
            </li>
          )}
          <OrdersItem collapse={collapse} />
        </ul>
      </div>
      <div className="sidebar__bottomMenu">
        <ul>
          {isAuthenticated() && (
            <li className="sidebar__item">
              <Link
                className={
                  pathname === "/profile"
                    ? "sidebar__link active"
                    : "sidebar__link"
                }
                to="/profile"
              >
                <span className="sidebar__MenuItemIcon">
                  <i className="pi pi-cog" />
                </span>
                {!collapse ? "Settings" : null}
              </Link>
            </li>
          )}
          <li className="sidebar__item">
            <Link
              className={
                pathname === "/logout"
                  ? "sidebar__link active"
                  : "sidebar__link"
              }
              onClick={handleSignout}
            >
              <span className="sidebar__MenuItemIcon">
                <i className="pi pi-sign-out" />
              </span>
              {!collapse ? "Log out" : null}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarMenu;
