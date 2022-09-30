import { auth } from "./instances";

export const signIn = (data) => {
  return auth({
    url: "signin/",
    method: "POST",
    data,
  });
};
