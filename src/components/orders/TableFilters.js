import { Dropdown, InputNumber } from "primereact";
import React from "react";

export const totalPriceFilterTemplate = options => {
  return (
    <InputNumber
      value={options.value}
      onChange={e => options.filterCallback(e.value, options.index)}
      mode="currency"
      currency="USD"
      locale="en-US"
      placeholder="total price"
    />
  );
};

const queries = ["gte", "lte", "gt", "lt", "equals", "notEquals"];

export const handleTableFiltering = (event, setFilters, ordersByFiltersQuery, page, limit) => {
  setFilters(event.filters);
  const filtersObj = {};
  event.filters.totalPrice.constraints.map(el => {
    if (queries.includes(el.matchMode) && el.value != null) {
      if (el.matchMode === "equals") {
        filtersObj.totalPrice = {
          ...filtersObj?.totalPrice,
          $eq: el.value,
        };
      } else if (el.matchMode === "notEquals") {
        filtersObj.totalPrice = {
          ...filtersObj?.totalPrice,
          $ne: el.value,
        };
      } else {
        filtersObj.totalPrice = {
          ...filtersObj?.totalPrice,
          [`$${el.matchMode}`]: el.value,
        };
      }
    }
  });

  event.filters.status.constraints.map(el => {
    if (queries.includes(el.matchMode) && el.value != null) {
      if (el.matchMode === "equals") {
        filtersObj.status = {
          ...filtersObj?.status,
          $eq: el.value,
        };
      } else if (el.matchMode === "notEquals") {
        filtersObj.status = {
          ...filtersObj?.status,
          $ne: el.value,
        };
      } else {
        filtersObj.status = {
          ...filtersObj?.status,
          [`$${el.matchMode}`]: el.value,
        };
      }
    }
  });

  ordersByFiltersQuery.mutate({
    page,
    limit,
    body: filtersObj,
  });
};
