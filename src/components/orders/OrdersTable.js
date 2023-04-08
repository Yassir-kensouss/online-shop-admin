import {
  Button,
  Column,
  DataTable,
  Dropdown,
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
import {
  NUMERIC_FILTERS_MODE,
  STRING_FILTERS_MODE,
} from "../../common/constants";
import { handleTableFiltering, totalPriceFilterTemplate } from "./TableFilters";
import TableHeader from "./TableHeader";

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
    setOrders,
    setTotal,
    ordersByFiltersQuery
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
      totalPrice: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      status: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
    });
    ordersQuery.refetch();
  };

  useEffect(() => {
    if (ordersByFiltersQuery.isSuccess) {
      setOrders(ordersByFiltersQuery.data.data.orders);
      setTotal(ordersByFiltersQuery.data.data.count);
    }
  }, [ordersByFiltersQuery.isSuccess]);

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
        onFilter={(e) => handleTableFiltering(e, setFilters, ordersByFiltersQuery, page, limit)}
        resizableColumns
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
        header={
          <TableHeader
            searchValue={searchValue}
            searchOrderEvent={searchOrderEvent}
            handleCustomer={handleCustomer}
            field={field}
            fields={fields}
            setField={setField}
            initFilters={initFilters}
          />
        }
      >
        <Column
          field="transaction_id"
          header="Transaction ID"
          body={data => renderTransitionID(data)}
        />
        <Column
          header="Customer"
          body={data => renderCustomer(data)}
          sortable
          sortField="user.name"
        />
        <Column
          field="address"
          header="Delivery Place"
          body={data => renderAddress(data)}
          resizeable={true}
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
          showFilterOperator={false}
          filterMatchModeOptions={NUMERIC_FILTERS_MODE}
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
          filterMatchMode="equals"
          filterMatchModeOptions={STRING_FILTERS_MODE}
          showFilterOperator={false}
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
