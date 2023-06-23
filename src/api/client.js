import axios from "axios";
import { useNavigate } from "react-router";

axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: process.env.API_URL || "http://127.0.0.1:8000",
  withCredentials: true,
});

client.interceptors.request.use(function (config) {
  if (localStorage.user) {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    config.headers.Authorization = `Bearer ${userStorage?.accessToken}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (err) => {
    const { status } = err.response;
    const originalReq = err.config;
    const navigate = useNavigate();

    if (originalReq.url !== "/users/loginUser" && err.response) {
      if (err.response.status === 401) {
        localStorage.removeItem("user");
        navigate("/login");
        return Promise.reject();
      }
    }

    switch (status) {
      case 403:
        localStorage.removeItem("user");
        navigate("/login");
        break;
      default:
        break;
    }

    return Promise.reject(err);
  }
);

export default client;
