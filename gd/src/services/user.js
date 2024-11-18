import axiosConfig from "../axiosConfig";

export const apiGetCurrent = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/user/get-current",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
// Update
export const apiUpdateUser = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/user/update",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
