import { auth } from "./instances";
import { isAuthenticated } from "../utils/helpers";

const localItem = localStorage.getItem("jwt_data");
const jwt = JSON.parse(localItem);

export const fetchGeneralSettings = () => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "GET",
    url: `settings/general`,
  });
};

export const updateGeneralSettings = data => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "PUT",
    url: `settings/general/${data._id}`,
    data: {
      ...data,
    },
  });
};

export const addNewHeroCarousal = data => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "POST",
    url: `settings/carousals/hero/add`,
    data,
  });
};

export const fetchHeroCarousal = data => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "GET",
    url: "settings/carousals/hero/fetch",
  });
};

export const deleteHeroCarousal = id => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "DELETE",
    url: `settings/carousals/hero/delete?_id=${id}`,
  });
};

export const editHeroCarousal = data => {
  return auth({
    headers: {
      Authorization: `Bearer ${jwt.token}`,
    },
    method: "PUT",
    url: `settings/carousals/hero/edit?_id=${data._id}`,
    data: data,
  });
};
