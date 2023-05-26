import { Button, Dialog, Image } from "primereact";
import React from "react";
import { useState } from "react";
import NewBrandForm from "./NewBrandForm";
import { useQuery } from "react-query";
import { fetchBrands } from "../../../services/settings";
import BrandsList from "./BrandsList";
import ConfirmBrandDelete from "./ConfirmBrandDelete";

const BrandCarousal = () => {
  const [formDialog, setFormDialog] = useState(false);
  const [brands, setBrands] = useState([]);
  const [deleteBrandDialog, setDeleteBrandDialog] = useState(false);
  const [brandId, setBrandId] = useState("");

  const { isLoading, refetch, isSuccess, data } = useQuery(
    "fetch-brands",
    async () => {
      const response = await fetchBrands();
      const data = await response.data.brands;
      setBrands(data);
      return data;
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <div className="w-full p-2">
      <div className="w-full flex justify-content-between align-items-center">
        <h2 className="text-gray-800 text-lg font-semibold">Brands</h2>
        <Button
          className="p-button-primary p-button-sm"
          label="Add slide"
          icon="pi pi-plus"
          onClick={() => setFormDialog(true)}
        />
      </div>
      <ul className="mt-4">
        <li className="w-full flex justify-content-between pt-2 pb-2 border-bottom-1 border-gray-300">
          <div className="flex align-items-center gap-6 text-gray-700 text-sm">
            <p>Logo</p>
            <p>Brand Name</p>
          </div>
          <div className="text-gray-700 text-sm">
            <p>Actions</p>
          </div>
        </li>
        <BrandsList
          brands={brands}
          isLoading={isLoading}
          isSuccess={isSuccess}
          data={data}
          setDeleteBrandDialog={setDeleteBrandDialog}
          setBrandId={setBrandId}
        />
      </ul>
      <Dialog
        header="New brands"
        visible={formDialog}
        style={{ width: "50vw" }}
        onHide={() => setFormDialog(false)}
        draggable={false}
      >
        <NewBrandForm setFormDialog={setFormDialog} refetch={refetch} />
      </Dialog>
      <Dialog
        header="New brands"
        visible={deleteBrandDialog}
        style={{ width: "25vw" }}
        onHide={() => setDeleteBrandDialog(false)}
        draggable={false}
      >
        <ConfirmBrandDelete
          refetch={refetch}
          brandId={brandId}
          setDeleteBrandDialog={setDeleteBrandDialog}
        />
      </Dialog>
    </div>
  );
};

export default BrandCarousal;
