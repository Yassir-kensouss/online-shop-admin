import { MultiSelect, Skeleton } from "primereact";
import React, { useState } from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { ContextContainer } from "../../pages/NewProduct";
import { allCategories } from "../../services/category";

const BasicInfo = () => {

  const {product, setProduct} = useContext(ContextContainer);

  const [selectedCategories, setSelectedCategories] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleCatgoriesSelect = (e) => {
    setSelectedCategories(e.value)
    setProduct({
      ...product,
      categories: e.value
    })
  }

  const { data, isLoading, refetch } = useQuery(
    "fetchCategories",
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

  return (
    <div className="bg-white p-3 border-round-sm mt-3">
      <h2 className="text-xl mb-5 font-medium text-800">Categories</h2>
      <div className="flex gap-4">
        <MultiSelect
          className="w-full"
          value={selectedCategories}
          options={categories}
          onChange={handleCatgoriesSelect}
          optionLabel="name"
          placeholder="Select a category"
          display="chip"
        />
      </div>
      <div className="mt-3 text-sm">
        <Link to='/categories'>Add New Category</Link>
      </div>
    </div>
  );
};

export default BasicInfo;
