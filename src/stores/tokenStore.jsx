import { ref} from "vue";
import {defineStore} from "pinia";


import Cookies from "universal-cookie";

const cookies = new Cookies( null,  {path: '/', maxAge: 2592000})


export const useTokenStore = defineStore('token', () => {

    console.log("useTokenStore")


    const token = ref({
        accessToken: null,
        refreshToken: null,
        mid: null
    });


    const setToken = (newTokens, mid) => {

        console.log("setToken")
        const {accessToken, refreshToken} = newTokens
        token.value ={mid, accessToken,refreshToken}


        console.dir(cookies)


        cookies.set("accessToken", accessToken)
        cookies.set("refreshToken", refreshToken)
        cookies.set("mid", mid)

    }

    const clearToken = () => {
        token.value = {accessToken: "", refreshToken: "", mid: ""}
        cookies.remove("accessToken")
        cookies.remove("refreshToken")
        cookies.remove("mid")
    }

    const savedMid = () => {
        if (token.mid) {
            return token.mid
        }
        return cookies.get("mid")
    }


    return {token, setToken, clearToken, savedMid}
});