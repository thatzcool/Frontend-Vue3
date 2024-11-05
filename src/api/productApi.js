// productService.js
import customAxios from "./customAxios.js";

const server = 'http://localhost:8080';

export const postProduct = async (product) => {
  try {
    const res = await customAxios.post(`${server}/api/v1/products`, product);
    return res.data;
  } catch (error) {
    console.error("Error posting product:", error);
    throw error;
  }
};

export const getProducts = async (page = 1, size = 10) => {
  try {
    console.log("server:", server);
    const res = await customAxios.get(`${server}/api/v1/products/list?page=${page}&size=${size}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProduct = async (pno) => {
  try {
    const res = await customAxios.get(`${server}/api/v1/products/${pno}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const deleteProduct = async (pno) => {
  try {
    const res = await customAxios.delete(`${server}/api/v1/products/${pno}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const putProduct = async (product) => {
  try {
    const res = await customAxios.put(`${server}/api/v1/products/${product.pno}`, product);
    return res.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
