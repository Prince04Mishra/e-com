import axios from "axios";

const API_URL = "/api/orders";

const getOrders = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

const getOrderById = async (orderId) => {
  const response = await axios.get(`${API_URL}/${orderId}`);
  return response.data;
};

const createOrder = async (orderDetails) => {
  const response = await axios.post(`${API_URL}`, orderDetails);
  return response.data;
};

export default {
  getOrders,
  getOrderById,
  createOrder,
};
