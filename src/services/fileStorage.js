import { auth } from "./instances"


const localItem = localStorage.getItem("jwt_data");
const jwt = JSON.parse(localItem);

export const uploadFiles = (files) => {
    return auth({
        headers:{
            Authorization: `Bearer ${jwt.token}`,
        },
        method: 'POST',
        url: '/file-storage/upload',
        data: files
    })
}