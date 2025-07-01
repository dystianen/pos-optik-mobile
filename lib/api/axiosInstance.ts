import { BASE_URL } from "@/constants/BaseUrl";
import { getAccessToken } from "@/utils/auth";
import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    Accept: "application/json",
  },
  timeout: 3000000,
  responseType: "json",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const isFormData = config.data instanceof FormData;

    if (!isFormData) {
      config.headers["Content-Type"] = "application/json";
    } else {
      config.headers["Content-Type"] = "multipart/form-data"; // ⬅️ Penting!
    }

    return config;
  },
  (error) => {
    console.error("❌ REQUEST ERROR:", error);
    return Promise.reject(error);
  }
);
export default axiosInstance;
