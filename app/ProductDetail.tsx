import Layout from "@/components/layouts/layout";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const reviews = [
  { id: 1, name: "Andy Senjaya", comment: "Enak Josss.", rating: 4 },
  {
    id: 2,
    name: "Fickry",
    comment: "Mantab, porsinya kurang banyak",
    rating: 4,
  },
  {
    id: 3,
    name: "Fickry",
    comment: "Mantab Pokoknya, agak ke asinan.",
    rating: 3,
  },
  {
    id: 4,
    name: "Fickry",
    comment: "Mantab Pokoknya, agak ke asinan.",
    rating: 3,
  },
  {
    id: 5,
    name: "Fickry",
    comment: "Mantab Pokoknya, agak ke asinan.",
    rating: 3,
  },
];

export default function ProductDetail() {
  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageBox}>
          <Text style={{ color: "#ccc" }}>[Gambar Menu]</Text>
        </View>

        {/* Thumbnail */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.thumbnailRow}>
            {[...Array(10)].map((_, idx) => (
              <View key={idx} style={styles.thumbnail} />
            ))}
          </View>
        </ScrollView>

        {/* Title & Price */}
        <View style={styles.titlePrice}>
          <Text style={styles.productTitle}>Nasi Goreng Spesial</Text>
          <Text style={styles.productPrice}>Rp25.000</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Nasi yang digoreng dengan bumbu bawang putih, kecap manis, telur,
          potongan ayam, dan sayuran (wortel dan kol). Disajikan dengan kerupuk
          dan acar.
        </Text>

        {/* Add Button */}
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="cart-outline" size={18} />
          <Text style={{ marginLeft: 8, fontWeight: "600" }}>
            Tambah Menu Ini
          </Text>
        </TouchableOpacity>

        {/* Reviews */}
        <Text style={styles.reviewTitle}>Reviews</Text>
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewName}>{review.name}</Text>
                <View style={styles.starContainer}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Ionicons
                      key={idx}
                      name={idx < review.rating ? "star" : "star-outline"}
                      size={14}
                      color="#facc15"
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          </View>
        ))}

        {/* Load More */}
        <TouchableOpacity style={styles.loadMore}>
          <Text style={{ color: "#aaa" }}>Load More...</Text>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    height: 180,
    backgroundColor: "#eee",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  thumbnailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 16,
  },
  thumbnail: {
    width: 75,
    height: 60,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  titlePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  productPrice: {
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    marginVertical: 10,
    fontSize: 14,
    color: "#555",
  },
  addButton: {
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 24,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  reviewTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  reviewCard: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    alignItems: "flex-start",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewName: {
    fontWeight: "600",
    marginBottom: 2,
  },
  reviewComment: {
    fontSize: 13,
    color: "#555",
  },
  starContainer: {
    flexDirection: "row",
    gap: 2,
  },
  loadMore: {
    alignItems: "center",
    marginVertical: 16,
  },
});
