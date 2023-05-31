import {
  Button,
  Column,
  DataTable,
  Dialog,
  Image,
  InputText,
  Paginator,
  Toast,
} from "primereact";
import React, { useRef } from "react";
import { useMutation } from "react-query";
import { PRODUCT_DATATABLE_LIMIT } from "../../common/constants";
import { updateCategory } from "../../services/category";
import MediaUploader from "../../common/MediaUploader";
import { useState } from "react";
import EditCategory from "./EditCategory";

const CategoriesDatatable = props => {
  const datatable = useRef(null);
  const [editForm, setEditForm] = useState(false);
  const [rowData, setRowData] = useState(false);
  const toast = useRef(null);
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    setPage,
    refetch,
    page,
    total,
  } = props;

  const updateRow = useMutation(data => updateCategory(data), {
    onSuccess: () => {
      refetch();
      toast.current.show({
        severity: "success",
        detail: "Category updated successfully",
        life: 3000,
      });
      setEditForm(false);
    },
    onError: () => {
      toast.current.show({
        severity: "error",
        detail: "Something went wrong",
        life: 3000,
      });
    },
  });

  const textEditor = options => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={e => options.editorCallback(e.target.value)}
      />
    );
  };

  const handlePageChange = e => {
    setPage(e.page);
    refetch();
  };

  const onRowEditComplete1 = e => {
    const newVal = e.newData.name;
    const oldVal = categories?.find(
      category => category._id === e.newData._id
    ).name;
    const newData = {
      name: e.newData.name,
      _id: e.newData._id,
    };
    if (newVal !== oldVal) {
      updateRow.mutate(newData);
    }
  };

  const renderImage = data => {
    return (
      <div className="w-3rem h-3rem">
        <Image
          preview
          className="rounded-image"
          src={data.image}
          alt={data.name}
        />
      </div>
    );
  };

  const imageUploader = () => {
    return <MediaUploader />;
  };

  const editRow = data => {
    setEditForm(true);
    setRowData(data);
  };

  const editRowBody = data => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-outlined p-button-sm"
        aria-label="Submit"
        onClick={() => editRow(data)}
      />
    );
  };

  return (
    <div ref={datatable} style={{ height: "calc(100vh - 200px)" }}>
      <Toast ref={toast} />
      <DataTable
        value={categories}
        responsiveLayout="scroll"
        scrollHeight="flex"
        scrollable
        selection={selectedCategory}
        onSelectionChange={e => setSelectedCategory(e.value)}
        className="categories-data-table custom-data-table"
        editMode="row"
        onRowEditComplete={onRowEditComplete1}
        stripedRows
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          exportable={false}
        ></Column>
        <Column
          field="image"
          header="Image"
          sortable
          body={data => renderImage(data)}
          editor={options => imageUploader(options)}
        ></Column>
        <Column
          field="name"
          header="Name"
          sortable
          editor={options => textEditor(options)}
        ></Column>
        <Column field="createdAt" header="Creation Time" sortable></Column>
        <Column
          field="linkedProduct"
          header="Linked Products"
          sortable
        ></Column>
        <Column
          header="Actions"
          body={data => editRowBody(data)}
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        ></Column>
      </DataTable>
      <Paginator
        first={page * PRODUCT_DATATABLE_LIMIT}
        rows={PRODUCT_DATATABLE_LIMIT}
        totalRecords={total}
        onPageChange={handlePageChange}
        className="custom-datatable-pagination"
      />
      <Dialog
        header="Edit Category"
        visible={editForm}
        style={{ width: "50vw" }}
        onHide={() => setEditForm(false)}
      >
        <EditCategory
          setEditForm={setEditForm}
          values={rowData}
          updateRow={updateRow}
        />
      </Dialog>
    </div>
  );
};

export default CategoriesDatatable;
