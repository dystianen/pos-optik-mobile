import MainLayout from "@/components/layouts/MainLayout";
import { router } from "expo-router";
import React, { useCallback } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Checkout() {
  const handleCancel = useCallback(() => {
    router.back();
  }, []);

  return (
    <MainLayout style={styles.container}>
      <Text style={styles.label}>Table</Text>
      <TextInput
        placeholder="Please input table number"
        style={styles.input}
        keyboardType="number-pad"
      />

      <Text style={styles.label}>Order</Text>
      <View style={styles.summaryBox}>
        <SummaryRow label="Nasi Goreng" value="Rp250.000" />
        <SummaryRow label="Bakso Sniper" value="Rp10.000" />
        <SummaryRow label="Ayam Bakar" value="Rp26.000" />
        <SummaryRow label="Gedang Goreng" value="Rp10.000" />
      </View>

      <Text style={styles.label}>Summary</Text>
      <View style={styles.summaryBox}>
        <SummaryRow label="Subtotal" value="Rp250.000" />
        <SummaryRow label="Shipping" value="Rp10.000" />
        <SummaryRow label="Tax(10%)" value="Rp26.000" />
        <SummaryRow label="Service" value="Rp10.000" />
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total Payment</Text>
        <Text style={styles.totalAmount}>Rp296.000</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.payButton]}>
          <Text style={styles.payText}>Print Qris</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.summaryRow}>
    <Text>{label}</Text>
    <Text>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    padding: 16,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
    backgroundColor: "#fff",
  },
  summaryBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  totalAmount: {
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: "#eee",
  },
  payButton: {
    backgroundColor: "#f33",
    shadowColor: "#f33",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cancelText: {
    fontWeight: "bold",
    color: "#333",
  },
  payText: {
    fontWeight: "bold",
    color: "#fff",
  },
});
