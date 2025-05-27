import { router } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type TProps = {
  name: string;
  img: string;
};

const CardProduct = ({ name, img }: TProps) => {
  const handlePress = () => {
    router.push({
      pathname: "/menu-detail",
      params: { name, img },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.menuItem}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: img, cache: "only-if-cached" }}
            style={styles.image}
          />
        </View>
        <Text style={styles.menuText}>{name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    width: 120,
    marginRight: 12,
  },
  imageWrapper: {
    height: 80,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 6,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  menuText: {
    fontSize: 12,
  },
});

export default CardProduct;
