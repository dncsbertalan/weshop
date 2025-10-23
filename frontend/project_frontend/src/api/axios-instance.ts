import axios from "axios";
import { authToken } from "./api-constants";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  //const token = JSON.parse(localStorage.getItem(authToken) ?? "ERROR");
  const token = localStorage.getItem(authToken);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
