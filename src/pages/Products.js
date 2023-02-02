import { ConfirmDialog, Toast } from "primereact";
import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import CustomButton from "../components/buttons/CustomButton";
import Dashboard from "../components/Dashboard";
import ProductTable from "../components/products/ProductTable";
import { deleteManyProducts, fetchAllProducts } from "../services/product";

const crumbs = [
  { label: "Home", url: "/" },
  { label: "Products", url: "/products" },
];

const Products = () => {

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [confirmDelete, setConformDelete] = useState(false)

  const toast = useRef(null);

  const deleteMany = useMutation(ids => deleteManyProducts(ids), {
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        detail: 'Products deleted',
        life: 3000,
      });
      productsQuery.refetch();
    },
    onError: () => {
      toast.current.show({
        severity: "error",
        detail: "Something went wrong",
        life: 3000,
      });
    },
  });

  const productsQuery = useQuery(
    "fetchProducts",
    async () => {
      const response = await fetchAllProducts();
      const data = await response.data;
      const products = await data.products;
      return products;
    },
    { refetchOnWindowFocus: false }
  );

  const deleteProducts = () => {
    let ids = [];

    selectedProducts?.map(el => {
      ids.push(el._id);
    });

    deleteMany.mutate(ids);
  };

  return (
    <Dashboard
      items={crumbs}
      title="Products"
      rightElement={
        <>
          <CustomButton
            onClick={() => setConformDelete(true)}
            className="p-button-danger"
            icon="pi pi-trash"
            disabled={!selectedProducts || !selectedProducts.length > 0}
            id="deleteProduct"
            aria-label="delete product"
          />
          <Link to="/products/new-product" className="no-underline">
            <CustomButton label="New Product" icon="pi pi-plus" />
          </Link>
        </>
      }
    >
      <Toast ref={toast} />
      <ConfirmDialog
        visible={confirmDelete}
        onHide={() => setConformDelete(false)}
        message="Are you sure you want to proceed?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={deleteProducts}
        reject={() => setConformDelete(false)}
      />
      <ProductTable
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        productsQuery={productsQuery}
      />
    </Dashboard>
  );
};

export default Products;
