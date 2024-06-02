import axios from "axios";
import { Config } from "./_endpoints";

const {
  methods: { GET, POST, PATCH, PUT, DELETE },
} = Config;

const axiosClient = axios.create({
  baseURL: Config.baseURL,
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (res) => {
    const { method } = res.config;

    return res;
  },
  async (error) => {
    const status = error.response?.status;

    if (
      error.response &&
      (status === 401 || status === 403 || status === 429)
    ) {
      if (window !== undefined && window) {
        localStorage.clear();
        setTimeout(() => {
          window.location.pathname = "/login";
        }, 500);
      }
    }

    return Promise.reject(error);
  }
);

axiosClient.interceptors.request.use(
  (config) => {
    // custom header append here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
