import {
  Badge,
  Button,
  Column,
  ConfirmDialog,
  DataTable,
  InputText,
  Menu,
  Toast,
} from "primereact";
import React, { useRef, useState } from "react";
import { useMutation } from "react-query";
import {
  deleteProduct,
  duplicateProduct,
  fetchAllProducts,
} from "../../services/product";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { useNavigate } from "react-router-dom";

const ProductTable = props => {
  const navigate = useNavigate();

  const { selectedProducts, setSelectedProducts, productsQuery } = props;

  const [confirmDelete, setConformDelete] = useState(false);

  const menu = useRef(null);
  const toast = useRef(null);

  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });

  const filtersMap = {
    filters1: { value: filters1, callback: setFilters1 },
  };

  const onGlobalFilterChange = (event, filtersKey) => {
    const value = event.target.value;
    let filters = { ...filtersMap[filtersKey].value };
    filters["global"].value = value;

    filtersMap[filtersKey].callback(filters);
  };

  const renderHeader = filtersKey => {
    const filters = filtersMap[`${filtersKey}`].value;
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={value || ""}
          onChange={e => onGlobalFilterChange(e, filtersKey)}
          placeholder="Global Search"
        />
      </span>
    );
  };

  const header1 = renderHeader("filters1");

  // Render a badge based on visibility type
  const renderVisibility = rowData => {
    let intent = "";
    switch (rowData.visibility) {
      case "published":
        intent = "p-badge-success";
        break;
      case "hidden":
        intent = "p-badge-muted";
        break;
      case "scheduled":
        intent = "p-badge-warning";
        break;
      default:
        return;
    }
    return (
      <>
        <Badge
          value={rowData.visibility}
          className={`custom-badge ${intent}`}
          severity="success"
        ></Badge>
      </>
    );
  };

  const setPrice = rowData => {
    return <span>{`${rowData.price} $`}</span>;
  };

  const duplicate = useMutation(data => duplicateProduct(data), {
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        detail: "Product duplicated",
        life: 3000,
      });
      productsQuery.refetch();
    },
    onError: () => {
      toast.current.show({
        severity: "error",
        detail: "Something went wrong",
        life: 3000,
      });
    },
  });

  const deleteProd = useMutation(id => deleteProduct(id), {
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        detail: "Product deleted",
        life: 3000,
      });
      productsQuery.refetch();
    },
    onError: () => {
      toast.current.show({
        severity: "error",
        detail: "Something went wrong",
        life: 3000,
      });
    },
  });

  const [rowBody, setRowBody] = useState(null);

  const renderActions = rowData => {
    let items = [
      {
        label: "Edit",
        icon: "pi pi-fw pi-file-edit",
        command: () => navigate(`/products/edit-product/${rowBody._id}`),
      },
      {
        label: "Duplicate",
        icon: "pi pi-fw pi-copy",
        command: () => duplicate.mutate(rowBody),
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-trash",
        command: () => setConformDelete(true),
      },
    ];

    return (
      <>
        <Menu model={items} popup ref={menu} id="popup_menu" />
        <Button
          icon="pi pi-ellipsis-v"
          onClick={event => {
            menu.current.toggle(event);
            setRowBody(rowData);
          }}
          aria-controls="popup_menu"
          aria-haspopup
          className="p-button-rounded p-button-secondary p-button-text p-button-sm table-btn-icon"
        />
      </>
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog
        visible={confirmDelete}
        onHide={() => setConformDelete(false)}
        message="Are you sure you want to proceed?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={() => deleteProd.mutate(rowBody._id)}
        reject={() => setConformDelete(false)}
      />
      <DataTable
        value={productsQuery.data}
        paginator
        rows={10}
        header={header1}
        selection={selectedProducts}
        onSelectionChange={e => setSelectedProducts(e.value)}
        responsiveLayout="scroll"
        emptyMessage="No customers found."
      >
        <Column selectionMode="multiple" exportable={false}></Column>
        <Column
          field="name"
          header="Name"
          sortable
          filter
          filterPlaceholder="Search by name"
        ></Column>
        <Column
          field="price"
          body={setPrice}
          header="Price"
          sortable
          filter
        ></Column>
        <Column field="quantity" header="Qte" sortable filter></Column>
        <Column
          field="sku"
          header="SKU"
          sortable
          filter
          filterPlaceholder="Search by sku"
        ></Column>
        <Column
          body={renderVisibility}
          field="visibility"
          header="Status"
          sortable
          filter
          filterPlaceholder="Search by sku"
        ></Column>
        <Column body={data => renderActions(data)} exportable={false}></Column>
      </DataTable>
    </div>
  );
};

export default ProductTable;