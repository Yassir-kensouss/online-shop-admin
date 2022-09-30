import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Analytics from "./pages/Analytics";
import Categories from "./pages/Categories";
import Customers from "./pages/Customers";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SignIn from "./pages/SignIn";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
};

export default Routers;
