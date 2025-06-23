import axiosInstance from "@/lib/api/axiosInstance";
import type { TReqLogin, TReqRegister } from "@/types/auth";

export const login = async (payload: TReqLogin) => {
  const response = await axiosInstance.post("/auth/login", payload);
  return response.data;
};

export const register = async (payload: TReqRegister) => {
  const response = await axiosInstance.post("/auth/register", payload);
  return response.data;
};
