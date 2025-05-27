import MainLayout from "@/components/layouts/MainLayout";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function Profile() {
  return (
    <MainLayout style={styles.container}>
      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <View>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }} // Ganti dengan foto asli
            style={styles.profileImage}
          />
          <View style={styles.cameraIcon}>
            <Icon name="camera" size={14} color="#fff" />
          </View>
        </View>
        <Text style={styles.name}>Charlotte King</Text>
        <Text style={styles.username}>@johnkinggraphics</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Menu List */}
      <View style={styles.menuList}>
        {[
          { icon: "heart", label: "Favourites" },
          { icon: "download", label: "Downloads" },
          { icon: "globe", label: "Language" },
          { icon: "map-pin", label: "Location" },
          { icon: "credit-card", label: "Subscription" },
          { icon: "trash-2", label: "Clear cache" },
          { icon: "clock", label: "Clear history" },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Icon name={item.icon} size={20} color="#555" />
              <Text style={styles.menuText}>{item.label}</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#999" />
          </TouchableOpacity>
        ))}

        {/* Logout */}
        <TouchableOpacity style={[styles.menuItem, styles.logout]}>
          <View style={styles.menuLeft}>
            <Icon name="log-out" size={20} color="#f00" />
            <Text style={[styles.menuText, { color: "#f00" }]}>Log out</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
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
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#f33",
    borderRadius: 10,
    padding: 4,
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
  editButton: {
    backgroundColor: "#f33",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
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
