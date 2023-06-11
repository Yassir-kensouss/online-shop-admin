import { Dropdown } from "primereact";
import React from "react";
import { useQuery } from "react-query";
import { fetchBrands } from "../../services/settings";
import { useState } from "react";

const Brands = ({ selectedBrand, setSelectedBrand }) => {
  const [brands, setBrands] = useState([]);

  const handleBrandSelect = e => {
    setSelectedBrand(e.value);
  };

  const { data, isLoading, refetch } = useQuery(
    "fetchBrands",
    async () => {
      const response = await fetchBrands();
      const data = await response.data;
      let arr = [];
      data.brands.map(brand => {
        arr.push({ name: brand.brandName, code: brand._id });
      });
      setBrands(arr);
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <div className="np-card mt-3">
      <h2 className="np-card-title text-xl mb-5 font-medium">Brand</h2>
      <div className="flex gap-4">
        <Dropdown
          className="w-full"
          value={selectedBrand}
          options={brands}
          onChange={handleBrandSelect}
          optionLabel="name"
          placeholder="Select a brand"
          filter
        />
      </div>
    </div>
  );
};

export default Brands;
