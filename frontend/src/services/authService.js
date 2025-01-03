import axios from "axios";

const API_URL = "https://e-com-uam9.vercel.app/api/auth/";

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);
  localStorage.setItem("token", response.data.token); // Save token

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token"); // Clear token
};
