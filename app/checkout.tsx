import CardCart from "@/components/ui/CardCart";
import { Colors } from "@/constants/Colors";
import { useCart } from "@/features/cart";
import { useOrder } from "@/features/order";
import { formatCurrency } from "@/utils/format";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Checkout = () => {
  const { data: cart } = useCart.cart();
  const { mutate: checkout, isPending: loading } = useOrder.checkout();

  const [shippingAddress, setShippingAddress] = useState("");

  const handleSubmit = useCallback(() => {
    if (!shippingAddress.trim()) {
      Alert.alert("Shipping address is required.");
      return;
    }

    checkout(
      { shipping_address: shippingAddress },
      {
        onSuccess: () => {
          router.push("/orders/payment");
        },
        onError: (err: any) => {
          Alert.alert("Error", err.message || "Something went wrong");
        },
      }
    );
  }, [shippingAddress]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <Text style={styles.label}>Shipping Address *</Text>
      <TextInput
        placeholder="e.g. Jakarta"
        style={styles.input}
        multiline
        value={shippingAddress}
        onChangeText={setShippingAddress}
      />

      <View style={styles.header}>
        <Text style={[styles.headerText, { flex: 5 }]}>Product</Text>
        <Text style={[styles.headerText, { flex: 3 }]}>Price</Text>
        <Text style={[styles.headerText, { flex: 2 }]}>Action</Text>
      </View>

      {Number(cart?.items?.length) > 0 ? (
        cart?.items.map((item) => (
          <CardCart key={item.order_item_id} item={item} />
        ))
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No items in cart.</Text>
        </View>
      )}

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping Cost:</Text>
          <Text style={styles.summaryValue}>
            {formatCurrency(cart?.shipping_costs || 0)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Price:</Text>
          <Text style={styles.summaryValue}>
            {formatCurrency(cart?.total_price || 0)}
          </Text>
        </View>
        <View style={[styles.summaryRow, { marginTop: 12 }]}>
          <Text style={styles.grandTotalLabel}>Grand Total:</Text>
          <Text style={styles.grandTotalValue}>
            {formatCurrency(cart?.grand_total || 0)}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.checkoutButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.checkoutButtonText}>
            {loading ? "Processing..." : "Payment"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    minHeight: 60,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  headerText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#555",
  },
  emptyCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  emptyText: {
    color: "#999",
    fontSize: 14,
    fontStyle: "italic",
  },
  summaryCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#555",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  grandTotalValue: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
  checkoutButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.6,
  },
});
