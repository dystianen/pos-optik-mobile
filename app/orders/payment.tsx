import { Colors } from "@/constants/Colors";
import { useOrder } from "@/features/order";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Payment = () => {
  const { mutate: payment } = useOrder.payment();

  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (!selectedImage) {
      Alert.alert("Validation", "Please upload proof of payment.");
      return;
    }
    console.log({ selectedImage });

    setLoading(true);

    const formData = new FormData();
    const file = {
      uri: selectedImage.uri,
      name: selectedImage.fileName || "payment.jpg",
      type: selectedImage.mimeType || "image/jpeg",
    };
    console.log("FILE KFJFJFJFJF: ", file);
    formData.append("proof_of_payment", file as any);

    payment(formData, {
      onSuccess: () => {
        setLoading(false);
        router.push("/orders/waiting-confirmation");
      },
      onError: (err: any) => {
        setLoading(false);

        console.log("🚀 ~ FULL ERROR OBJECT:", JSON.stringify(err, null, 2));

        if (err.response) {
          console.log("❌ RESPONSE ERROR:", err.response.data);

          const message =
            err.response.data?.message ||
            err.response.data?.error ||
            "Unknown server error.";

          Alert.alert("Error", message);
        } else if (err.request) {
          console.log("❌ REQUEST ERROR:", err.request);
          Alert.alert("Network Error", "No response received from the server.");
        } else {
          console.log("❌ AXIOS ERROR:", err.message);
          Alert.alert("Error", err.message || "Something went wrong.");
        }
      },
    });
  }, [selectedImage]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Payment</Text>

      <Image
        source={require("@/assets/images/payment.png")}
        style={styles.banner}
        resizeMode="contain"
      />

      <Text style={styles.bankInfo}>BCA: 0901952680</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadText}>
          {selectedImage ? "Change Image" : "Upload Proof of Payment"}
        </Text>
      </TouchableOpacity>

      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={styles.previewImage}
          resizeMode="cover"
        />
      )}

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.disabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
  },
  banner: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  bankInfo: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
  },
  uploadText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 24,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  disabled: {
    opacity: 0.6,
  },
});
