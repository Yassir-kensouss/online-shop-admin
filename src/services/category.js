import { isAuthenticated } from "../utils/helpers";
import { admin } from "./instances";

const { user } = isAuthenticated();

export const persistCategory = (data) => {
  console.log("bb", data);
  return admin({
    method: "POST",
    url: `category/create/${user._id}`,
    data,
  });
};
