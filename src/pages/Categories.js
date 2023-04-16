import React, { useEffect, useState, useRef } from "react";
import CustomButton from "../components/buttons/CustomButton";
import Dashboard from "../components/Dashboard";
import EmptyBox from "../components/EmptyBox";
import { CategoryIcon } from "../assets/icons";
import AddCategory from "../components/category/AddCategory";
import DeleteCategory from "../components/category/DeleteCategory";
import DataTableSkeleton from "../components/loadings/DataTableSkeleton";
import { useQuery } from "react-query";
import { fetchAllCategories} from "../services/category";
import { PRODUCT_DATATABLE_LIMIT } from "../common/constants";
import DataTableHeader from "../components/category/DataTableHeader";
import CategoriesDatatable from "../components/category/CategoriesDatatable";

const crumbs = [
  { label: "Home", url: "/" },
  { label: "Categories", url: "/categories" },
];

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteCategory, setIsDeleteCategory] = useState(false);
  const [scrollTop, setScrollTop] = useState(null);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const { data, isLoading, refetch } = useQuery(
    ["fetchCategories", { page: page }],
    async () => {
      const response = await fetchAllCategories(page, PRODUCT_DATATABLE_LIMIT);
      const data = await response.data;
      setTotal(data.count);
      setCategories(data.categories);
    },
    { refetchOnWindowFocus: false }
  );

  // Set scroll top of the parent element to avoid scrolling top after component render
  useEffect(() => {
    const el = document.querySelector(".dashboard__main");
    el.scrollTo(0, scrollTop);
  }, [data]);

  return (
    <>
      <Dashboard
        items={crumbs}
        title="Categories"
        rightElement={
          <DataTableHeader
            categories={categories}
            refetch={refetch}
            setCategories={setCategories}
            setIsDeleteCategory={setIsDeleteCategory}
            selectedCategory={selectedCategory}
            setIsModalOpen={setIsModalOpen}
            setTotal={setTotal}
            page={page}
          />
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
          <CategoriesDatatable
            page={page}
            total={total}
            setTotal={setTotal}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setPage={setPage}
            refetch={refetch}
            isLoading={isLoading}
          />
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
