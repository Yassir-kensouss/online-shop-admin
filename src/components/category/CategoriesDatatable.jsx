import { Column, DataTable, InputText, Paginator, Toast } from "primereact";
import React, { useRef } from "react";
import { useMutation } from "react-query";
import { PRODUCT_DATATABLE_LIMIT } from "../../common/constants";
import { updateCategory } from "../../services/category";

const CategoriesDatatable = props => {
  const datatable = useRef(null);
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
        className="categories-data-table"
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
          rowEditor
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        ></Column>
      </DataTable>
      <Paginator
        first={page * PRODUCT_DATATABLE_LIMIT}
        rows={PRODUCT_DATATABLE_LIMIT}
        totalRecords={total}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CategoriesDatatable;
