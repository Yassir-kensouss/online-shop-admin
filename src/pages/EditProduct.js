import { Toast } from "primereact";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Dashboard from "../components/Dashboard";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomButton from "../components/buttons/CustomButton";
import { useMutation, useQuery } from "react-query";
import { fetchSingleProduct, updateProduct } from "../services/product";
import Loader from "../components/Loader";
import BasicInfo from "../components/EditProduct/BasicInfo";
import Pricing from "../components/EditProduct/Pricing";
import Inventory from "../components/EditProduct/Inventory";
import Visibility from "../components/EditProduct/Visibility";
import Categories from "../components/EditProduct/Categories";
import Tags from "../components/EditProduct/Tags";
import Photos from "../components/EditProduct/Photos";
import { useForm } from "react-hook-form";

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
  const [selectedCategories, setSelectedCategories] = useState({});
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const [hasError, setHasError] = useState({});

  const { isLoading, isError } = useQuery(
    "fetch-single-product",
    async () => {
      const response = await fetchSingleProduct(productId);
      const data = await response.data;
      const prod = await data.product;
      setProduct(prod);
      setVisibility(prod.visibility);
      setSelectedCategories(prod.category);
      setTags(prod.tags);
      setDescription(prod.description);
      return prod;
    },
    { refetchOnWindowFocus: false, cacheTime: 0 }
  );

  const successMessage = (
    <>
      <p>
        Product updated successfully{" "}
        <Link to="/products" className="text-green-500">
          See The products
        </Link>
      </p>
    </>
  );

  const updateProductMutation = useMutation(
    data => updateProduct(data),
    {
      onSuccess: () => {
        toast.current.show({
          severity: "success",
          detail: successMessage,
          life: 3000,
        });
      },
      onError: error => {
        toast.current.show({
          severity: "error",
          detail: error?.response.data,
          life: 3000,
        });
      },
    },
    { useErrorBoundary: true }
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

  const onSubmit = async data => {
    const body = {
      _id: data._id,
      name: data.name,
      shortDescription: data.shortDescription,
      price: data.price,
      oldPrice: data.oldPrice,
      sku: data.sku,
      quantity: data.quantity,
      visibility: visibility,
      category: selectedCategories,
      tags: tags,
      description: description,
      photos: files,
    };

    if (
      Object.keys(errors)?.length == 0 ||
      Object.keys(hasError)?.length == 0
    ) {
      updateProductMutation.mutate(body);
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
                disabled={
                  Object.keys(errors)?.length > 0 ||
                  Object.keys(hasError)?.length > 0
                }
                loading={updateProductMutation.isLoading}
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
