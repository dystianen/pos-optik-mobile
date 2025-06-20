import { TProduct } from "@/types/product";
import { embedImage } from "@/utils/embedImage";
import { router } from "expo-router";
import React, { useCallback } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface CardProductProps {
  item: TProduct;
}

const CardProduct: React.FC<CardProductProps> = ({ item }) => {
  const handlePress = useCallback(() => {
    router.push({
      pathname: "/product-detail",
      params: {
        id: item.product_id,
      },
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.card}>
        <Image
          source={{
            uri: embedImage(item.product_image_url),
          }}
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={styles.brand}>{item.product_brand}</Text>
          <Text style={styles.name}>{item.product_name}</Text>
          <View style={styles.column}>
            <Text style={styles.code}>{item.model}</Text>
            <Text style={styles.price}>{item.product_price}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 1,
    marginBottom: 16,
    width: 150,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    padding: 10,
  },
  brand: {
    color: "#377DFF",
    fontWeight: "600",
    fontSize: 12,
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  column: {
    flexDirection: "column",
    gap: 2,
  },
  code: {
    color: "#888",
    fontSize: 12,
  },
  price: {
    fontWeight: "600",
    fontSize: 12,
  },
});

export default CardProduct;
