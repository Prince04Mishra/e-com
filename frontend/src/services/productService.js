import axios from "axios";

const API_URL = "https://e-com-uam9.vercel.app/api/products/";

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addProduct = async (productData) => {
  const response = await axios.post(API_URL, productData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}${id}`, productData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
