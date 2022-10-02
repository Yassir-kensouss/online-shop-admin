import { auth } from "./instances";

export const signIn = (data) => {
  return auth({
    url: "signin/",
    method: "POST",
    data,
  });
};

export const signOut = async () => {
  return auth({
    url: "signout/",
    method: "GET",
  });
};
