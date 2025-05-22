import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TProps = {
  name: string;
  img: string;
};

const CardProduct = ({ name, img }: TProps) => {
  const handlePress = () => {
    router.push({
      pathname: "/ProductDetail",
      params: { name, img },
    });
  };

  return (
    <TouchableOpacity style={styles.menuItem} onPress={handlePress}>
      <View style={styles.menuImage} />
      <Text style={styles.menuText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    width: 120,
    marginRight: 12,
  },
  menuImage: {
    height: 80,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 6,
  },
  menuText: {
    fontSize: 13,
  },
});

export default CardProduct;
