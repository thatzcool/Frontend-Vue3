// authService.js
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: '/', maxAge: 2592000 });

export const makeTokens = async (mid, mpw) => {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/token/make', { mid, mpw });
    return response.data;
  } catch (error) {
    console.error("Error making tokens:", error);
    throw error;
  }
};

export async function requestRefreshToken() {
  try {
    // Retrieve tokens and mid from cookies
    const refreshToken = cookies.get("refreshToken");
    const mid = cookies.get("mid");
    const accessToken = cookies.get("accessToken");

    if (!mid || !refreshToken || !accessToken) {
      throw new Error("Cannot request refresh; required information is missing.");
    }

    const path = "http://localhost:8080/api/v1/token/refresh";
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + accessToken
    };

    const data = { refreshToken, mid };

    const res = await axios.post(path, data, { headers });
    return res.data;
  } catch (error) {
    console.error("Error requesting refresh token:", error);
    throw error;
  }
}

export const saveToken = (tokenName, tokenValue) => {
  try {
    cookies.set(tokenName, tokenValue);
  } catch (error) {
    console.error("Error saving token:", error);
    throw error;
  }
};
