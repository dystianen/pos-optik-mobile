import CartIcon from "@/components/ui/CartIcon";
import queryClient from "@/lib/api/reactQueryClient";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

// Jangan sembunyikan SplashScreen otomatis
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    DancingScript: require("../assets/fonts/DancingScript-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Tambahkan delay untuk efek splash
      setTimeout(async () => {
        setAppReady(true);
        await SplashScreen.hideAsync();
      }, 1500);
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && appReady) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, appReady]);

  if (!fontsLoaded || !appReady) {
    return (
      <View style={styles.splashContainer} onLayout={onLayoutRootView}>
        <Text style={styles.splashText}>Marketplace Optik</Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={DefaultTheme}>
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
            <Stack.Screen name="+not-found" />
          </Stack>
        </GestureHandlerRootView>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  splashText: {
    fontSize: 42,
    fontFamily: "DancingScript",
    color: "#000",
  },
});
