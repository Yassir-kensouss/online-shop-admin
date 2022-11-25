import React, { useEffect, useState, useRef } from "react";
import { useMutation } from "react-query";
import { useForm, Controller } from "react-hook-form";
import { persistCategory, deleteManyCategories } from "../services/category";
import CustomButton from "../components/buttons/CustomButton";
import Dashboard from "../components/Dashboard";
import { Dialog } from "primereact/dialog";
import { Button, InputText, Toast } from "primereact";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tooltip } from "primereact/tooltip";
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

  const deleteMutation = useMutation((data) => deleteManyCategories(data))

  const _deleteCategory = () => {
    let ids = [];
    selectedCategory && selectedCategory.map(category => ids.push(category._id))
    deleteMutation.mutate({ids:ids})
    console.log(deleteMutation.isSuccess)
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteCategory, setIsDeleteCategory] = useState(false);
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

  useEffect(() => {
    if(deleteMutation.isSuccess){
      setIsDeleteCategory(false)
      toast.current.show({
        severity: "success",
        detail: `${selectedCategory && selectedCategory.length} categories deleted`,
        life: 3000,
      });
      dispatch(getCategries());
      setSelectedCategory(null)
    }
  },[deleteMutation.isSuccess])

  const deleteCategoryDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setIsDeleteCategory(false)}
      />
      
      <Button
        onClick={() => _deleteCategory()}
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
      />
    </>
  );

  console.log("selected category", selectedCategory);

  return (
    <Dashboard
      items={crumbs}
      title="Categories"
      rightElement={
        <>
          {categories && categories.length > 0 ? (
            <>
              <Tooltip
                target="#deleteCategory"
                content="Delete category"
                position="bottom"
              />
              <CustomButton
                onClick={() => setIsDeleteCategory(true)}
                className="p-button-danger"
                icon="pi pi-trash"
                disabled={!selectedCategory || !selectedCategory.length}
                id="deleteCategory"
                aria-label="delete category"
              />
            </>
          ) : null}
          {categories && categories.length > 0 ? (
            <CustomButton
              label="New Category"
              icon="pi pi-plus"
              onClick={() => setIsModalOpen(true)}
            />
          ) : null}
        </>
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
      <Dialog
        visible={isDeleteCategory}
        style={{ width: "450px" }}
        header="Confirm"
        draggable={false}
        onHide={() => setIsDeleteCategory(false)}
        footer={deleteCategoryDialogFooter}
      >
        <div className="flex align-items-center gap-3">
          <i
            className="pi pi-exclamation-triangle"
            style={{ fontSize: "1.5rem" }}
          />
          <p>
            Are you sure you want to delete{" "}
            {selectedCategory ? (
              <b>
                {selectedCategory && selectedCategory.length == 1
                  ? selectedCategory[0].name
                  : selectedCategory && selectedCategory.length + " categories"}
              </b>
            ) : null}
          </p>
        </div>
      </Dialog>
      {categories && categories.length > 0 ? (
        <DataTable
          value={categories}
          responsiveLayout="scroll"
          selection={selectedCategory}
          onSelectionChange={(e) => setSelectedCategory(e.value)}
          className='categories-data-table'
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            exportable={false}
          ></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column field="createdAt" header="Creation Time" sortable></Column>
          <Column
            field="linked products"
            header="Linked Products"
            sortable
          ></Column>
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
