import React, { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import { useForm, Controller } from "react-hook-form";
import { fetchAllCategories, persistCategory } from "../services/category";
import CustomButton from "../components/buttons/CustomButton";
import Dashboard from "../components/Dashboard";
import { Dialog } from "primereact/dialog";
import { Button, InputText, Toast } from "primereact";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const crumbs = [
  { label: "Home", url: "/" },
  { label: "Categories", url: "/categories" },
];

const validate = {
  required: {
    value: true,
    message: "category name is required.",
  },
  maxLength: {
    value: 30,
    message: "category name is too long",
  },
  minLength: {
    value: 4,
    message: "category name must be between 4 and 30",
  },
};

const Categories = () => {
  const toast = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isError, isLoading, isSuccess } =
    useMutation(persistCategory);

  const { isLoading: getCategoriesLoading, data: categories } = useQuery(
    "categories",
    fetchAllCategories
  );

  useEffect(() => {}, [categories]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data, e) => {
    mutate(data);
    e.target.reset();
  };

  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "Somthing went wrong!",
        detail: "Email or password incorrect",
        life: 3000,
      });
    }

    if (isSuccess) {
      setIsModalOpen(false);
    }
  }, [isError, isSuccess]);

  return (
    <Dashboard
      items={crumbs}
      title="Categories"
      rightElement={
        <CustomButton
          onClick={() => setIsModalOpen(true)}
          label="New Category"
          icon="pi pi-plus"
        />
      }
    >
      <Toast ref={toast} />
      <Dialog
        header="Category"
        visible={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        closeOnEscape={true}
        ariaCloseIconLabel="close category dialog"
        className="addCategory"
        draggable={false}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-3 align-items-center mt-2">
            <Controller
              name="name"
              control={control}
              rules={validate}
              render={({ field, value, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  ref={field}
                  autoFocus
                  value={value}
                  placeholder="Add new category e.g. 'eBook'"
                  className={`w-full p-inputtext-sm ${
                    fieldState.invalid ? "p-invalid" : ""
                  }`}
                />
              )}
            />
            <Button
              label={!isLoading ? "Add" : ""}
              className="p-button-sm border-round-md"
              loading={isLoading}
            />
          </div>
          {errors.name && (
            <p className="mt-2 text-red-300 text-sm">{errors.name.message}</p>
          )}
        </form>
      </Dialog>
      <DataTable value={categories.data.categories} responsiveLayout="scroll">
        <Column field="name" header="Name" sortable></Column>
        <Column field="createdAt" header="Creation Time" sortable></Column>
        <Column field="createdAt" header="Creation Time" sortable></Column>
        <Column field="actions" header="Actions"></Column>
      </DataTable>
    </Dashboard>
  );
};

export default Categories;
