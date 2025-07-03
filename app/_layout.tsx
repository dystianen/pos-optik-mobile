import CartIcon from "@/components/ui/CartIcon";
import { Colors } from "@/constants/Colors";
import queryClient from "@/lib/api/reactQueryClient";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import "react-native-reanimated";

const lightTheme = {
  ...MD3LightTheme,
  dark: false, // Explicitly set dark to false for light mode
  // You can also customize colors or other theme properties here
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
  },
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    DancingScript: require("../assets/fonts/DancingScript-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={DefaultTheme}>
        <PaperProvider theme={lightTheme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: true }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="product-detail"
                options={{
                  title: "Product Detail",
                  headerRight: () => <CartIcon />,
                }}
              />
              <Stack.Screen name="checkout" options={{ title: "Checkout" }} />
              <Stack.Screen name="cart" options={{ headerShown: false }} />
              <Stack.Screen
                name="orders/index"
                options={{ title: "My Orders" }}
              />
              <Stack.Screen
                name="orders/payment"
                options={{ title: "Payment" }}
              />
              <Stack.Screen
                name="orders/waiting-confirmation"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="orders/success"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </GestureHandlerRootView>
          <StatusBar style="auto" />
        </PaperProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
