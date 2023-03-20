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

export const formatSizeUnits = (bytes) => {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2) + " GB";
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2) + " MB";
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes > 1) {
    bytes = bytes + " bytes";
  } else if (bytes == 1) {
    bytes = bytes + " byte";
  } else {
    bytes = "0 bytes";
  }
  return bytes;
}


// Reorder list

export const sortByDate = (a, b) => {
  return new Date(b.createdAt) - new Date(a.createdAt);
};


// Get country name

export const countryName = new Intl.DisplayNames(
  ['en'], {type: 'region'}
)