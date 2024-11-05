import axios from "axios";
import Cookies from "universal-cookie";
import { requestRefreshToken, saveToken } from "./tokenAPI.js";

const jwtAxios = axios.create();

const cookies = new Cookies(null, { path: '/', maxAge: 2592000 });

const beforeRequest = (config) => {
  console.log('beforeRequest');

  // Check if access token is in the cookie
  const accessToken = cookies.get("accessToken");

  if (!accessToken) {
    throw new Error("No Token");
  }
  config.headers["Authorization"] = "Bearer " + accessToken;

  return config;
};

const beforeResponse = (response) => {
  console.log('beforeResponse');
  return response;
};

const errorResponse = async (error) => {
  console.log('errorResponse');
  console.dir(error);

  if (error.response && error.response.status) {
    const status = error.response.status;
    const res = error.response.data;
    const errorMsg = res.error;

    console.log(status, res, errorMsg);

    if (errorMsg && errorMsg.includes("expired")) {
      try {
        console.log("Refreshing Token");
        const data = await requestRefreshToken();
        saveToken("accessToken", data.accessToken);
        saveToken("refreshToken", data.refreshToken);

        error.config.headers["Authorization"] = "Bearer " + data.accessToken;

        return jwtAxios(error.config); // Retry the original request with new token
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    } else {
      return Promise.reject(error);
    }
  } else {
    return Promise.reject(error);
  }
};

// Set up request and response interceptors
jwtAxios.interceptors.request.use(beforeRequest);
jwtAxios.interceptors.response.use(beforeResponse, errorResponse);

export default jwtAxios;
