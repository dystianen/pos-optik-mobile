import { TDecodedToken } from "@/types/auth";
import { create } from "zustand";

interface AuthState {
  profile: TDecodedToken | null;
  setProfile: (profile: TDecodedToken) => void;
  clearProfile: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}));
