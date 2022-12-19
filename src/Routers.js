import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Analytics from "./pages/Analytics";
import Categories from "./pages/Categories";
import Customers from "./pages/Customers";
import Home from "./pages/home/Home";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/ResetPasswrod";
import UpdatePassword from "./pages/UpdatePassword";
import PrivateRoute from "./utils/PrivateRoute";
import AdminRoute from "./utils/AdminRoute";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/password-reset" element={<ResetPassword />} />
        <Route
          path="/update-password/:userId/:token"
          element={<UpdatePassword />}
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <AdminRoute>
              <Customers />
            </AdminRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <Analytics />
            </PrivateRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default Routers;
