import { InputText, Tooltip } from "primereact";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { PRODUCT_DATATABLE_LIMIT } from "../../common/constants";
import { searchCategories } from "../../services/category";
import CustomButton from "../buttons/CustomButton";

const DataTableHeader = props => {
  const {
    categories,
    refetch,
    setCategories,
    setIsDeleteCategory,
    selectedCategory,
    setIsModalOpen,
    page,
    setTotal
  } = props;

  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState(null);

  const searchCat = useQuery(
    ["searchCategory",{page:page}],
    async () => {
      const response = await searchCategories(searchValue, page, PRODUCT_DATATABLE_LIMIT);
      const data = await response.data;
      setCategories(data.categories);
      setTotal(data.count)
    },
    { refetchOnWindowFocus: false, enabled: false }
  );

  const handleSearchCategory = e => {
    if (e.key === "Enter") {
      searchCat.refetch();
    }
  };

  return (
    <>
      {categories && categories?.length > 0 ? (
        <>
          <Tooltip
            target="#deleteCategory"
            content="Delete category"
            position="bottom"
          />
          {search ? (
            <span className="p-input-icon-right">
              <i className="pi pi-search" />
              <InputText
                placeholder="Search"
                autoFocus
                onChange={e => {
                  setSearchValue(e.target.value);
                  if (e.target.value === "") {
                    refetch();
                  }
                }}
                onKeyUp={e => handleSearchCategory(e)}
              />
            </span>
          ) : null}
          <CustomButton
            className="p-button-primary"
            icon={search ? "pi pi-times" : "pi pi-search"}
            onClick={() => {
              setSearch(!search);
              if (searchValue.length > 0) {
                refetch();
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
  );
};

export default DataTableHeader;
