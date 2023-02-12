import {
  classNames,
  Editor,
  InputText,
  InputTextarea,
  Toast,
} from "primereact";
import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { Controller, useForm } from "react-hook-form";
import { MAX_LENGTH } from "../common/constants";

const crumbs = [
  { label: "Home", url: "/" },
  { label: "Products", url: "/products" },
  { label: "Edit Product", url: "/products/edit-product" },
];

const EditProduct = () => {
  const toast = useRef(null);

  const navigate = useNavigate();
  const { productId } = useParams();
  const [files, setFiles] = useState(null);
  const [product, setProduct] = useState({});
  const [visibility, setVisibility] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const [hasError, setHasError] = useState({});

  const { isLoading, isError, data } = useQuery(
    "fetch-single-product",
    async () => {
      const response = await fetchSingleProduct(productId);
      const data = await response.data;
      const prod = await data.product;
      setProduct(prod);
      setVisibility(prod.visibility);
      setSelectedCategories(prod.categories);
      setTags(prod.tags);
      setDescription(prod.description);
      return prod;
    },
    { refetchOnWindowFocus: false, cacheTime: 0 }
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

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    register,
    watch,
  } = useForm({
    defaultValues: useMemo(() => {
      return product;
    }, [product]),
  });

  useEffect(() => {
    reset(product);
  }, [product]);

  const onSubmit = data => {
    const body = {
      ...data,
      visibility: visibility,
      files: files,
      categories: selectedCategories,
      tags: tags,
      description: description,
    };

    if(Object.keys(errors)?.length == 0 || Object.keys(hasError)?.length == 0){
      alert('send api')
    }

  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Toast ref={toast} />
        <Dashboard
          items={crumbs}
          title="Edit Product"
          rightElement={
            <>
              <CustomButton
                type="submit"
                className="p-button-primary"
                icon="pi pi-check"
                label="Save"
                disabled={Object.keys(errors)?.length > 0 || Object.keys(hasError)?.length > 0}
              />
            </>
          }
        >
          {isLoading || isError ? (
            <Loader />
          ) : (
            <>
              <div className="grid  pt-4">
                <div className="col-7">
                  <BasicInfo
                    register={register}
                    errors={errors}
                    control={control}
                    setDescription={setDescription}
                    description={description}
                  />
                  <Pricing
                    errors={errors}
                    control={control}
                    register={register}
                    values={watch}
                  />
                  <Inventory
                    errors={errors}
                    control={control}
                    register={register}
                  />
                </div>
                <div className="col-5">
                  <Visibility
                    visibility={visibility}
                    setVisibility={setVisibility}
                  />
                  <Categories
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    hasError={hasError}
                    setHasError={setHasError}
                  />
                  <Tags setTags={setTags} tags={tags} />
                  <Photos
                    setProduct={setProduct}
                    product={product}
                    files={files}
                    setFiles={setFiles}
                  />
                </div>
              </div>
            </>
          )}
        </Dashboard>
      </form>
    </div>
  );
};

export default EditProduct;
