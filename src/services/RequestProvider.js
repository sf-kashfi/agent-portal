import axios from "axios";
import { BASE_URL } from "./APIs.js";
// ----------------------------------------------------------------------
export const axiosApiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// ----------------------------------------------------------------------
axiosApiInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// ----------------------------------------------------------------------
axiosApiInstance.interceptors.response.use(null, async (error) => {
  if (!error.response) {
    error = { ...error, message: "خطای بدون کد" };
  } else {
    switch (error.response.status) {
      case 400:
        error = { ...error, message: "سرویس در دسترس نیست" };
        break;
      case 401:
        error = { ...error, message: "عدم دسترسی. لطفاً وارد شوید." };
        break;
      case 404:
        error = { ...error, message: "سرویس یافت نشد" };
        break;
      case 500:
        error = { ...error, message: "خطای داخلی سرور" };
        break;
      default:
        error = { ...error, message: "خطای تعریف  نشده" };
    }
  }
  throw error;
});
// ----------------------------------------------------------------------
/**
 * this function is for GET method
 * @param url
 * @param params
 * @param showNotif
 */

export const get = async (url, params = null, showNotif = false) => {
  try {
    const { data } = await axiosApiInstance.get(url, { params });
    return onFulfilledAction(showNotif, data);
  } catch (error) {
    console.log("error", error.message);
    throw error;
  }
};
// ----------------------------------------------------------------------
/**
 * this function is for POST method
 * @param url
 * @param body
 * @param params
 * @param showNotif
 */

export const post = async (url, body, params = null, showNotif = false) => {
  try {
    const { data } = await axiosApiInstance.post(url, body, { params });
    return onFulfilledAction(showNotif, data);
  } catch (error) {
    console.log("error", error.message);
    throw error;
  }
};
// ----------------------------------------------------------------------

const onFulfilledAction = (showNotif, data) => {
  if (showNotif && data) {
    console.log("success", data || "با موفقیت انجام شد");
  }
  if (!data) {
    console.log("error", error.message);
    return null;
  }
  return data;
};
