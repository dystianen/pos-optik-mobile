import MainLayout from "@/components/layouts/MainLayout";
import CardProduct from "@/components/ui/CardProduct";
import CartIcon from "@/components/ui/CartIcon";
import { useProducts } from "@/features/products";
import { useAuthStore } from "@/stores/useAuthStore";
import { TProduct } from "@/types/product";
import React, { useCallback, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const renderMenu = (items: TProduct[]) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.scrollContainer}
  >
    {items.map((item, index) => (
      <CardProduct key={index} item={item} variant="horizontal" />
    ))}
  </ScrollView>
);

const SkeletonCard = () => <View style={styles.skeletonCard} />;

const SkeletonHorizontalList = ({ count = 3 }: { count?: number }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.scrollContainer}
  >
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </ScrollView>
);

export default function Index() {
  const { profile } = useAuthStore();

  const {
    data: recommendations,
    refetch: refetchRecommendations,
    isLoading: isLoadingRecommendations,
  } = useProducts.getRecommendations(10);

  const {
    data: newEyeWear,
    refetch: refetchNewEyeWear,
    isLoading: isLoadingNewEyeWear,
  } = useProducts.getNewEyeWear(10);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchRecommendations(), refetchNewEyeWear()]);
    } catch (err) {
      console.error("Refresh error:", err);
    } finally {
      setRefreshing(false);
    }
  }, [refetchRecommendations, refetchNewEyeWear]);

  return (
    <MainLayout style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.row}>
          <View style={styles.greeting}>
            <Text style={styles.greetingText}>
              Welcome{profile?.user_name ? `, ${profile?.user_name}` : ""} 👋
            </Text>
            <Text style={styles.subtitle}>Find Your Favorite Glasses!</Text>
          </View>

          <CartIcon />
        </View>

        <View style={styles.carousel}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1592396629010-64d6fc2603be",
            }}
            style={{ width: "100%", height: "100%", borderRadius: 12 }}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.sectionTitle}>Recommendations</Text>
        <View style={styles.menuRow}>
          {isLoadingRecommendations ? (
            <SkeletonHorizontalList />
          ) : recommendations && recommendations.length > 0 ? (
            renderMenu(recommendations)
          ) : (
            <Text style={styles.emptyText}>No recommendations available.</Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>New Eyewear</Text>
        <View style={styles.menuRow}>
          {isLoadingNewEyeWear ? (
            <SkeletonHorizontalList />
          ) : newEyeWear && newEyeWear.length > 0 ? (
            renderMenu(newEyeWear)
          ) : (
            <Text style={styles.emptyText}>No new eyewear found.</Text>
          )}
        </View>
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  greeting: {
    marginTop: 8,
  },
  greetingText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  carousel: {
    height: 160,
    backgroundColor: "#eee",
    borderRadius: 12,
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
  },
  scrollContainer: {
    flexDirection: "row",
    gap: 10,
  },
  menuRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 10,
  },
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
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  card: {
    width: 100,
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
    color: "#888",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skeletonCard: {
    width: 120,
    height: 160,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
});
