import { useMutation } from "@tanstack/react-query";
import { login, register } from "./authService";

export const useAuth = {
  login() {
    return useMutation({
      mutationFn: login,
    });
  },
  register() {
    return useMutation({
      mutationFn: register,
    });
  },
};
