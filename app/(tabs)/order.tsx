import Layout from "@/components/layouts/layout";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const initialItems = [
  { id: "1", name: "Nasi Goreng Spesial", price: 25000, quantity: 0 },
  { id: "2", name: "Martabak Keju susu", price: 30000, quantity: 1 },
  { id: "3", name: "Es Cendol", price: 16000, quantity: 1 },
  { id: "4", name: "Bakso Sniper", price: 26000, quantity: 1 },
  { id: "5", name: "Tahu Pidis", price: 40000, quantity: 1 },
  { id: "6", name: "Es Matahari", price: 26000, quantity: 1 },
  { id: "7", name: "Seblak", price: 26000, quantity: 1 },
  { id: "8", name: "Roti Bakar coklat wijen", price: 36000, quantity: 1 },
  { id: "9", name: "Pisang goreng keju susu", price: 26000, quantity: 1 },
  { id: "10", name: "Pisang goreng keju susu", price: 26000, quantity: 1 },
  { id: "11", name: "Pisang goreng keju susu", price: 26000, quantity: 1 },
  { id: "12", name: "Pisang goreng keju susu", price: 26000, quantity: 1 },
  { id: "13", name: "Pisang goreng keju susu", price: 26000, quantity: 1 },
  { id: "14", name: "Pisang goreng keju susu", price: 26000, quantity: 1 },
  { id: "15", name: "Pisang goreng keju susu", price: 26000, quantity: 1 },
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
          {item.quantity}x Rp{item.price.toLocaleString("id-ID")}
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

  return (
    <Layout withSearch>
      <Text style={styles.menuTitle}>Menu Warung Kecil</Text>
      <ScrollView
        style={{ marginBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {menuItems.map((item) => renderItem({ item }))}
      </ScrollView>

      {/* Bottom Summary */}
      <View style={styles.summaryBar}>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          Rp{total.toLocaleString("id-ID")}
        </Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={{ fontWeight: "600", color: "white" }}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: { fontWeight: "600" },
  itemSub: { fontSize: 13, color: "#777" },
  addButton: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
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
    borderColor: "#ddd",
  },
  checkoutButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
});
