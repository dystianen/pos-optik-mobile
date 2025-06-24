import axiosInstance from "@/lib/api/axiosInstance";
import type {
  TResCategories,
  TResProduct,
  TResProducts,
} from "@/types/product";

const productService = {
  async getProduct({
    category,
    search,
  }: {
    category?: string | null;
    search?: string;
  }) {
    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (search) params.append("search", search);

    const queryString = params.toString();
    const response = await axiosInstance.get<TResProducts>(
      `/products${queryString ? `?${queryString}` : ""}`
    );

    return response.data.data;
  },
  async getProductDetail({ id }: { id: string | null }) {
    const response = await axiosInstance.get<TResProduct>(`/products/${id}`);
    return response.data.data;
  },
  async getRecommendations({ limit }: { limit: number }) {
    const response = await axiosInstance.get<TResProducts>(
      `/products/recommendations?limit=${limit}`
    );
    return response.data.data;
  },
  async getNewEyeWear() {
    const response = await axiosInstance.get<TResProducts>(
      "/products/new-eyewear"
    );
    return response.data.data;
  },
  async getProductCategory() {
    const response = await axiosInstance.get<TResCategories>(
      "/products/category"
    );
    return response.data.data;
  },
};

export default productService;
