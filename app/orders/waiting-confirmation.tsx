import { useOrder } from "@/features/order";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

const { width } = Dimensions.get("window");

const WaitingConfirmation = () => {
  const navigation = useNavigation();
  const { data, refetch } = useOrder.checkStatus();

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    if (data?.data?.isShipped === true) {
      router.push("/orders/success");
    }
  }, [data, navigation]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <Image
        source={require("@/assets/images/waiting.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>
        Payment Received. Waiting for Admin Confirmation.
      </Text>
      <Text style={styles.description}>
        Thank you for uploading your proof of payment. Your transaction is now
        under review. Once approved by our admin, the status will automatically
        update to <Text style={styles.bold}>Success</Text>. Please wait a
        moment.
      </Text>
    </ScrollView>
  );
};

export default WaitingConfirmation;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  image: {
    width: width * 0.8,
    height: 300,
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
  },
  bold: {
    fontWeight: "bold",
    color: "#000",
  },
});
