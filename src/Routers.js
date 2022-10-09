import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Analytics from "./pages/Analytics";
import Categories from "./pages/Categories";
import Customers from "./pages/Customers";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/ResetPasswrod";
import UpdatePassword from "./pages/UpdatePassword";

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
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default Routers;
