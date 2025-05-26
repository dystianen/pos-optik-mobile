import MainLayout from "@/components/layouts/MainLayout";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const initialItems = [
  { id: "1", name: "Nasi Goreng Spesial", price: 25000, quantity: 0 },
  { id: "2", name: "Martabak Keju susu", price: 30000, quantity: 0 },
  { id: "3", name: "Es Cendol", price: 16000, quantity: 0 },
  { id: "4", name: "Bakso Sniper", price: 26000, quantity: 0 },
  { id: "5", name: "Tahu Pidis", price: 40000, quantity: 0 },
  { id: "6", name: "Es Matahari", price: 26000, quantity: 0 },
  { id: "7", name: "Seblak", price: 26000, quantity: 0 },
  { id: "8", name: "Roti Bakar coklat wijen", price: 36000, quantity: 0 },
  { id: "9", name: "Pisang goreng keju susu", price: 26000, quantity: 0 },
  { id: "10", name: "Pisang goreng keju susu", price: 26000, quantity: 0 },
  { id: "11", name: "Pisang goreng keju susu", price: 26000, quantity: 0 },
  { id: "12", name: "Pisang goreng keju susu", price: 26000, quantity: 0 },
  { id: "13", name: "Pisang goreng keju susu", price: 26000, quantity: 0 },
  { id: "14", name: "Pisang goreng keju susu", price: 26000, quantity: 0 },
  { id: "15", name: "Pisang goreng keju susu", price: 26000, quantity: 0 },
];

export default function Order() {
  const [menuItems, setMenuItems] = useState(initialItems);

  const updateQuantity = (id: string, change: number) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(0, item.quantity + change),
            }
          : item
      )
    );
  };

  const total = menuItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const renderItem = ({ item }: { item: (typeof initialItems)[number] }) => (
    <View key={item.id} style={styles.itemContainer}>
      <View>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemSub}>
          {item.quantity > 0 ? `${item.quantity}x ` : ""}
          Rp{item.price.toLocaleString("id-ID")}
        </Text>
      </View>
      {item.quantity === 0 ? (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => updateQuantity(item.id, 1)}
        >
          <Text style={{ fontWeight: "600" }}>Tambah</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.qtyContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
            <Ionicons name="remove" size={20} />
          </TouchableOpacity>
          <Text style={{ marginHorizontal: 8 }}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
            <Ionicons name="add" size={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const handleCheckout = useCallback(() => {
    router.push({
      pathname: "/checkout",
    });
  }, []);

  return (
    <MainLayout style={styles.container}>
      <View style={styles.header}>
        <TextInput placeholder="Search Product ..." style={styles.searchBox} />
        <View style={styles.icons}>
          <Ionicons name="cart-outline" size={20} />
          <Ionicons name="chatbubble-ellipses-outline" size={20} />
          <Ionicons name="notifications-outline" size={20} />
        </View>
      </View>

      <Text style={styles.menuTitle}>Menu Waroeng Kecil</Text>
      <ScrollView
        style={{ marginBottom: 55 }}
        showsVerticalScrollIndicator={false}
      >
        {menuItems.map((item) => renderItem({ item }))}
      </ScrollView>

      {/* Bottom Summary */}
      <View style={styles.summaryBar}>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          Rp{total.toLocaleString("id-ID")}
        </Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={{ fontWeight: "600", color: "white" }}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 16,
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
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 16,
    color: "#333",
  },
  itemContainer: {
    borderWidth: 0.5,
    borderColor: "#ddd", // warna garis luar
    padding: 14,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent", // pastikan background transparan
  },
  itemTitle: {
    fontWeight: "700",
    fontSize: 14,
    color: "#333",
  },
  itemSub: {
    fontSize: 13,
    color: "#888",
    marginTop: 4,
  },
  addButton: {
    backgroundColor: "#fbd5d5",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fbd5d5",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  summaryBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  checkoutButton: {
    backgroundColor: "#f33",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    shadowColor: "#f33",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});
