import classNames from "classnames";
import React from "react";
import { NewOrder, OrderCanceled, OrderDelivered, OrderInProcess } from "../../assets/icons";

const OrdersStatisticsCard = ({statistics, isLoading}) => {

  const {cancelled, delivered, newOrders,processing} = statistics;

  return (
    <div className="flex align-items-center gap-3 mb-3">
      <OrderStateCard
        title="New Orders"
        value={newOrders}
        details="impression - 20%"
        intent="new"
      />
      <OrderStateCard
        title="In Processing"
        value={processing}
        details="impression - 19%"
        intent="processing"
      />
      <OrderStateCard
        title="Delivered"
        value={delivered}
        details="impression - 15%"
        intent="delivered"
      />
      <OrderStateCard
        title="Canceled"
        value={cancelled}
        details="impression - 5%"
        intent="canceled"
      />
    </div>
  );
};

export default OrdersStatisticsCard;

const renderIcons = (intent) => {
  switch(intent) {
    case 'new':
      return <NewOrder/>;
    case 'delivered':
      return <OrderDelivered/>;
    case 'canceled': 
      return <OrderCanceled/>;
    case 'processing':
      return <OrderInProcess/>;
    default:
      return;
  }
}

const OrderStateCard = ({ title, value, details, intent }) => {
  return (
    <article
      className={`orders-stats-card p-3 border-round-md flex-1 ${classNames({
        "bg-yellow-200": (intent === "new"),
        "bg-primary-100": (intent === "processing"),
        "bg-blue-100": (intent === "delivered"),
        "bg-red-100": (intent === "canceled"),
      })}`}
    >
      <header
        className="text-l font-semibold text-900 mb-3 text-800 flex align-items-center gap-2"
      >
        {title}
        {renderIcons(intent)}
      </header>
      <div className="flex align-items-center gap-3">
        <span className={`text-2xl font-semibold ${classNames({
          "text-yellow-900": (intent === "new"),
          "text-primary-900": (intent === "processing"),
          "text-blue-900": (intent === "delivered"),
          "text-red-900": (intent === "canceled"),
        })}`}>{value}</span>
        <span>|</span>
        <span className="capitalize">{details}</span>
      </div>
    </article>
  );
};
