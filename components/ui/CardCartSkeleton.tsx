import React from "react";
import { StyleSheet, View } from "react-native";

const CardCartSkeleton = () => {
  return (
    <View style={styles.card}>
      <View style={styles.image} />
      <View style={styles.textContainer}>
        <View style={styles.textLineShort} />
        <View style={styles.textLine} />
      </View>
      <View style={styles.iconPlaceholder} />
    </View>
  );
};

export default CardCartSkeleton;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#ddd",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  textLine: {
    height: 12,
    backgroundColor: "#ccc",
    marginVertical: 4,
    borderRadius: 4,
    width: "80%",
  },
  textLineShort: {
    height: 12,
    backgroundColor: "#ccc",
    marginVertical: 4,
    borderRadius: 4,
    width: "50%",
  },
  iconPlaceholder: {
    width: 20,
    height: 20,
    backgroundColor: "#ccc",
    borderRadius: 10,
  },
});
