import MainLayout from "@/components/layouts/MainLayout";
import { Colors } from "@/constants/Colors";
import { useCart } from "@/features/cart";
import { useProducts } from "@/features/products";
import { getAccessToken } from "@/utils/auth";
import { embedImage } from "@/utils/embedImage";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const idData = id as string;

  const {
    data: detail,
    isLoading,
    isError,
  } = useProducts.getProductDetail(idData);
  const { mutate: addToCart, isPending: isLoadinAddToCart } =
    useCart.addToCart();

  const handleAddToCart = useCallback(async () => {
    const isLoggedIn = await getAccessToken();

    if (isLoggedIn && detail) {
      const payload = {
        product_id: detail.product_id,
        quantity: 1,
        price: detail.product_price,
        proof_of_payment: null,
      };
      addToCart(payload);
    } else {
      router.push("/login");
    }
  }, [detail]);

  if (isLoading) {
    return (
      <MainLayout>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </MainLayout>
    );
  }

  if (!detail || isError) {
    return (
      <MainLayout>
        <View style={styles.center}>
          <Text>Data produk tidak ditemukan.</Text>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoContainer}>
          <Image
            key={idData}
            source={{ uri: embedImage(detail.product_image_url ?? "") }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <Text style={styles.title}>{detail.product_name}</Text>
          <Text style={styles.price}>
            Rp {detail.product_price.toLocaleString()}
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Deskripsi Produk</Text>
            <DetailItem label="Model" value={detail.model} />
            <DetailItem label="Material" value={detail.material} />
            <DetailItem label="Duration" value={detail.duration} />
            <DetailItem label="Base Curve" value={detail.base_curve} />
            <DetailItem label="Diameter" value={detail.diameter} />
            <DetailItem label="Power Range" value={detail.power_range} />
            <DetailItem label="Water Content" value={detail.water_content} />
            <DetailItem label="UV Protection" value={detail.uv_protection} />
            <DetailItem label="Color" value={detail.color} />
            <DetailItem label="Coating" value={detail.coating} />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.addButton, isLoadinAddToCart && { opacity: 0.6 }]}
        onPress={handleAddToCart}
        disabled={isLoadinAddToCart}
      >
        {isLoadinAddToCart ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <Ionicons name="cart-outline" size={20} color={"#fff"} />
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </>
        )}
      </TouchableOpacity>
    </MainLayout>
  );
}

function DetailItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 70, // space for floating button
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    backgroundColor: "#eee",
    marginBottom: 16,
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primary,
    marginVertical: 8,
  },
  section: {
    marginTop: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    elevation: 3,
  },
  addButtonText: {
    marginLeft: 8,
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
