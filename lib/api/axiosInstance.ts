import { getAccessToken } from "@/utils/auth";
import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://10.0.2.2:8080/api",
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

    console.log({ config });

    // ❗️Hapus Content-Type jika pakai FormData
    if (
      config.data instanceof FormData &&
      config.headers["Content-Type"] === "application/json"
    ) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => {
    console.error("❌ REQUEST ERROR:", error);
    return Promise.reject(error);
  }
);
export default axiosInstance;
