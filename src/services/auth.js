import { auth } from "./instances";

export const signIn = (data) => {
  return auth({
    url: "signin/",
    method: "POST",
    data,
  });
};

export const signUp = (data) => {
  return auth({
    url: "signup",
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

export const passwordReset = async (data) => {
  return auth({
    url: "password-reset/",
    method: "POST",
    data,
  });
};

export const updatePassword = async (url) => {
  const data = url.data;
  return auth({
    url: `password-reset/${url.userId}/${url.token}`,
    method: "POST",
    data,
  });
};
