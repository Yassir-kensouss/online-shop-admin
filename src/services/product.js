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
