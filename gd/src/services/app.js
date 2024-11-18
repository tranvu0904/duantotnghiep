import axiosConfig from "../axiosConfig";
import axiosDefault from "axios";

export const apiGetPrices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/price/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAreas = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/area/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/province/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPublicProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: "https://vietnamese-administration.vercel.app/city",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetPublicDistricts = (provinceId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: `https://vietnamese-administration.vercel.app/district/?cityId=${provinceId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPublicWards = (districtId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: `https://vietnamese-administration.vercel.app/ward/?districtId=${districtId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// Api Maps
export const apiGetLongtitudeAndLatitudeFromAddress = (address) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        // url: `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${process.env.REACT_APP_GEOAPIFY}`,
        url: `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${process.env.REACT_APP_OPENCAGEDATA}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
