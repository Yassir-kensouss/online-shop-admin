import { Dialog, Toast } from "primereact";
import React, { useRef } from "react";
import { useMutation } from "react-query";
import { updateCustomerDetails } from "../../services/customers";
import EditDetailsForm from "./EditDetailsForm";

const EditCustomerDetails = props => {
  const { editUserDialog, setEditUserDialog, customer,fetchCustomersQuery } = props;

  const toast = useRef(null);

  const _updateCustomerDetails = useMutation(
    body => updateCustomerDetails(body),
    {
      onSuccess: () => {
        toast.current.show({
          severity: "success",
          detail: "Customer details updated",
          life: 3000,
        });
        setEditUserDialog(false)
        fetchCustomersQuery.refetch();
      },
      onError: () => {
        toast.current.show({
          severity: "error",
          detail: "Something went wrong",
          life: 3000,
        });
      },
    }
  );

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Edit details"
        visible={editUserDialog}
        style={{ width: "35vw" }}
        onHide={() => setEditUserDialog(false)}
      >
        <EditDetailsForm customer={customer} _updateCustomerDetails={_updateCustomerDetails}/>
      </Dialog>
    </>
  );
};

export default EditCustomerDetails;
