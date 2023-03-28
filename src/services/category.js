import { isAuthenticated } from "../utils/helpers";
import { admin, auth } from "./instances";

const { user } = isAuthenticated();

const localItem  = localStorage.getItem('jwt_data');
const jwt = JSON.parse(localItem)

export const persistCategory = (data) => {
  const body = {
    name: data.name,
    user: user._id
  }
  return admin({
    method: "POST",
    url: `category/create/${user._id}`,
    data:body,
  });
};

export const persistManyCategories = (categories) => {
  categories.map(category  => {
    return category.user = user._id;
  })
  return admin({
    method: 'POST',
    url: `category/multiple/create`,
    data: categories
  })
}

export const fetchAllCategories = async (page = 0) => {
  return auth({
    method: "GET",
    url: `category/fetchAll?page=${page - 1}`,
  });
};

export const allCategories = async () => {
  return auth({
    method: "GET",
    url: `category/categories/all`,
  });
}

export const deleteManyCategories = async (data) => {
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


export const searchCategories = async (data) => {
  return auth({
    method: 'GET',
    url: `category/categories/search?searchValue=${data}`,
  })

}