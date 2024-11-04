import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies( null,  {path: '/', maxAge: 2592000})

export const makeTokes = async (mid, mpw) => {

    const response = await axios.post('http://localhost:8080/api/v1/token/make', {mid,mpw})

    return response.data

}

export async function requestRefreshToken(){

    //refresh token
    const refreshToken = cookies.get("refreshToken")
    const mid = cookies.get("mid")
    const accessToken = cookies.get("accessToken")

    if(!mid || !refreshToken || !accessToken) {
        throw Error("Cannot request refresh..")
    }

    const path = "http://localhost:8080/api/v1/token/refresh"

    const header = {'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + accessToken}

    const data = {refreshToken, mid}

    const res = await axios.post(path, data, {headers: header})

    return res.data
}


export const saveToken = ( tokenName, tokenValue ) => {

    cookies.set(tokenName, tokenValue)

}