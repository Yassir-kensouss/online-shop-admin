import React, { useEffect, useState, useRef } from "react";
import { useMutation } from "react-query";
import { useForm, Controller } from "react-hook-form";
import { persistCategory } from "../services/category";
import CustomButton from "../components/buttons/CustomButton";
import Dashboard from "../components/Dashboard";
import { Dialog } from "primereact/dialog";
import { Button, InputText, Toast } from "primereact";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { addNewCategory, getCategries } from "../store/categories";
import EmptyBox from "../components/EmptyBox";
import { CategoryIcon } from "../assets/icons";

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
  pattern: {
    value: /^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/,
    message: "Only letters and numbers allowed",
  },
};

const Categories = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isError, isLoading, isSuccess, data } =
    useMutation(persistCategory);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = useSelector((state) => state.categories.categories) || {};

  const onSubmit = (data, e) => {
    mutate(data);
    e.target.reset();
  };

  useEffect(() => {
    dispatch(getCategries());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      dispatch(
        addNewCategory({
          type: "ADD_NEW_CATEGORY",
          category: data.data.category,
        })
      );
      reset({});
    }
  }, [isError, isSuccess]);

  return (
    <Dashboard
      items={crumbs}
      title="Categories"
      rightElement={
        categories && categories.length > 0 ? (
          <CustomButton
            onClick={() => setIsModalOpen(true)}
            label="New Category"
            icon="pi pi-plus"
          />
        ) : null
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
      {categories && categories.length > 0 ? (
        <DataTable value={categories} responsiveLayout="scroll">
          <Column field="name" header="Name" sortable></Column>
          <Column field="createdAt" header="Creation Time" sortable></Column>
          <Column field="createdAt" header="Creation Time" sortable></Column>
          <Column field="actions" header="Actions"></Column>
        </DataTable>
      ) : (
        <EmptyBox
          icon={<CategoryIcon />}
          parentClassName="pb-8"
          title="No Category"
          message="Once you create a new category, will be listed here"
          action={
            <CustomButton
              onClick={() => setIsModalOpen(true)}
              label="New Category"
              icon="pi pi-plus"
            />
          }
        />
      )}
    </Dashboard>
  );
};

export default Categories;
