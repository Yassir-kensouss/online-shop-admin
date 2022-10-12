import React from "react";
import Dashboard from "../components/Dashboard";

const crumbs = [
  { label: "Home", url: "/" },
  { label: "Products", url: "/products" },
];

const Products = () => {
  return <Dashboard items={crumbs} title="Products"></Dashboard>;
};

export default Products;
