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

export const fetchAllProducts = () => {
  return auth({
    method: "GET",
    url: 'product/',
  });
};

export const duplicateProduct = data => {

  delete data._id

  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "POST",
    url: `product/duplicate/${user._id}`,
    data: data,
  });
};

export const deleteProduct = (id) => {
  return auth({
    headers:{
      Authorization: `Bearer ${jwt.token}`
    },
    method: "DELETE",
    url: `product/${id}/${user._id}`
  })
}

export const deleteManyProducts = (ids) => {
  
  return auth({
    headers:{
      Authorization: `Bearer ${jwt.token}`
    },
    method: "POST",
    url: `/product/deleteMany/${user._id}`,
    data: ids
  })
}

export const fetchSingleProduct = (id) => {
  
  return auth({
    headers:{
      Authorization: `Bearer ${jwt.token}`
    },
    method: "GET",
    url: `/product/${id}`,
  })
}