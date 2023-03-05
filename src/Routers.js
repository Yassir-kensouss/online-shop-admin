import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Analytics from "./pages/Analytics";
import Categories from "./pages/Categories";
import NewProduct from "./pages/NewProduct";
import Customers from "./pages/Customers";
import Home from "./pages/home/Home";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/ResetPasswrod";
import UpdatePassword from "./pages/UpdatePassword";
import PrivateRoute from "./utils/PrivateRoute";
import AdminRoute from "./utils/AdminRoute";
import EditProduct from "./pages/EditProduct";
import CustomerDetails from "./pages/CustomerDetails";

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
        <Route path="/customer/details/:custId" element={<AdminRoute><CustomerDetails/></AdminRoute>}/>
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
          path="/products/new-product"
          element={
            <PrivateRoute>
              <NewProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/edit-product/:productId"
          element={
            <PrivateRoute>
              <EditProduct />
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
        <Route path="*" element={<div>No match</div>} />
      </Routes>
    </Router>
  );
};

export default Routers;
