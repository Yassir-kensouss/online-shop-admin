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

export const fetchAllCategories = async () => {
  return auth({
    method: "GET",
    url: "category/",
  });
};

export const deleteManyCategories = async (data) => {
  return auth({
    method: 'POST',
    url: "category/delete/multiple",
    data:data
  })
}
