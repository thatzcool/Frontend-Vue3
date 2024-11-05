// sampleService.js
import customAxios from "./customAxios.js";

export const getSample = async () => {
  try {
    const response = await customAxios.get('http://localhost:8080/api/v1/samples/list');
    return response.data;
  } catch (error) {
    console.error("Error fetching sample data:", error);
    throw error;
  }
};
