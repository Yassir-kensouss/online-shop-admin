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
import {
  Button,
  classNames,
  Dropdown,
  InputText,
  Paginator,
  Ripple,
  Toast,
} from "primereact";
import Pagination from "../components/pagination/Pagination";

const crumbs = [
  { label: "Home", url: "/" },
  { label: "Categories", url: "/categories" },
];

const Categories = () => {
  const dispatch = useDispatch();

  const toast = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [basicFirst, setBasicFirst] = useState(0);
  const [basicRows, setBasicRows] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteCategory, setIsDeleteCategory] = useState(false);
  const [page, setPage] = useState(0);
  const categories = useSelector(state => state.categories.categories) || {};
  const loading = useSelector(state => state.categories.loading);
  const fetchingCategoriesError = useSelector(state => state.categories.error);

  useEffect(() => {
    dispatch(getCategries());
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

  const onBasicPageChange = (event) => {
    setBasicFirst(event.first);
    setBasicRows(event.rows);
    setPage(event.page)
    console.log('first', event)
  }
  
  useEffect(() => {
    // dispatch(getCategries(page));

    setBasicFirst(page * 10)
  },[page])

  const handlePageClick = (btn) => {
    dispatch(getCategries(btn))
  }

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
          <>
            <DataTable
              value={categories}
              responsiveLayout="scroll"
              selection={selectedCategory}
              onSelectionChange={e => setSelectedCategory(e.value)}
              className="categories-data-table"
            >
              <Column
                selectionMode="multiple"
                headerStyle={{ width: "3rem" }}
                exportable={false}
              ></Column>
              <Column field="name" header="Name" sortable></Column>
              <Column
                field="createdAt"
                header="Creation Time"
                sortable
              ></Column>
              <Column
                field="linked products"
                header="Linked Products"
                sortable
              ></Column>
            </DataTable>
            {/* <Paginator
              first={basicFirst}
              rows={basicRows}
              totalRecords={120}
              rowsPerPageOptions={[5, 10, 15, 25, 30]}
              onPageChange={onBasicPageChange}
            ></Paginator> */}
            {
              <Pagination/>
            }
          </>
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
