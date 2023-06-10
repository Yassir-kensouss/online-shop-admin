import { Dropdown, MultiSelect, Skeleton } from "primereact";
import React, { useState } from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { EditProductContext } from "../../pages/EditProduct";
import { ContextContainer } from "../../pages/NewProduct";
import { allCategories } from "../../services/category";

const Categories = () => {
  const { product, setProduct, errors } = useContext(ContextContainer);

  const [selectedCategories, setSelectedCategories] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleCategoriesSelect = e => {
    setSelectedCategories(e.value);
    setProduct({
      ...product,
      category: e.value,
    });
  };

  const { data, isLoading, refetch } = useQuery(
    "fetchCategories-create",
    async () => {
      const response = await allCategories();
      const data = await response.data;
      let arr = [];
      data.categories.map(category => {
        arr.push({ name: category.name, code: category._id });
      });
      setCategories(arr);
    },
    { refetchOnWindowFocus: false }
  );

  const panelFooterTemplate = () => {
    const selectedItems = selectedCategories;
    const length = selectedItems ? selectedItems.length : 0;
    return (
      <div className="py-2 px-3">
        <b>{length}</b> item{length > 1 ? "s" : ""} selected.
      </div>
    );
  };

  return (
    <div className="np-card mt-3">
      <h2 className="np-card-title text-xl mb-5 font-medium">Categories *</h2>
      <div className="flex gap-4">
        <Dropdown
          className="w-full"
          value={selectedCategories}
          options={categories}
          onChange={handleCategoriesSelect}
          optionLabel="name"
          placeholder="Select a category"
          filter
        />
      </div>
      {errors && "category" in errors ? (
        <p className="text-red-400 mt-2 text-sm">{errors["category"]}</p>
      ) : null}
      <div className="mt-3 text-sm">
        <Link to="/categories" className="links">
          Add New Category
        </Link>
      </div>
    </div>
  );
};

export default Categories;
