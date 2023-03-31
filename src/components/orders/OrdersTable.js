import {
  Button,
  Column,
  DataTable,
  Dropdown,
  InputText,
  Menu,
  Paginator,
  Sidebar,
} from "primereact";
import React, { useEffect, useRef, useState } from "react";
import OrderCustomerDetails from "./OrderCustomerDetails";
import OrderProducts from "./OrderProducts";
import { Outlet } from "react-router-dom";
import {
  renderAddress,
  renderCustomer,
  renderDate,
  renderStatus,
  renderTransitionID,
} from "./TableColumns";

const fields = [
    {name: 'Transaction ID', code: 'transaction_id'},
    {name: 'Customer Name', code: 'customer_name'},
]

const OrdersTable = props => {
  const {
    orders,
    getStatusQuery,
    changeStatusQuery,
    ordersQuery,
    page,
    limit,
    total,
    handlePageChange,
    searchValue,
    setSearchValue,
    searchOrderQuery,
    setField,
    field
  } = props;

  const menu = useRef(null);

  const [rowBody, setRowBody] = useState(null);
  const [visible, setVisible] = useState(false);
  const [statusSelect, setStatusSelect] = useState(false);

  const handleStatusClick = data => {
    setStatusSelect(true);
    setRowBody(data);
  };

  useEffect(() => {
    if (changeStatusQuery.isSuccess) {
      setStatusSelect(false);
      ordersQuery.refetch();
    }
  }, [changeStatusQuery.isSuccess]);

  const changeStatus = value => {
    changeStatusQuery.mutate({ _id: rowBody._id, body: value.name });
  };

  const renderActions = data => {
    let items = [
      {
        label: "More details",
        icon: "pi pi-eye",
        command: () => setVisible(true),
      },
    ];

    return (
      <>
        <Menu model={items} popup ref={menu} id="popup_menu" />
        <Button
          icon="pi pi-ellipsis-v"
          onClick={event => {
            menu.current.toggle(event);
            setRowBody(data);
          }}
          aria-controls="popup_menu"
          aria-haspopup
          className=" p-button-rounded p-button-secondary p-button-text p-button-sm table-btn-icon"
        />
      </>
    );
  };

  const searchOrderEvent = event => {
    if (event.key === "Enter") {
      searchOrderQuery.refetch();
    }
  };

  const handleCustomer = e => {
    if (e.target.value === "") {
      ordersQuery.refetch();
    }
    setSearchValue(e.target.value);
  };

  const renderHeader = () => {
    return (
      <span className="p-input-icon-left flex align-items-center gap-2">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={searchValue}
          onKeyDown={searchOrderEvent}
          placeholder="Global Search"
          onChange={handleCustomer}
        />
        <Dropdown
          optionLabel="name"
          value={field}
          options={fields}
          onChange={(e) => setField(e.value)}
          placeholder="Select a field"
        />
      </span>
    );
  };

  return (
    <div>
      <Sidebar
        style={{ width: "500px" }}
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
      >
        <OrderProducts order={rowBody} />
        <OrderCustomerDetails order={rowBody} />
      </Sidebar>
      <DataTable
        value={orders}
        responsiveLayout="scroll"
        emptyMessage="No orders found."
        stripedRows
        loading={ordersQuery.isLoading}
        header={renderHeader}
      >
        <Column
          field="transaction_id"
          header="Transaction ID"
          body={data => renderTransitionID(data)}
        />
        <Column header="Customer" body={data => renderCustomer(data)} />
        <Column
          field="address"
          header="Delivery Place"
          body={data => renderAddress(data)}
        />
        <Column
          field="createdAt"
          header="Date"
          body={data => renderDate(data)}
        />
        <Column field="totalPrice" header="Total Price" />
        <Column
          field="status"
          header="Status"
          body={data =>
            renderStatus(
              data,
              rowBody,
              statusSelect,
              getStatusQuery,
              changeStatus,
              handleStatusClick
            )
          }
        />
        <Column
          header="Details"
          body={data => renderActions(data)}
          exportable={false}
          style={{ textAlign: "center" }}
        ></Column>
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

export default OrdersTable;
