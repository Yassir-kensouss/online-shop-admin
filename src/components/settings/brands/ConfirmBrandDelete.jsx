import { Button } from "primereact";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { deleteBrands } from "../../../services/settings";

const ConfirmBrandDelete = ({ setDeleteBrandDialog, brandId, refetch }) => {
  const { isLoading, mutate } = useMutation(data => deleteBrands(data), {
    onSuccess: () => {
      setDeleteBrandDialog(false);
      refetch();
    },
  });

  return (
    <div>
      <p>Are you sure you want to delete this brand</p>
      <div className="flex gap-2 justify-content-end mt-4">
        <Button
          loading={isLoading}
          onClick={() => mutate(brandId)}
          label="Ok"
          className="p-button-primary p-button-sm"
        />
        <Button
          label="Cancel"
          className="p-button-danger p-button-sm"
          onClick={() => setDeleteBrandDialog(false)}
        />
      </div>
    </div>
  );
};

export default ConfirmBrandDelete;
