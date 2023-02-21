import { SplitButton, Toast } from "primereact";
import React, { createContext, useRef, useState } from "react";
import Dashboard from "../components/Dashboard";
import BasicInfo from "../components/NewProduct/BasicInfo";
import Pricing from "../components/NewProduct/Pricing";
import Inventory from "../components/NewProduct/Inventory";
import Visibility from "../components/NewProduct/Visibility";
import Categories from "../components/NewProduct/Categories";
import Photos from "../components/NewProduct/Photos";
import Tags from "../components/NewProduct/Tags";
import useValidProduct from "../hooks/useValidProduct";
import { useMutation } from "react-query";
import { addNewProduct } from "../services/product";
import { useNavigate } from "react-router-dom";

const crumbs = [
  { label: "Home", url: "/" },
  { label: "Products", url: "/products" },
  { label: "New Products", url: "/products/new-product" },
];

const items = [
  {
    label: "As Draft",
    icon: "pi pi-file",
    // command: () => {
    //     toast.current.show({severity:'success', summary:'Updated', detail:'Data Updated'});
    // }
  },
];

const initialState = {
  description: null,
  shortDescription: null,
  oldPrice: null,
  price: null,
  sku: null,
  visibility: "published",
  quantity: null,
  tags: [],
  categories: [],
};
export const ContextContainer = createContext(null);

const Products = () => {
  const toast = useRef(null);

  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [files, setFiles] = useState(null);
  const [errors, setErrors] = useState(null);
  const [product, setProduct] = useState({ ...initialState, name, files });
  
  const newProduct = useMutation(data => addNewProduct(data), {
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        detail: 'you have added one product successfully',
        life: 3000,
      });
      const navigateTimer = setTimeout(() => {
        navigate('/products');
      },3000)

      return () => clearTimeout(navigateTimer)
    },
    onError: () => {
      toast.current.show({
        severity: "error",
        detail: 'Something went wrong',
        life: 3000,
      });
    },
  });

  const addProduct = () => {
    const { isValid, errors } = useValidProduct({ ...product, name, files });
    !isValid ? setErrors(errors) : setErrors(null);
    if (isValid) {
      newProduct.mutate(product);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Dashboard
        items={crumbs}
        title="New Product"
        rightElement={
          <>
            <SplitButton
              label="Save"
              icon="pi pi-plus"
              model={items}
              onClick={addProduct}
              className="p-button-sm mr-2 mb-2"
              loading={newProduct.isLoading ? true : false}
            ></SplitButton>
          </>
        }
      >
        {errors ? (
          <p className="text-red-400 pt-4 text-sm">
            Please check fields with *
          </p>
        ) : null}
        <div className="grid  pt-4">
          <ContextContainer.Provider
            value={{
              product,
              setProduct,
              setName,
              name,
              setFiles,
              files,
              errors,
            }}
          >
            <div className="col-7">
              <BasicInfo />
              <Pricing />
              <Inventory />
            </div>
            <div className="col-5">
              <Visibility />
              <Categories />
              <Tags />
              <Photos />
            </div>
          </ContextContainer.Provider>
        </div>
      </Dashboard>
    </>
  );
};

export default Products;
