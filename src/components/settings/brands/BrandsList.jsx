import { Button, Image } from "primereact";
import React from "react";

const BrandsList = ({
  brands,
  isLoading,
  isSuccess,
  data,
  setDeleteBrandDialog,
  setBrandId,
}) => {
  if (isLoading) {
    return <p className="mt-4">Loading...</p>;
  }

  if (!isSuccess || !data) {
    return <p className="mt-4 text-gray-700">No data</p>;
  }

  return (
    <>
      {brands.map(brand => (
        <li
          key={brand._id}
          className="w-full flex justify-content-between border-bottom-1 border-gray-300 pt-2 pb-2"
        >
          <div className="flex align-items-center gap-6">
            <Image
              preview
              className="settings-brand-img"
              src={brand.photo}
              alt={brand.brandName}
            />
            <p>{brand.brandName}</p>
          </div>
          <div>
            <Button
              onClick={() => {
                setDeleteBrandDialog(true);
                setBrandId(brand._id);
              }}
              style={{ transform: "scale(0.8)" }}
              icon="pi pi-trash"
              className="p-button-sm p-button-danger p-button-rounded"
            />
          </div>
        </li>
      ))}
    </>
  );
};

export default BrandsList;
