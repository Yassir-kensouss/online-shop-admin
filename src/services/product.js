import { auth } from "./instances";

export const addNewProduct = data => {

  const {files} = data;
  
  const formData = new FormData();

  formData.append('files',JSON.stringify(files))
  
  console.log('files 00', formData)

  return auth({
    method: "POST",
    url: `file-storage/upload`,
    data: files,
  });

//   return auth({
//     method: "POST",
//     url: `product/create/${user._id}`,
//     data: body,
//   });
};
