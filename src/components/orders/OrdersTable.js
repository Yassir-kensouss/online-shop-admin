import {
  Button,
  Calendar,
  Column,
  DataTable,
  Dropdown,
  InputNumber,
  InputText,
  Menu,
  Paginator,
  Sidebar,
} from "primereact";
import { FilterMatchMode, FilterOperator } from "primereact/api";
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
import { OrderIcon } from "../../assets/icons";
import EmptyBox from "../EmptyBox";
import moment from "moment";

const fields = [
  { name: "Transaction ID", code: "transaction_id" },
  { name: "Customer Name", code: "customer_name" },
];

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
    field,
  } = props;

  const menu = useRef(null);

  const [rowBody, setRowBody] = useState(null);
  const [visible, setVisible] = useState(false);
  const [statusSelect, setStatusSelect] = useState(false);
  const [filters, setFilters] = useState(null);

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

  const initFilters = () => {
    setFilters({
      balance: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
    });
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
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
            onChange={e => setField(e.value)}
            placeholder="Select a field"
            title="search by"
          />
        </span>
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          className="p-button-outlined"
          onClick={initFilters}
        />
      </div>
    );
  };

  const totalPriceFilterTemplate = options => {
    return (
      <InputNumber
        value={options.value}
        onChange={e => options.filterCallback(e.value, options.index)}
        mode="currency"
        currency="USD"
        locale="en-US"
      />
    );
  };

  const statusFilterTemplate = options => {
    return (
      <Dropdown
        value={{ name: options.value, code: options.value }}
        options={getStatusQuery?.data}
        onChange={e => options.filterCallback(e.value.name, options.index)}
        optionLabel="name"
        placeholder="status"
      />
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
        emptyMessage={
          <EmptyBox
            icon={<OrderIcon />}
            parentClassName="pb-5 pt-5"
            title="No Orders"
            message="You don't have any order for the moment"
          />
        }
        filters={filters}
        stripedRows
        loading={ordersQuery.isLoading}
        header={renderHeader}
      >
        <Column
          field="transaction_id"
          header="Transaction ID"
          body={data => renderTransitionID(data)}
        />
        <Column header="Customer" body={data => renderCustomer(data)} sortable sortField="user.name"/>
        <Column
          field="address"
          header="Delivery Place"
          body={data => renderAddress(data)}
        />
        <Column
          field="createdAt"
          header="Date"
          body={data => renderDate(data)}
          sortable
        />
        <Column
          field="totalPrice"
          header="Total Price"
          filter
          filterElement={totalPriceFilterTemplate}
          filterField="totalPrice"
          dataType="numeric"
        />
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
          filter
          filterElement={statusFilterTemplate}
          filterField="status"
        //   dataType="string"
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
