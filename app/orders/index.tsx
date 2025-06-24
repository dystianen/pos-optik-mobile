import CardCart from "@/components/ui/CardCart";
import { useOrder } from "@/features/order";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Orders = () => {
  const { data: orders, isLoading } = useOrder.orders();
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);

  const toggleCollapse = useCallback((index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenedIndex((prev) => (prev === index ? null : index));
  }, []);

  const renderSkeleton = (count = 3) => {
    return Array.from({ length: count }).map((_, i) => (
      <View key={i} style={styles.skeletonCard}>
        <View style={styles.skeletonRow}>
          <View style={styles.skeletonBox} />
          <View style={styles.skeletonBoxSmall} />
          <View style={styles.skeletonBoxTiny} />
          <View style={styles.skeletonButton} />
        </View>
        <View style={styles.skeletonLine} />
        <View style={styles.skeletonLineShort} />
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Orders</Text>

      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Order Date</Text>
        <Text style={styles.headerText}>Grand Total</Text>
        <Text style={styles.headerText}>Status</Text>
        <Text style={styles.headerText}>Action</Text>
      </View>

      {isLoading ? (
        renderSkeleton()
      ) : orders && orders.length > 0 ? (
        orders.map((order: any, index: number) => (
          <View key={index} style={styles.orderCard}>
            <View style={styles.row}>
              <Text style={styles.col}>{order.order_date}</Text>
              <Text style={styles.col}>
                Rp {order.grand_total?.toLocaleString()}
              </Text>
              <Text style={styles.col}>{order.status}</Text>
              <TouchableOpacity
                onPress={() => toggleCollapse(index)}
                style={styles.actionButton}
              >
                <Text style={styles.actionText}>
                  {openedIndex === index ? "Hide Items" : "Show Items"}
                </Text>
                <Ionicons
                  name={openedIndex === index ? "chevron-up" : "chevron-down"}
                  size={16}
                  color="#007bff"
                />
              </TouchableOpacity>
            </View>

            {openedIndex === index && (
              <View style={styles.itemsContainer}>
                {order.items && order.items.length > 0 ? (
                  order.items.map((item: any, idx: number) => (
                    <CardCart key={idx} item={item} hideAction />
                  ))
                ) : (
                  <Text style={styles.noItemsText}>
                    No items found in this order.
                  </Text>
                )}
              </View>
            )}
          </View>
        ))
      ) : (
        <View style={styles.noOrderCard}>
          <Text style={styles.noOrderText}>No Orders Found</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 24,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e0f0ff",
    padding: 12,
    borderRadius: 6,
  },
  headerText: {
    flex: 1,
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  orderCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  col: {
    flex: 1,
    fontSize: 14,
    textAlign: "center",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  actionText: {
    color: "#007bff",
    marginRight: 4,
  },
  itemsContainer: {
    marginTop: 12,
  },
  noItemsText: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#999",
  },
  noOrderCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  noOrderText: {
    fontSize: 16,
    color: "#777",
  },
  // Skeleton styles
  skeletonCard: {
    backgroundColor: "#eee",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  skeletonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  skeletonBox: {
    height: 16,
    width: "25%",
    backgroundColor: "#ccc",
    borderRadius: 4,
  },
  skeletonBoxSmall: {
    height: 16,
    width: "20%",
    backgroundColor: "#ccc",
    borderRadius: 4,
  },
  skeletonBoxTiny: {
    height: 16,
    width: "15%",
    backgroundColor: "#ccc",
    borderRadius: 4,
  },
  skeletonButton: {
    height: 32,
    width: 100,
    backgroundColor: "#bbb",
    borderRadius: 16,
  },
  skeletonLine: {
    height: 12,
    backgroundColor: "#ccc",
    marginTop: 8,
    borderRadius: 4,
  },
  skeletonLineShort: {
    height: 12,
    backgroundColor: "#ccc",
    marginTop: 6,
    width: "60%",
    borderRadius: 4,
  },
});

export default Orders;
