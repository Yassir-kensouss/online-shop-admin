import { admin, auth } from "./instances";
import { isAuthenticated } from "../utils/helpers";

const { user } = isAuthenticated();

export const createOrder = (userId, orderData) => {
  return admin({
    method: "POST",
    url: `orders/create/${userId}`,
    data: orderData,
  });
};

export const fetchOrders = (page, limit) => {
  return admin({
    method: "GET",
    url: `orders/${user._id}?page=${page}&limit=${limit}`,
  });
}

export const getStatus = () => {
  return admin({
    method: "GET",
    url: `orders/status/${user._id}`,
  });
}

export const changeStatus = (data) => {
  return admin({
    method: "PATCH",
    url: `orders/${data._id}/status/${user._id}`,
    data: {
      status:  data.body
    }
  });
}

export const searchOrder = (search, field, page, limit) => {
  return admin({
    method: "GET",
    url: `orders/search/${user._id}?search=${search}&field=${field}&page=${page}&limit=${limit}`,
  });
};


export const ordersByFilters = (data) => {
  return admin({
    method: "POST",
    url: `orders/filters/${user._id}?page=${data.page}&limit=${data.limit}`,
    data: data.body
  });
};