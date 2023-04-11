import { isAuthenticated } from "../utils/helpers";
import { auth } from "./instances";
const { user } = isAuthenticated();

const localItem = localStorage.getItem("jwt_data");
const jwt = JSON.parse(localItem);

export const addNewProduct = data => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "POST",
    url: `product/create/${user._id}`,
    data: data,
  });
};

export const fetchAllProducts = (page, limit) => {
  return auth({
    method: "GET",
    url: `product?page=${page}&limit=${limit}`,
  });
};

export const duplicateProduct = data => {
  delete data._id;

  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "POST",
    url: `product/duplicate/${user._id}`,
    data: data,
  });
};

export const deleteProduct = id => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "DELETE",
    url: `product/${id}/${user._id}`,
  });
};

export const deleteManyProducts = ids => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "POST",
    url: `/product/deleteMany/${user._id}`,
    data: ids,
  });
};

export const fetchSingleProduct = id => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "GET",
    url: `/product/${id}`,
  });
};

export const updateProduct = body => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "PUT",
    url: `/product/${body._id}`,
    data: body,
  });
};

export const productsList = (value, page, limit) => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "GET",
    url: `/product/productsList?search=${value}&page=${page}&limit=${limit}`,
  });
};

export const bestSellingProducts = (page, limit, price) => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "GET",
    url: `/product/best-selling-products?page=${page}&limit=${limit}&price=${
      price[0] + "-" + price[1]
    }`,
  });
};

export const mostUsedCategories = () => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "GET",
    url: `/product/most-used-categories`,
  });
};
