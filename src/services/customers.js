import { isAuthenticated } from "../utils/helpers";
import { auth } from "./instances";
const { user } = isAuthenticated();

const localItem = localStorage.getItem("jwt_data");
const jwt = JSON.parse(localItem);

export const deleteCustomer = id => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "DELETE",
    url: `customers/delete?userId=${id}`,
  });
};

export const deleteManyCustomers = ids => {
  return auth({
    method: "POST",
    url: `/customers/deleteMany`,
    data: ids,
  });
};

export const fetchAllCustomers = (page, limit) => {
  return auth({
    method: "GET",
    url: `customers/all?page=${page}&limit=${limit}`,
  });
};

export const customersList = (value, page, limit) => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "GET",
    url: `/customers/customersList?search=${value}&page=${page}&limit=${limit}`,
  });
};

export const changeCustomerState = (data) => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "PUT",
    url: `/customers/update/state?userId=${data.id}`,
    data: {
      state: data.state
    }
  });
};

export const getCustomer = (id) => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "GET",
    url: `/profile/${id}`,
  });
}

export const updateCustomerDetails = (body) => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "PUT",
    url: `/customers/update/details`,
    data: body
  });
}