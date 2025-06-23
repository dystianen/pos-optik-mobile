import axiosInstance from "@/lib/api/axiosInstance";
import type { TReqAddToCart, TResCart, TResTotalCart } from "@/types/cart";

const cartService = {
  async addToCart(payload: TReqAddToCart) {
    const response = await axiosInstance.post("/cart/add-to-cart", payload);
    return response.data;
  },
  async totalCart() {
    const response = await axiosInstance.get<TResTotalCart>("/cart/total-cart");
    return response.data.data;
  },
  async cart() {
    const response = await axiosInstance.get<TResCart>("/cart");
    return response.data.data;
  },
  async deleteItemCart(id: string) {
    const response = await axiosInstance.delete<TResCart>(`/cart/delete/${id}`);
    return response.data.data;
  },
};

export default cartService;
