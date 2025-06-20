import React, { ReactNode } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthLayout;
