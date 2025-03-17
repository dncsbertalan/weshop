import axios from "axios";
import { authToken } from "./apiConstants";

//const BASE_URL = "http://localhost:5220";

const api = axios.create({
    //baseURL: BASE_URL,
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