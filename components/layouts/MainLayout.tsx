import { Ionicons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const MainLayout = ({
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
            <Ionicons name="cart-outline" size={20} />
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
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  searchBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  icons: {
    flexDirection: "row",
    gap: 12,
  },
});

export default MainLayout;
