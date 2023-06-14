import "../../styles/pages/products.scss";
import {
  Avatar,
  Badge,
  Button,
  Column,
  ConfirmDialog,
  DataTable,
  Image,
  InputText,
  Menu,
  Paginator,
  Toast,
} from "primereact";
import React, { useRef, useState } from "react";
import { useMutation } from "react-query";
import { deleteProduct, duplicateProduct } from "../../services/product";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductTable = props => {
  const navigate = useNavigate();

  const {
    selectedProducts,
    setSelectedProducts,
    productsQuery,
    products,
    total,
    page,
    limit,
    handlePageChange,
    searchProductsByName,
    searchValue,
    handleCustomer,
  } = props;

  const [confirmDelete, setConformDelete] = useState(false);

  const settings = useSelector(state => state.settings.personalize);
  const currency = settings.currency?.split("-")[1];
  const mode = useSelector(state => state.settings.appearance.mode);

  const menu = useRef(null);
  const toast = useRef(null);

  const searchProduct = event => {
    if (event.key === "Enter") {
      searchProductsByName.refetch();
    }
  };

  const renderHeader = () => {
    return (
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={searchValue}
          onKeyDown={searchProduct}
          placeholder="Global Search"
          onChange={handleCustomer}
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
    return <span>{`${currency} ${rowData.price}`}</span>;
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
          className="cdt-action p-button-rounded p-button-secondary p-button-text p-button-sm table-btn-icon"
        />
      </>
    );
  };

  const renderPhoto = data => {
    return (
      <Image
        src={data?.photos[0].url}
        style={{
          verticalAlign: "middle",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
        }}
        className="datatable-product-image"
        preview
      />
    );
  };

  const setName = data => {
    return (
      <div title={data.name} className="product-name">
        {data.name}
      </div>
    );
  };

  const setColor = data => {
    return (
      <div
        className="vertical-align-middle w-2rem h-2rem border-round-lg"
        style={{ backgroundColor: `#${data.color}` }}
      ></div>
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
        value={products}
        responsiveLayout="scroll"
        rows={limit}
        header={header1}
        onPage={handlePageChange}
        selection={selectedProducts}
        onSelectionChange={e => setSelectedProducts(e.value)}
        emptyMessage="No products found."
        stripedRows={mode === "Light" ? true : false}
        first={page * limit}
        totalRecords={total}
        className="custom-data-table"
      >
        <Column selectionMode="multiple" exportable={false}></Column>
        <Column
          field="photos"
          header="Photos"
          body={data => renderPhoto(data)}
        ></Column>
        <Column
          field="name"
          body={setName}
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
        <Column field="size.name" header="Size"></Column>
        <Column field="category.name" header="Category"></Column>
        <Column field="brand.name" header="Brand"></Column>
        <Column
          className="vertical-align-middle"
          body={setColor}
          header="Color"
        ></Column>
        <Column field="quantity" header="Qte" sortable></Column>
        <Column
          field="sku"
          header="SKU"
          filter
          filterPlaceholder="Search by sku"
        ></Column>
        <Column
          body={renderVisibility}
          field="visibility"
          header="Status"
          filter
          filterPlaceholder="Search by visibility"
        ></Column>
        <Column body={data => renderActions(data)} exportable={false}></Column>
      </DataTable>
      <Paginator
        first={page * limit}
        rows={limit}
        totalRecords={total}
        onPageChange={handlePageChange}
        className="custom-datatable-pagination"
      />
    </div>
  );
};

export default ProductTable;
