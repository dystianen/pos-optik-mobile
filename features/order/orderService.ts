import axiosInstance from "@/lib/api/axiosInstance";
import type { TReqCheckout } from "@/types/order";

const orderService = {
  async orders() {
    const response = await axiosInstance.get("/orders");
    return response.data.data;
  },
  async checkout(payload: TReqCheckout) {
    const response = await axiosInstance.post("/orders/checkout", payload);
    return response.data;
  },
  async payment(payload: FormData) {
    const response = await axiosInstance.post("/orders/payment", payload);
    return response.data;
  },
  async checkStatus() {
    const response = await axiosInstance.get("/orders/check-status");
    return response.data;
  },
};

export default orderService;
