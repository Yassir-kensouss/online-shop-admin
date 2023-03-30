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

export const fetchOrders = () => {
  return admin({
    method: "GET",
    url: `orders/${user._id}`,
  });
}

export const getStatus = () => {
  return admin({
    method: "GET",
    url: `orders/status/${user._id}`,
  });
}

export const changeStatus = (data) => {
  console.log('waadata', data)
  return admin({
    method: "PATCH",
    url: `orders/${data._id}/status/${user._id}`,
    data: {
      status:  data.body
    }
  });
}