import React, { useEffect, useState, useRef } from "react";
import CustomButton from "../components/buttons/CustomButton";
import Dashboard from "../components/Dashboard";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tooltip } from "primereact/tooltip";
import { useDispatch, useSelector } from "react-redux";
import { getCategries } from "../store/categories";
import EmptyBox from "../components/EmptyBox";
import { CategoryIcon } from "../assets/icons";
import AddCategory from "../components/category/AddCategory";
import DeleteCategory from "../components/category/DeleteCategory";
import DataTableSkeleton from "../components/loadings/DataTableSkeleton";
import { InputText, Toast } from "primereact";
import Pagination from "../components/pagination/Pagination";
import { useMutation } from "react-query";
import { updateCategory } from "../services/category";

const crumbs = [
  { label: "Home", url: "/" },
  { label: "Categories", url: "/categories" },
];

const Categories = () => {
  const dispatch = useDispatch();

  const toast = useRef(null);
  const datatable = useRef(null);

  const updateRow = useMutation((data) => updateCategory(data))

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteCategory, setIsDeleteCategory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const categories = useSelector(state => state.categories.categories) || {};
  const loading = useSelector(state => state.categories.loading);
  const fetchingCategoriesError = useSelector(state => state.categories.error);
  const count = useSelector(state => state.categories.count);
  const perPage = useSelector(state => state.categories.perPage);
  const [scrollTop, setScrollTop] = useState(null);

  useEffect(() => {
    dispatch(getCategries(currentPage));
  }, []);

  useEffect(() => {
    if (fetchingCategoriesError) {
      toast.current.show({
        severity: "error",
        detail: fetchingCategoriesError,
        life: 7000,
      });
    }
  }, [fetchingCategoriesError]);

  useEffect(() => {
    dispatch(getCategries(currentPage));
    const el = document.querySelector(".dashboard__main");
    el.scrollTo(0, 100);
  }, [currentPage]);

  // Set scroll top of the parent element to avoid scrolling top after component render
  useEffect(() => {
    const el = document.querySelector(".dashboard__main");
    el.scrollTo(0, scrollTop);
  }, [categories]);

  const onRowEditComplete1 = (e) => {
    const newVal = e.newData.name;
    const oldVal = categories.find(category => category._id === e.newData._id).name;
    const data = {
      name: e.newData.name,
      _id: e.newData._id
    }
    if(newVal !== oldVal){
      updateRow.mutate(data)
    }
  }

  useEffect(() => {
    if(updateRow.isSuccess){
      dispatch(getCategries(currentPage));
      toast.current.show({
        severity: "success",
        detail: 'Category updated successeffly',
        life: 3000,
      });
    }
  },[updateRow.isSuccess])

  useEffect(() => {
    if(updateRow.isError){
      toast.current.show({
        severity: "error",
        detail: 'Something went wrong',
        life: 3000,
      });
    }
  },[updateRow.isError])

  const textEditor = options => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={e => options.editorCallback(e.target.value)}
      />
    );
  };

  return (
    <>
      <Toast ref={toast} />
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
        <AddCategory
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <DeleteCategory
          isDeleteCategory={isDeleteCategory}
          setIsDeleteCategory={setIsDeleteCategory}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {loading ? (
          <DataTableSkeleton />
        ) : categories && categories.length > 0 ? (
          <div ref={datatable}>
            <DataTable
              value={categories}
              responsiveLayout="scroll"
              selection={selectedCategory}
              onSelectionChange={e => setSelectedCategory(e.value)}
              className="categories-data-table"
              editMode="row"
              onRowEditComplete={onRowEditComplete1}
            >
              <Column
                selectionMode="multiple"
                headerStyle={{ width: "3rem" }}
                exportable={false}
              ></Column>
              <Column
                field="name"
                header="Name"
                sortable
                editor={options => textEditor(options)}
              ></Column>
              <Column
                field="createdAt"
                header="Creation Time"
                sortable
              ></Column>
              <Column
                header='Actions'
                rowEditor
                headerStyle={{ width: "10%", minWidth: "8rem" }}
                bodyStyle={{ textAlign: "center" }}
              ></Column>
            </DataTable>
            {
              <div className="w-full flex justify-content-end m-2">
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pages={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  count={count}
                  perPage={perPage}
                  setScrollTop={setScrollTop}
                />
              </div>
            }
          </div>
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
    </>
  );
};

export default Categories;
