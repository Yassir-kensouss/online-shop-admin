import { ConfirmDialog, Toast } from "primereact";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { PRODUCT_DATATABLE_LIMIT } from "../common/constants";
import CustomButton from "../components/buttons/CustomButton";
import Dashboard from "../components/Dashboard";
import ProductTable from "../components/products/ProductTable";
import { deleteManyProducts, fetchAllProducts, productsList } from "../services/product";

const crumbs = [
  { label: "Home", url: "/" },
  { label: "Products", url: "/products" },
];

const Products = () => {

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [confirmDelete, setConformDelete] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");

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
    ["fetchProducts", page],
    async () => {
      const response = await fetchAllProducts(page, PRODUCT_DATATABLE_LIMIT);
      const data = await response.data;
      const products = await data.products;
      setTotal(data.total)
      setProducts(products);
      return products;
    },
    { refetchOnWindowFocus: false }
  );

  const searchProductsByName = useQuery(
    ["search-product-by-name",page],
    async () => {
      const result = await productsList(searchValue, page, PRODUCT_DATATABLE_LIMIT);
      const data = result.data;
      setProducts(data.products);
      setTotal(data.total)
      return data;
    },
    { enabled: false }
  );

  const handleCustomer = e => {
    if (e.target.value === "") {
      productsQuery.refetch();
    }
    setSearchValue(e.target.value);
  };

  const deleteProducts = () => {
    let ids = [];

    selectedProducts?.map(el => {
      ids.push(el._id);
    });

    deleteMany.mutate(ids);
  };

  const handlePageChange = (e) => {
    setPage(e.page)
    productsQuery.refetch()
  }

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
        products={products}
        setProducts={setProducts}
        productsQuery={productsQuery}
        searchProductsByName={searchProductsByName}
        total={total}
        page={page}
        limit={PRODUCT_DATATABLE_LIMIT}
        handlePageChange={handlePageChange}
        setTotal={setTotal}
        setPage={setPage}
        handleCustomer={handleCustomer}
        searchValue={searchValue}
      />
    </Dashboard>
  );
};

export default Products;
