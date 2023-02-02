import { Toast } from "primereact";
import React, { createContext, useEffect, useRef, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../components/buttons/CustomButton";
import { useQuery } from "react-query";
import { fetchSingleProduct } from "../services/product";
import Loader from "../components/Loader";
import BasicInfo from "../components/EditProduct/BasicInfo";
import Pricing from "../components/EditProduct/Pricing";
import Inventory from "../components/EditProduct/Inventory";
import Visibility from "../components/EditProduct/Visibility";
import Categories from "../components/EditProduct/Categories";
import Tags from "../components/EditProduct/Tags";
import Photos from "../components/EditProduct/Photos";

const crumbs = [
  { label: "Home", url: "/" },
  { label: "Products", url: "/products" },
  { label: "Edit Product", url: "/products/edit-product" },
];

const EditProduct = () => {

  const toast = useRef(null);

  const navigate = useNavigate();
  const { productId } = useParams();

  // const [name, setName] = useState("");
  // const [files, setFiles] = useState(null);
  // const [errors, setErrors] = useState(null);
  const [product, setProduct] = useState({});

  const {isLoading, isError, data } = useQuery(
    "fetch-single-productcd",
    async () => {
      const response = await fetchSingleProduct(productId);
      const data = await response.data;
      const prod = await data.product;
      await setProduct(prod)
      return prod
    },
    { refetchOnWindowFocus: false }
  );


  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        detail: "Something went wrong, Please try later",
        life: 3000,
      });

      const redirect = setTimeout(() => {
        navigate("/products");
      }, 3000);

      return () => clearTimeout(redirect);
    }
  }, [isError]);

  console.log('nigaz', data)

  return (
    <div>
      <Toast ref={toast} />
      <Dashboard
        items={crumbs}
        title="Edit Product"
        rightElement={
          <>
            <CustomButton
            // onClick={() => setConformDelete(true)}
            className="p-button-primary"
            icon="pi pi-check"
            // disabled={!selectedProducts || !selectedProducts.length > 0}
            label='Save'
          />
          </>
        }
      >
        {
          isLoading || isError ?
          <Loader/>
          :
          <div className="grid  pt-4">
              <div className="col-7">
                <BasicInfo 
                  setProduct={setProduct}
                  product={product}
                />
                <Pricing 
                  setProduct={setProduct}
                  product={product}
                />
                <Inventory 
                  setProduct={setProduct}
                  product={product}
                />
              </div>
              <div className="col-5">
                <Visibility 
                  setProduct={setProduct}
                  product={product}
                />
                <Categories 
                  setProduct={setProduct}
                  product={product}
                />
                <Tags 
                  setProduct={setProduct}
                  product={product}
                />
                {/* <Photos 
                  setProduct={setProduct}
                  product={product}
                /> */}
              </div>
          </div>
        }
      </Dashboard>
    </div>
  )
}

export default EditProduct