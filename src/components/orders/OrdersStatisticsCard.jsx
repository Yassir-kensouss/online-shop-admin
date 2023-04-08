import classNames from "classnames";
import React from "react";
import { useMutation } from "react-query";
import {
  NewOrder,
  OrderCanceled,
  OrderDelivered,
  OrderInProcess,
} from "../../assets/icons";
import { ORDERS_STATUS } from "../../common/constants";
import { ordersByFilters } from "../../services/orders";

const OrdersStatisticsCard = ({ statistics, isLoading,ordersByFiltersQuery, page, limit }) => {
  const { cancelled, delivered, newOrders, processing } = statistics;

  return (
    <div className="flex align-items-center gap-3 mb-3">
      <OrderStateCard
        title="New Orders"
        value={newOrders}
        details="impression - 20%"
        intent={ORDERS_STATUS.NOT_PROCESSED}
        onClick={() => {
          ordersByFiltersQuery.mutate({
            page,
            limit,
            body: { status: { $eq: ORDERS_STATUS.NOT_PROCESSED } },
          });
        }}
      />
      <OrderStateCard
        title={ORDERS_STATUS.PROCESSING}
        value={processing}
        details="impression - 19%"
        intent={ORDERS_STATUS.PROCESSING}
        onClick={() => {
          ordersByFiltersQuery.mutate({
            page,
            limit,
            body: { status: { $eq: ORDERS_STATUS.PROCESSING } },
          });
        }}
      />
      <OrderStateCard
        title={ORDERS_STATUS.DELIVERED}
        value={delivered}
        details="impression - 15%"
        intent={ORDERS_STATUS.DELIVERED}
        onClick={() => {
          ordersByFiltersQuery.mutate({
            page,
            limit,
            body: { status: { $eq: ORDERS_STATUS.DELIVERED } },
          });
        }}
      />
      <OrderStateCard
        title={ORDERS_STATUS.CANCELLED}
        value={cancelled}
        details="impression - 5%"
        intent={ORDERS_STATUS.CANCELLED}
        onClick={() => {
          ordersByFiltersQuery.mutate({
            page,
            limit,
            body: { status: { $eq: ORDERS_STATUS.CANCELLED } },
          });
        }}
      />
    </div>
  );
};

export default OrdersStatisticsCard;

const renderIcons = intent => {
  switch (intent) {
    case ORDERS_STATUS.NOT_PROCESSED:
      return <NewOrder />;
    case ORDERS_STATUS.DELIVERED:
      return <OrderDelivered />;
    case ORDERS_STATUS.CANCELLED:
      return <OrderCanceled />;
    case ORDERS_STATUS.PROCESSING:
      return <OrderInProcess />;
    default:
      return;
  }
};

const OrderStateCard = (props) => {
  const { title, value, details, intent } = props;
  return (
    <article
      {...props}
      className={`orders-stats-card p-3 border-round-md flex-1 ${classNames({
        "bg-yellow-200": intent === ORDERS_STATUS.NOT_PROCESSED,
        "bg-primary-100": intent === ORDERS_STATUS.PROCESSING,
        "bg-blue-100": intent === ORDERS_STATUS.DELIVERED,
        "bg-red-100": intent === ORDERS_STATUS.CANCELLED,
      })}`}
    >
      <header className="text-l font-semibold text-900 mb-3 text-800 flex align-items-center gap-2">
        {title}
        {renderIcons(intent)}
      </header>
      <div className="flex align-items-center gap-3">
        <span
          className={`text-2xl font-semibold ${classNames({
            "text-yellow-900": intent === ORDERS_STATUS.NOT_PROCESSED,
            "text-primary-900": intent === ORDERS_STATUS.PROCESSING,
            "text-blue-900": intent === ORDERS_STATUS.DELIVERED,
            "text-red-900": intent === ORDERS_STATUS.CANCELLED,
          })}`}
        >
          {value}
        </span>
        <span>|</span>
        <span className="capitalize">{details}</span>
      </div>
    </article>
  );
};
