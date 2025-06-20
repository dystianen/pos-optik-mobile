import * as SecureStore from "expo-secure-store";

export async function getAccessToken() {
  return await SecureStore.getItemAsync("access_token");
}

export async function removeAccessToken() {
  await SecureStore.deleteItemAsync("access_token");
}
