import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const OrderSuccess = () => {
  const handleViewOrder = () => {
    router.push("/orders");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("@/assets/images/payment-success.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Payment Confirmed</Text>
      <Text style={styles.description}>
        Your payment has been successfully confirmed by our admin. Your order is
        now being processed and will be shipped shortly. Thank you for your
        trust and purchase!
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleViewOrder}>
        <Text style={styles.buttonText}>View My Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    maxWidth: 600,
    marginBottom: 30,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 999,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default OrderSuccess;
