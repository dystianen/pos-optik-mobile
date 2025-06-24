import { Colors } from "@/constants/Colors";
import { useCart } from "@/features/cart";
import { TItem } from "@/types/cart";
import { embedImage } from "@/utils/embedImage";
import { formatCurrency } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CardCartProps {
  item: TItem;
  hideAction?: boolean;
}

const CardCart: React.FC<CardCartProps> = ({ item, hideAction = false }) => {
  const { mutate: deleteItem } = useCart.deleteItemCart();

  const handleDeleteItemCart = useCallback(() => {
    deleteItem(item.order_item_id);
  }, []);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: embedImage(item.product_image_url) }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.product_name}</Text>
        <Text style={styles.price}>{formatCurrency(item.price)}</Text>
      </View>
      {!hideAction && (
        <TouchableOpacity onPress={handleDeleteItemCart}>
          <Ionicons name="trash-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CardCart;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    elevation: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#eee",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    color: "#666",
  },
});
