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
