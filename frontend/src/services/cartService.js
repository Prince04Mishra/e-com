import axios from "axios";

const API_URL = "http://localhost:5000/api/cart/"; // Adjust the base URL as needed.

// const addToCart = async (productId, quantity) => {
//   const response = await axios.post(`${API_URL}/add`, {
//     userId: localStorage.getItem("userId"), // Ensure userId is retrieved correctly
//     productId,
//     quantity,
//   });
//   return response.data;
// };

const addToCart = async (userId, productId, quantity) => {
  const response = await axios.post(`${API_URL}/add`, {
    userId,
    productId,
    quantity,
  });
  return response.data;
};

const getCartItems = async () => {
  const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

const updateCart = async (cartItemId, quantity) => {
  const response = await axios.put(`${API_URL}/update/${cartItemId}`, {
    quantity,
  });
  return response.data;
};

const removeFromCart = async (cartItemId) => {
  const response = await axios.delete(`${API_URL}/remove/${cartItemId}`);
  return response.data;
};

const checkout = async (cartDetails) => {
  const response = await axios.post(`${API_URL}/checkout`, cartDetails);
  return response.data;
};

export default {
  addToCart,
  getCartItems,
  updateCart,
  removeFromCart,
  checkout,
};
