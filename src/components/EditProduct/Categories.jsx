import { MultiSelect } from "primereact";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { allCategories } from "../../services/category";

const Categories = (props) => {

  const {product, setProduct} = props;

  const [selectedCategories, setSelectedCategories] = useState(null);
  const [categories, setCategories] = useState([]);

  console.log('selected', selectedCategories)

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
      setSelectedCategories(product.categories)
    },
    { refetchOnWindowFocus: false }
  );

  const panelFooterTemplate = () => {
    const selectedItems = selectedCategories;
    const length = selectedItems ? selectedItems.length : 0;
    return (
        <div className="py-2 px-3">
            <b>{length}</b> item{length > 1 ? 's' : ''} selected.
        </div>
    );
  }

  return (
    <div className="bg-white p-3 border-round-sm mt-3">
      <h2 className="text-xl mb-5 font-medium text-800">Categories *</h2>
      <div className="flex gap-4">
        <MultiSelect
          className="w-full"
          value={selectedCategories}
          options={categories}
          onChange={handleCatgoriesSelect}
          optionLabel="name"
          placeholder="Select a category"
          display="chip"
          filter
          panelFooterTemplate={panelFooterTemplate}
        />
      </div>
      <div className="mt-3 text-sm">
        <Link to='/categories'>Add New Category</Link>
      </div>
    </div>
  );
};

export default Categories;
