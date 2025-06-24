import { TProduct } from "@/types/product";
import { embedImage } from "@/utils/embedImage";
import { router } from "expo-router";
import React, { useCallback } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface CardProductProps {
  item: TProduct;
  variant?: "grid" | "horizontal";
}

const screenWidth = Dimensions.get("window").width;
const cardSpacing = 16;
const cardWidth = (screenWidth - cardSpacing * 3) / 2;

const CardProduct: React.FC<CardProductProps> = ({ item, variant }) => {
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
      <View
        style={[
          styles.card,
          variant === "grid" && { width: cardWidth },
          variant === "horizontal" && { width: 150 },
        ]}
      >
        <Image
          source={{
            uri: embedImage(item.product_image_url),
          }}
          style={[
            styles.image,
            variant === "horizontal" ? { height: 100 } : { height: 120 },
          ]}
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
  },
  image: {
    width: "100%",
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
