// fileService.js
import customAxios from "./customAxios.js";

export const uploadServer = async (formData) => {
  try {
    // Use Axios to upload the file
    const res = await customAxios.post('http://localhost:8080/api/v1/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Required for file uploads
        'Authorization': 'Bearer your_token', // Set the authorization token
        // Add other necessary headers here if needed
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const deleteServerFile = async (fileName) => {
  try {
    const res = await customAxios.delete(`http://localhost:8080/api/v1/files/delete/${fileName}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};
