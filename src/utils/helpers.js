export const isAuthenticated = () => {
  const jwt = localStorage.getItem("jwt_data");

  if (jwt) {
    return JSON.parse(jwt);
  } else {
    return false;
  }
};

export const isCsvCategoryValid = (arr) => {

  let isValid = true;

  arr.map(res => {
    if(Object.keys(res).length > 1 || Object.keys(res).length == 0 ){
      isValid = false;
      return 
    }

    if(Object.keys(res)[0] !== 'name'){
      isValid = false;
      return
    }

  })

  return isValid;

}