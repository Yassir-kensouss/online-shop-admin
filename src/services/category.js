import { isAuthenticated } from "../utils/helpers";
import { admin, auth } from "./instances";

const { user } = isAuthenticated();

export const persistCategory = (data) => {
  return admin({
    method: "POST",
    url: `category/create/${user._id}`,
    data,
  });
};

export const persistManyCategories = (categories) => {
  return admin({
    method: 'POST',
    url: `category/multiple/create`,
    data: categories
  })
}

export const fetchAllCategories = async (page) => {
  return auth({
    method: "GET",
    url: `category?page=${page}`,
  });
};

export const deleteManyCategories = async (data) => {
  const localItem  = localStorage.getItem('jwt_data');
  const jwt = JSON.parse(localItem)
  return auth({
    headers:{
      Authorization: `Bearer ${jwt.token}`
    },
    method: 'POST',
    url: "category/delete/multiple",
    data:data
  })
}

export const updateCategory = async (data) => {
  const {_id} = data;
  const localItem  = localStorage.getItem('jwt_data');
  const jwt = JSON.parse(localItem)
  const body = {
    name: data.name
  }
  return auth({
    headers:{
      Authorization: `Bearer ${jwt.token}`
    },
    method: 'PUT',
    url: `category/${_id}`,
    data:body
  })

}
