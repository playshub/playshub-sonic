import axios from "axios";
import { getJwtToken, setJwtToken } from "../utils/storage";
import { PLAY_HUBS_API_URL } from "../utils/constants";

const api = axios.create({
  baseURL: PLAY_HUBS_API_URL,
});

api.interceptors.request.use(
  (config) => {
    // Server side
    if (typeof window === "undefined") {
      return config;
    }

    // Client side
    const token = getJwtToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      setJwtToken("");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
