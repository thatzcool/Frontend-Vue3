import axios from "axios";
import customAxios from "./customAxios.jsx";


export const getSample = async () => {

    const response = await customAxios.get('http://localhost:8080/api/v1/samples/list' )

    return response.data


}