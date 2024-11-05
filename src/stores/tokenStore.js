// stores/tokenStore.js
import { ref } from "vue";
import { defineStore } from "pinia";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: '/', maxAge: 2592000 });

export const useTokenStore = defineStore('token', () => {
  console.log("Initializing useTokenStore");

  const token = ref({
    accessToken: null,
    refreshToken: null,
    mid: null
  });

  // Set tokens and user ID (mid) in the store and cookies
  const setToken = (newTokens, mid) => {
    console.log("Setting tokens in store and cookies");
    const { accessToken, refreshToken } = newTokens;
    token.value = { mid, accessToken, refreshToken };

    cookies.set("accessToken", accessToken);
    cookies.set("refreshToken", refreshToken);
    cookies.set("mid", mid);
  };

  // Clear tokens from the store and cookies
  const clearToken = () => {
    token.value = { accessToken: null, refreshToken: null, mid: null };
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    cookies.remove("mid");
  };

  // Retrieve the saved user ID (mid) either from the store or cookies
  const savedMid = () => {
    return token.value.mid || cookies.get("mid");
  };

  return { token, setToken, clearToken, savedMid };
});
