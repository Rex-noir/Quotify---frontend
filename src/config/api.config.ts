import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_ENV === "production"
      ? import.meta.env.VITE_API_URL
      : import.meta.env.VITE_API_DEV,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withXSRFToken: true,
});

api.interceptors.request.use(
  (config) => {
    const socketId = window.Echo.socketId();
    if (socketId) {
      config.headers["X-Socket-ID"] = socketId;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
