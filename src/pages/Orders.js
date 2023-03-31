import { Toast } from "primereact";
import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { CategoryIcon, OrderIcon } from "../assets/icons";
import { PRODUCT_DATATABLE_LIMIT } from "../common/constants";
import CustomButton from "../components/buttons/CustomButton";
import Dashboard from "../components/Dashboard";
import EmptyBox from "../components/EmptyBox";
import DataTableSkeleton from "../components/loadings/DataTableSkeleton";
import OrdersTable from "../components/orders/OrdersTable";
import { changeStatus, fetchOrders, getStatus, searchOrder } from "../services/orders";

const crumbs = [
  { label: "Home", url: "/" },
  { label: "Orders", url: "/orders" },
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [field, setField] = useState(null)
  const toast = useRef(null);

  const ordersQuery = useQuery(
    ["fetchOrders", page],
    async () => {
      const response = await fetchOrders(page, PRODUCT_DATATABLE_LIMIT);
      const orders = await response.data.orders;
      const count = await response.data.count;
      setOrders(orders);
      setTotal(count);
      return orders;
    },
    { refetchOnWindowFocus: false, cacheTime: 0 }
  );

  const getStatusQuery = useQuery(
    ["fetchOrderStatus"],
    async () => {
      const response = await getStatus();
      const data = await response.data.status;
      let status = [];
      data.map(el => {
        status.push({ name: el, code: el });
      });
      return status;
    },
    { refetchOnWindowFocus: false }
  );

  const searchOrderQuery = useQuery(
    ["search-order",page],
    async () => {
      const response = await searchOrder(searchValue, field.code, page, PRODUCT_DATATABLE_LIMIT);
      const orders = await response.data.orders;
      const count = await response.data.count;
      setOrders(orders);
      setTotal(count);
      return orders;
    },
    { enabled: false }
  );


  const changeStatusQuery = useMutation(data => changeStatus(data));

  const handlePageChange = e => {
    setPage(e.page);
    ordersQuery.refetch();
  };

  return (
    <Dashboard
      items={crumbs}
      title={`Orders (${total})`}
      rightElement={
        <CustomButton
          onClick={() => ordersQuery.refetch()}
          className="p-button-secondary"
          icon="pi pi-refresh"
          disabled={ordersQuery.isLoading}
          id="refreshCustomersTable"
          aria-label="refresh customers table"
        />
      }
    >
      <Toast ref={toast} />
        <>
          {orders.length === 0 || total === 0 ? (
            <EmptyBox
              icon={<OrderIcon />}
              parentClassName="pb-8"
              title="No Orders"
              message="You don't have any order for the moment"
            />
          ) : (
            <div>
              <OrdersTable
                orders={orders}
                ordersQuery={ordersQuery}
                getStatusQuery={getStatusQuery}
                changeStatusQuery={changeStatusQuery}
                handlePageChange={handlePageChange}
                page={page}
                total={total}
                limit={PRODUCT_DATATABLE_LIMIT}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                searchOrderQuery={searchOrderQuery}
                field={field} 
                setField={setField}
              />
            </div>
          )}
        </>
    </Dashboard>
  );
};

export default Orders;
