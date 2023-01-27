import React from "react";
import { Link, Navigate } from "react-router-dom";
import CustomButton from "../components/buttons/CustomButton";
import Dashboard from "../components/Dashboard";
import ProductTable from "../components/products/ProductTable";

const crumbs = [
  { label: "Home", url: "/" },
  { label: "Products", url: "/products" },
];

const Products = () => {
  return (
    <Dashboard
      items={crumbs}
      title="Products"
      rightElement={
        <>
          <Link to="/products/new-product" className="no-underline">
            <CustomButton label="New Product" icon="pi pi-plus" />
          </Link>
        </>
      }
    >
      <ProductTable/>
    </Dashboard>
  );
};

export default Products;
