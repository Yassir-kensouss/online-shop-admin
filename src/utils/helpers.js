export const isAuthenticated = () => {
  const jwt = localStorage.getItem("jwt_data");

  if (jwt) {
    return JSON.parse(jwt);
  } else {
    return false;
  }
};
