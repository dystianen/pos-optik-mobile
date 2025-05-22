import { Ionicons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { Platform, StatusBar, StyleSheet, TextInput, View } from "react-native";

const Layout = ({
  children,
  withSearch = false,
}: {
  children: ReactNode;
  withSearch?: boolean;
}) => {
  return (
    <View style={styles.container}>
      {withSearch && (
        <View style={styles.header}>
          <TextInput
            placeholder="Search Product ..."
            style={styles.searchBox}
          />
          <View style={styles.icons}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} />
            <Ionicons name="notifications-outline" size={20} />
          </View>
        </View>
      )}

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  searchBox: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  icons: {
    flexDirection: "row",
    gap: 12,
  },
});

export default Layout;
