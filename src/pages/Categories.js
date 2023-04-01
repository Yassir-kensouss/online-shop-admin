import React, { useEffect, useState, useRef } from "react";
import CustomButton from "../components/buttons/CustomButton";
import Dashboard from "../components/Dashboard";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tooltip } from "primereact/tooltip";
import EmptyBox from "../components/EmptyBox";
import { CategoryIcon } from "../assets/icons";
import AddCategory from "../components/category/AddCategory";
import DeleteCategory from "../components/category/DeleteCategory";
import DataTableSkeleton from "../components/loadings/DataTableSkeleton";
import { InputText, Toast } from "primereact";
import Pagination from "../components/pagination/Pagination";
import { useMutation, useQuery } from "react-query";
import { fetchAllCategories, searchCategories, updateCategory } from "../services/category";

const crumbs = [
  { label: "Home", url: "/" },
  { label: "Categories", url: "/categories" },
];

const Categories = () => {

  const toast = useRef(null);
  const datatable = useRef(null);

  const updateRow = useMutation((data) => updateCategory(data))

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteCategory, setIsDeleteCategory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollTop, setScrollTop] = useState(null);
  const [categoriesCount, setCategoriesCount] = useState(null);
  const [perPage, setPerPage] = useState(null);
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [categories,setCategories] = useState([]);

  const {data, isLoading, refetch} = useQuery('fetchCategories', async () => {
    const response = await fetchAllCategories(currentPage);
    const data = await response.data;
    setCategoriesCount(data.count)
    setPerPage(data.perPage);
    setCategories(data.categories)
    // return data.categories;
  },{refetchOnWindowFocus:false})

  const searchCat = useQuery('searchCategory', async () => {
    const response = await searchCategories(searchValue);
    const data = await response.data;
    setCategoriesCount(data.count)
    setPerPage(data.perPage);
    setCategories(data.categories)
  },{refetchOnWindowFocus:false, enabled: false})

  // Set scroll top of the parent element to avoid scrolling top after component render
  useEffect(() => {
    const el = document.querySelector(".dashboard__main");
    el.scrollTo(0, scrollTop);
  }, [data]);

  const onRowEditComplete1 = (e) => {
    const newVal = e.newData.name;
    const oldVal = categories?.find(category => category._id === e.newData._id).name;
    const newData = {
      name: e.newData.name,
      _id: e.newData._id
    }
    if(newVal !== oldVal){
      updateRow.mutate(newData)
    }
  }

  useEffect(() => {
    if(updateRow.isSuccess){
      refetch()
      toast.current.show({
        severity: "success",
        detail: 'Category updated successfully',
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

  useEffect(() => {
    refetch()
  },[currentPage])

  const handleSearchCategory = (e) => {
    if(e.key === 'Enter'){
      searchCat.refetch()
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <Dashboard
        items={crumbs}
        title="Categories"
        rightElement={
          <>
            {categories && categories?.length > 0 ? (
              <>
                <Tooltip
                  target="#deleteCategory"
                  content="Delete category"
                  position="bottom"
                />
                {
                  search ?
                  <span className="p-input-icon-right">
                    <i className="pi pi-search" />
                    <InputText placeholder="Search" 
                      onChange={(e) => {
                        setSearchValue(e.target.value)
                        if(e.target.value === ''){
                          refetch()
                        }
                      }} 
                      onKeyUp={(e) => handleSearchCategory(e)}
                    /> 
                  </span> : null
                }
                <CustomButton
                  className="p-button-primary"
                  icon={search ? "pi pi-times" : "pi pi-search"}
                  onClick={() => {
                    setSearch(!search)
                    if(searchValue.length > 0){
                      refetch()
                    }
                  }}
                />
                <CustomButton
                  onClick={() => setIsDeleteCategory(true)}
                  className="p-button-danger"
                  icon="pi pi-trash"
                  disabled={!selectedCategory || !selectedCategory.length}
                  id="deleteCategory"
                  aria-label="delete category"
                />
                <CustomButton
                  label="New Category"
                  icon="pi pi-plus"
                  onClick={() => setIsModalOpen(true)}
                />
              </>
            ) : null}
          </>
        }
      >
        <AddCategory
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          refetch={refetch}
        />
        <DeleteCategory
          isDeleteCategory={isDeleteCategory}
          setIsDeleteCategory={setIsDeleteCategory}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          refetch={refetch}
        />
        {isLoading ? (
          <DataTableSkeleton />
        ) : categories && categories?.length > 0 ? (
          <div ref={datatable} style={{ height: 'calc(100vh - 150px)' }}>
            <DataTable
              value={categories}
              responsiveLayout="scroll"
              scrollHeight="flex"
              scrollable 
              selection={selectedCategory}
              onSelectionChange={e => setSelectedCategory(e.value)}
              className="categories-data-table"
              editMode="row"
              onRowEditComplete={onRowEditComplete1}
              stripedRows
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
                field="linkedProduct"
                header="Linked Products"
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
                  count={categoriesCount}
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
