import CardCart from "@/components/ui/CardCart";
import { Colors } from "@/constants/Colors";
import { useOrder } from "@/features/order";
import { formatCurrency } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          renderSkeleton()
        ) : orders && orders.length > 0 ? (
          orders.map((order: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.orderCard}
              activeOpacity={0.9}
              onPress={() => toggleCollapse(index)}
            >
              <View style={styles.orderHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Order Date</Text>
                  <Text style={styles.value}>
                    {dayjs(order.order_date).format("DD MMM YYYY, HH:mm")}
                  </Text>

                  <Text style={styles.label}>Total</Text>
                  <Text style={styles.value}>
                    {formatCurrency(order.grand_total)}
                  </Text>

                  <Text style={styles.label}>Status</Text>
                  <Text style={[styles.value, { textTransform: "capitalize" }]}>
                    {order.status}
                  </Text>
                </View>

                <Ionicons
                  name={openedIndex === index ? "chevron-up" : "chevron-down"}
                  size={24}
                  color={Colors.primary}
                />
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
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noOrderCard}>
            <Text style={styles.noOrderText}>No Orders Found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#eee",
  },

  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },

  label: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },

  value: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
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
