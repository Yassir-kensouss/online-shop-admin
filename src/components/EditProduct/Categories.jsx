import { MultiSelect } from "primereact";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { allCategories } from "../../services/category";

const Categories = (props) => {

  const {selectedCategories, setSelectedCategories, hasError, setHasError} = props;

  const [categories, setCategories] = useState([]);

  const handleCategoriesSelect = (e) => {

    const err = {};
    if(e.value?.length === 0){
      err.categories = "Product should at least belong to one category";
      setHasError(err)
    } else{
      delete err.categories
      setHasError(err)
    }

    setSelectedCategories(e.value)
  }

  const { data, isLoading, refetch } = useQuery(
    "fetchCategories-edit",
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
          onChange={handleCategoriesSelect}
          optionLabel="name"
          placeholder="Select a category"
          display="chip"
          filter
          panelFooterTemplate={panelFooterTemplate}
        />
      </div>
        { hasError && hasError?.categories? 
          <small className="p-error block mt-2">{hasError?.categories}</small>: null
        }
      <div className="mt-3 text-sm">
        <Link to='/categories'>Add New Category</Link>
      </div>
    </div>
  );
};

export default Categories;
