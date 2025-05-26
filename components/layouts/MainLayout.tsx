import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type MainLayoutProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const MainLayout = ({ children, style }: MainLayoutProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
});

export default MainLayout;
