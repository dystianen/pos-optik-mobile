import type { TDecodedToken } from "@/types/auth";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

export async function setAccessToken(value: string) {
  return await SecureStore.setItemAsync("access_token", value);
}

export async function getAccessToken() {
  return await SecureStore.getItemAsync("access_token");
}

export async function removeAccessToken() {
  await SecureStore.deleteItemAsync("access_token");
}

export async function getDecodedToken(): Promise<TDecodedToken | null> {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<TDecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

export async function decodedToken(token: string): Promise<TDecodedToken> {
  const decoded = jwtDecode<TDecodedToken>(token);
  return decoded;
}
