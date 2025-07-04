import MainLayout from "@/components/layouts/MainLayout";
import CardCart from "@/components/ui/CardCart";
import CardCartSkeleton from "@/components/ui/CardCartSkeleton";
import { Colors } from "@/constants/Colors";
import { useCart } from "@/features/cart";
import { formatCurrency } from "@/utils/format";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Cart = () => {
  const { data: cart, isLoading, refetch } = useCart.cart();
  const [refreshing, setRefreshing] = useState(false);

  const handleCheckout = useCallback(() => {
    router.push("/checkout");
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={[styles.headerText, { flex: 5 }]}>Product</Text>
      <Text style={[styles.headerText, { flex: 3 }]}>Price</Text>
      <Text style={[styles.headerText, { flex: 2 }]}>Action</Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.totalText}>
        Total Price: {formatCurrency(cart?.total_price || 0)}
      </Text>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <MainLayout style={styles.container}>
      <Text style={styles.title}>My Cart</Text>

      {renderHeader()}

      {isLoading ? (
        [1, 2].map((i) => <CardCartSkeleton key={i} />)
      ) : Number(cart?.items?.length) > 0 ? (
        <FlatList
          data={cart?.items}
          keyExtractor={(item) => item.order_item_id.toString()}
          renderItem={({ item }) => <CardCart item={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No items in cart.</Text>
        </View>
      )}

      {renderFooter()}
    </MainLayout>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 24,
    color: "#333",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  headerText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#555",
  },
  emptyCard: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    marginVertical: 16,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
