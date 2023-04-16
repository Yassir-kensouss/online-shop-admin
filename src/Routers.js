import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./pages/Categories";
import NewProduct from "./pages/NewProduct";
import Customers from "./pages/Customers";
import Home from "./pages/home/Home";
import Products from "./pages/Products";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/ResetPasswrod";
import UpdatePassword from "./pages/UpdatePassword";
import PrivateRoute from "./utils/PrivateRoute";
import AdminRoute from "./utils/AdminRoute";
import EditProduct from "./pages/EditProduct";
import CustomerDetails from "./pages/CustomerDetails";
import Pay from "./pages/Pay";
import Orders from "./pages/Orders";
import PageNotFound from "./components/PageNotFound";
import Settings from "./pages/Settings";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/pay" element={<Pay />} />
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
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
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
        <Route path="/profile" element={<Settings />} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
};

export default Routers;
