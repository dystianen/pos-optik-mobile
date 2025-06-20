import { useQuery } from "@tanstack/react-query";
import productService from "./productService";

export const useProducts = {
  getProduct(category: string | null) {
    return useQuery({
      queryKey: ["products"],
      queryFn: () => productService.getProduct({ category }),
    });
  },
  getProductDetail(id: string) {
    return useQuery({
      queryKey: ["product-detail", id],
      queryFn: () => productService.getProductDetail({ id }),
      enabled: !!id,
    });
  },
  getRecommendations(limit: number) {
    return useQuery({
      queryKey: ["recommendations"],
      queryFn: () => productService.getRecommendations({ limit }),
    });
  },
  getNewEyeWear() {
    return useQuery({
      queryKey: ["new-eyewear"],
      queryFn: productService.getNewEyeWear,
    });
  },
  getProductCategory() {
    return useQuery({
      queryKey: ["categories"],
      queryFn: productService.getProductCategory,
    });
  },
};
