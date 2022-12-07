import { Button, Dialog, Toast } from "primereact";
import React, { useEffect, useRef } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { deleteManyCategories } from "../../services/category";
import { getCategries } from "../../store/categories";

const DeleteCategory = props => {
  const {
    setIsDeleteCategory,
    isDeleteCategory,
    selectedCategory,
    setSelectedCategory,
  } = props;

  const dispatch = useDispatch();
  const toast = useRef(null);

  const deleteMutation = useMutation(data => deleteManyCategories(data));

  const _deleteCategory = () => {
    let ids = [];
    selectedCategory &&
      selectedCategory.map(category => ids.push(category._id));
    deleteMutation.mutate({ ids: ids });
    console.log(deleteMutation.isSuccess);
  };

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      setIsDeleteCategory(false);
      toast.current.show({
        severity: "success",
        detail: `${
          selectedCategory && selectedCategory.length
        } categories deleted`,
        life: 3000,
      });
      dispatch(getCategries());
      setSelectedCategory(null);
    }
  }, [deleteMutation.isSuccess]);

  useEffect(() => {
    if (deleteMutation.isError) {
      setIsDeleteCategory(true);
      toast.current.show({
        severity: "error",
        detail: 'Something went wrong',
        life: 3000,
      });
    }
  }, [deleteMutation.isError]);

  const deleteCategoryDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setIsDeleteCategory(false)}
      />

      <Button
        onClick={() => _deleteCategory()}
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        loading={deleteMutation.isLoading}
      />
    </>
  );

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={isDeleteCategory}
        style={{ width: "450px" }}
        header="Confirm"
        draggable={false}
        onHide={() => setIsDeleteCategory(false)}
        footer={deleteCategoryDialogFooter}
      >
        <div className="flex align-items-center gap-3">
          <i
            className="pi pi-exclamation-triangle"
            style={{ fontSize: "1.5rem" }}
          />
          <p>
            Are you sure you want to delete{" "}
            {selectedCategory ? (
              <b>
                {selectedCategory && selectedCategory.length == 1
                  ? selectedCategory[0].name
                  : selectedCategory && selectedCategory.length + " categories"}
              </b>
            ) : null}
          </p>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteCategory;
