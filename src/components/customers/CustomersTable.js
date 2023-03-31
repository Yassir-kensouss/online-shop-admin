import "../../styles/pages/customers.scss";
import {
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
import { changeCustomerState, deleteCustomer } from "../../services/customers";
import { Outlet, useNavigate } from "react-router-dom";

const CustomersTable = props => {

  const [rowBody, setRowBody] = useState(null);
  const {
    selectedCustomers,
    setSelectedCustomers,
    fetchCustomersQuery,
    customers,
    total,
    page,
    limit,
    handlePageChange,
    searchCustomersByName,
    searchValue,
    handleCustomer,
    editCustomer,
  } = props;

  const [confirmDelete, setConformDelete] = useState(false);
  const [confirmState, setConformState] = useState(false);

  const menu = useRef(null);
  const toast = useRef(null);

  const navigate = useNavigate()

  const searchCustomer = event => {
    if (event.key === "Enter") {
      searchCustomersByName.refetch();
    }
  };

  const renderHeader = () => {
    return (
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={searchValue}
          onKeyDown={searchCustomer}
          placeholder="Global Search"
          onChange={handleCustomer}
        />
      </span>
    );
  };

  const header1 = renderHeader("filters1");

  const deleteCust = useMutation(_id => deleteCustomer(_id), {
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        detail: "Customer deleted",
        life: 3000,
      });
      fetchCustomersQuery.refetch();
    },
    onError: () => {
      toast.current.show({
        severity: "error",
        detail: "Something went wrong",
        life: 3000,
      });
    },
  });

  const updateStateMutation = useMutation((data) => changeCustomerState(data), {
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        detail: "Customer updated",
        life: 3000,
      });
      fetchCustomersQuery.refetch();
    },
    onError: () => {
      toast.current.show({
        severity: "error",
        detail: "Something went wrong",
        life: 3000,
      });
    },
  });

  const renderState = rowData => {
    return (
      <>
        <Badge
          value={rowData.state}
          severity={rowData.state === 'suspended' ? "danger" : 'success'}
        ></Badge>
      </>
    );
  };

  const renderActions = rowData => {
    
    let items = [
      {
        label: "Edit",
        icon: "pi pi-fw pi-file-edit",
        command: () => {
          editCustomer(rowBody._id);
        },
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-trash",
        command: () => setConformDelete(true),
      },
      {
        label: rowData.state !== 'active' ? 'Activate Account' : 'Suspend Account',
        icon: rowData.state !== 'active' ? 'pi pi-user-minus' : 'pi pi-user-plus',
        command: () => setConformState(true),
      },
      {
        label: 'View',
        icon: 'pi pi-eye',
        command: () => navigate(`/customer/details/${rowBody._id}`),
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

  const renderPhoto = data => {
    return (
      <Image
        src={
          data?.avatar && data.avatar !== ""
            ? data.avatar
            : `https://eu.ui-avatars.com/api/?name=${data.name}&size=250`
        }
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

  return (
    <div>
      <Toast ref={toast} />
      {confirmDelete ? (
        <ConfirmDialog
          visible={confirmDelete}
          onHide={() => setConformDelete(false)}
          message={`Are you sure you want to delete ${rowBody.name}'s account?`}
          header="Confirmation"
          icon="pi pi-exclamation-triangle"
          accept={() => deleteCust.mutate(rowBody._id)}
          reject={() => setConformDelete(false)}
        />
      ) : null}
      {confirmState ? (
        <ConfirmDialog
          visible={confirmState}
          onHide={() => setConformState(false)}
          message={`Are you sure you want to ${rowBody.state === 'active' ? 'Suspend' : 'Activate'} ${rowBody.name}'s account?`}
          header="Confirmation"
          icon="pi pi-exclamation-triangle"
          accept={() => {
            const state = rowBody.state === 'active' ? 'suspended' : 'active' 
            updateStateMutation.mutate({id: rowBody._id,state})
          }}
          reject={() => setConformState(false)}
        />
      ) : null}
      <DataTable
        value={customers}
        responsiveLayout="scroll"
        rows={limit}
        header={header1}
        selection={selectedCustomers}
        onSelectionChange={e => setSelectedCustomers(e.value)}
        emptyMessage="No customers found."
        stripedRows
      >
        <Column selectionMode="multiple" exportable={false}></Column>
        <Column
          field="photos"
          header="Photos"
          body={data => renderPhoto(data)}
        ></Column>
        <Column
          field="name"
          header="Name"
          sortable
          filter
          filterPlaceholder="Search by name"
        ></Column>
        <Column field="email" header="Email" sortable filter></Column>
        <Column field="role" header="Role" sortable filter></Column>
        <Column
          body={renderState}
          field="state"
          header="State"
          sortable
          filter
          filterPlaceholder="Search by sku"
        ></Column>
        <Column body={data => renderActions(data)} exportable={false}></Column>
      </DataTable>
      <Paginator
        first={page * limit}
        rows={limit}
        totalRecords={total}
        onPageChange={handlePageChange}
      />
      <Outlet />
    </div>
  );
};

export default CustomersTable;
