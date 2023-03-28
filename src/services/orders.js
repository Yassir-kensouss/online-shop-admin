import { admin } from "./instances";


export const createOrder = (userId, orderData) => {
  return admin({
    method: "POST",
    url: `orders/create/${userId}`,
    data: orderData,
  });
};
