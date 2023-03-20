import { Dialog, Toast } from "primereact";
import React, { useRef } from "react";
import { useMutation } from "react-query";
import { signUp } from "../../services/auth";
import NewUserForm from "./NewUserForm";

const CreateNewUser = (props) => {

    const {newUserDialog, setNewUserDialog, fetchCustomersQuery, editCustomer} = props;

    const toast = useRef(null);

    const createNewUser = useMutation((body) => signUp(body), {
      onSuccess: () => {
        toast.current.show({
          severity: "success",
          detail: 'Customer created',
          life: 3000,
        });
        setNewUserDialog(false);
        fetchCustomersQuery.refetch()
      },
      onError:(error) => {
        toast.current.show({
          severity: "error",
          detail: 'Something went wrong',
          life: 3000,
        });
      }
    })

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="New User"
        visible={newUserDialog}
        style={{ width: "60vw" }}
        onHide={() => setNewUserDialog(false)}
      >
        <NewUserForm fetchCustomersQuery={fetchCustomersQuery} setNewUserDialog={setNewUserDialog} createNewUser={createNewUser} editCustomer={editCustomer}/>
      </Dialog>
    </>
  );
};

export default CreateNewUser;
