import { Toast } from "primereact";
import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { CategoryIcon, OrderIcon } from "../assets/icons";
import CustomButton from "../components/buttons/CustomButton";
import Dashboard from "../components/Dashboard";
import EmptyBox from "../components/EmptyBox";
import DataTableSkeleton from "../components/loadings/DataTableSkeleton";
import OrdersTable from "../components/orders/OrdersTable";
import { changeStatus, fetchOrders, getStatus } from "../services/orders";

const crumbs = [
  { label: "Home", url: "/" },
  { label: "Orders", url: "/orders" },
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [count, setCount] = useState(0);
  const toast = useRef(null);

  const ordersQuery = useQuery(
    ["fetchOrders"],
    async () => {
      const response = await fetchOrders();
      const orders = await response.data.orders;
      const count = await response.data.count;
      setOrders(orders);
      setCount(count);
      return orders
    },
    { refetchOnWindowFocus: false }
  );

  const getStatusQuery = useQuery(
    ["fetchOrderStatus"],
    async () => {
      const response = await getStatus();
      const data = await response.data.status;
      let status = [];
      data.map(el => {
        status.push({name: el, code: el})
      })
      return status
    },
    { refetchOnWindowFocus: false }
  );

  const changeStatusQuery = useMutation((data) => changeStatus(data))


  return (
    <Dashboard
      items={crumbs}
      title={`Orders (${count})`}
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
      {ordersQuery.isLoading ? (
        <DataTableSkeleton />
      ) : (
        <>
          {orders.length === 0 || count === 0 ? (
            <EmptyBox
              icon={<OrderIcon />}
              parentClassName="pb-8"
              title="No Orders"
              message="You don't have any order for the moment"
            />
          ) : (
            <div>
              <OrdersTable orders={orders} ordersQuery={ordersQuery} getStatusQuery={getStatusQuery} changeStatusQuery={changeStatusQuery}/>
            </div>
          )}
        </>
      )}
    </Dashboard>
  );
};

export default Orders;
