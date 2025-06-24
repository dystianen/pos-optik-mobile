import queryClient from "@/lib/api/reactQueryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import orderService from "./orderService";

export const useOrder = {
  orders() {
    return useQuery({
      queryKey: ["orders"],
      queryFn: orderService.orders,
    });
  },
  checkout() {
    return useMutation({
      mutationFn: orderService.checkout,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["total_cart"] });
      },
    });
  },
  payment() {
    return useMutation({
      mutationFn: orderService.payment,
    });
  },
  checkStatus() {
    return useQuery({
      queryKey: ["check_status"],
      queryFn: orderService.checkStatus,
    });
  },
};
