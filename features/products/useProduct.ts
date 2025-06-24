import { useQuery } from "@tanstack/react-query";
import productService from "./productService";

export const useProducts = {
  getProduct({
    category,
    search,
  }: {
    category?: string | null;
    search?: string;
  }) {
    return useQuery({
      queryKey: ["products", { search }],
      queryFn: () => productService.getProduct({ category, search }),
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
