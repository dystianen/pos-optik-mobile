import MainLayout from "@/components/layouts/MainLayout";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const reviews = [
  {
    id: 1,
    name: "Andy Senjaya",
    comment: "Enak Josss.",
    rating: 4,
    img: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    id: 2,
    name: "Fickry",
    comment: "Mantab, porsinya kurang banyak",
    rating: 4,
    img: "https://randomuser.me/api/portraits/women/43.jpg",
  },
  {
    id: 3,
    name: "Roby",
    comment: "Mantab Pokoknya, agak ke asinan.",
    rating: 3,
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 4,
    name: "Citra",
    comment: "Mantab Pokoknya, agak ke asinan.",
    rating: 3,
    img: "https://randomuser.me/api/portraits/women/46.jpg",
  },
  {
    id: 5,
    name: "Zulpan",
    comment: "Mantab Pokoknya, agak ke asinan.",
    rating: 3,
    img: "https://randomuser.me/api/portraits/men/47.jpg",
  },
];

const imgThumbnail = [
  "https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da",
  "https://plus.unsplash.com/premium_photo-1668782623937-56d6d64a7f36",
  "https://images.unsplash.com/photo-1512058533999-106ee01bf777",
  "https://images.unsplash.com/photo-1551326844-4df70f78d0e9",
  "https://images.unsplash.com/photo-1540100716001-4b432820e37f",
  "https://images.unsplash.com/photo-1578160112054-954a67602b88",
  "https://images.unsplash.com/photo-1705088293300-8fc8c7be90e2",
];

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(imgThumbnail[0]);

  return (
    <MainLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageBox}>
          <Image
            source={{ uri: selectedImage }}
            style={{ width: "100%", height: "100%", borderRadius: 12 }}
            resizeMode="cover"
          />
        </View>

        {/* Thumbnail */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.thumbnailRow}>
            {imgThumbnail.map((thumb, idx) => (
              <TouchableWithoutFeedback
                key={idx}
                onPress={() => setSelectedImage(thumb)}
              >
                <Image
                  source={{ uri: thumb }}
                  style={[
                    styles.thumbnail,
                    selectedImage === thumb && styles.thumbnailActive,
                  ]}
                  resizeMode="cover"
                />
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>

        {/* Title & Price */}
        <View style={styles.titlePrice}>
          <Text style={styles.productTitle}>Nasi Goreng</Text>
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
          <Ionicons name="cart-outline" size={18} color={"#fff"} />
          <Text style={{ marginLeft: 8, fontWeight: "600", color: "#fff" }}>
            Tambah Menu Ini
          </Text>
        </TouchableOpacity>

        {/* Reviews */}
        <Text style={styles.reviewTitle}>Reviews</Text>
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.avatar}>
              <Image
                source={{
                  uri: review.img,
                }}
                style={{ width: "100%", height: "100%", borderRadius: 12 }}
                resizeMode="cover"
              />
            </View>
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
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    height: 200,
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
  thumbnailActive: {
    borderWidth: 2,
    borderColor: "#f33",
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
    backgroundColor: "#f33",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 24,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    marginBottom: 20,
    shadowColor: "#f33",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
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
