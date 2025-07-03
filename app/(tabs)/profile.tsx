import MainLayout from "@/components/layouts/MainLayout";
import { Colors } from "@/constants/Colors";
import queryClient from "@/lib/api/reactQueryClient";
import { useAuthStore } from "@/stores/useAuthStore";
import { removeAccessToken } from "@/utils/auth";
import { router } from "expo-router";
import React, { useCallback } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function Profile() {
  const { profile, clearProfile } = useAuthStore();

  const handleLogout = useCallback(() => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await removeAccessToken();
            clearProfile();
            queryClient.clear();
            router.replace("/login");
          },
        },
      ],
      { cancelable: true }
    );
  }, []);

  return (
    <MainLayout style={styles.container}>
      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <View>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.name}>{profile?.user_name || "Guest"}</Text>
        <Text style={styles.username}>{profile?.email || "-"}</Text>
      </View>

      {/* Menu List */}
      <View style={styles.menuList}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/cart")}
        >
          <View style={styles.menuLeft}>
            <Icon name={"heart"} size={20} color="#555" />
            <Text style={styles.menuText}>My Cart</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/orders")}
        >
          <View style={styles.menuLeft}>
            <Icon name={"credit-card"} size={20} color="#555" />
            <Text style={styles.menuText}>My Orders</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={[styles.menuItem, styles.logout]}
          onPress={handleLogout}
        >
          <View style={styles.menuLeft}>
            <Icon name="log-out" size={20} color={Colors.primary} />
            <Text style={[styles.menuText, { color: Colors.primary }]}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
  },
  username: {
    fontSize: 14,
    color: "#777",
  },
  menuList: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  menuText: {
    fontSize: 14,
    marginLeft: 15,
  },
  logout: {
    marginTop: 20,
  },
});
