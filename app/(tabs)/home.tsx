import MainLayout from "@/components/layouts/MainLayout";
import CardProduct from "@/components/ui/CardProduct";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const foodDummy = [
  {
    name: "Nasi Goreng",
    img: "https://images.unsplash.com/photo-1680674774705-90b4904b3a7f",
  },
  {
    name: "Martabak",
    img: "https://images.unsplash.com/photo-1706922122195-a1d670210618",
  },
  {
    name: "Ayam Sambal Matah",
    img: "https://images.unsplash.com/photo-1630910104722-21fe97230ef9",
  },
  {
    name: "Ayam Bakar",
    img: "https://images.unsplash.com/photo-1666239308345-c4c12ef3e177",
  },
];

const newMenu = [
  {
    name: "Bakso Sniper",
    img: "https://images.unsplash.com/photo-1687426163461-1eeb49c83584",
  },
  {
    name: "Tahu Genjrot",
    img: "https://images.unsplash.com/photo-1680173073730-852e0ec93bec",
  },
  {
    name: "Nasi Kuning",
    img: "https://plus.unsplash.com/premium_photo-1698843272807-5889323c0362",
  },
  {
    name: "Gedang Goreng",
    img: "https://images.unsplash.com/photo-1664993090321-b2caff794431",
  },
];

const bestMenu = [
  {
    name: "Ayam Geprek",
    img: "https://images.unsplash.com/photo-1674483950016-8ece0632914e",
  },
  {
    name: "Sate Taichan",
    img: "https://images.unsplash.com/photo-1562607635-4608ff48a859",
  },
  {
    name: "Roti Bakar",
    img: "https://images.unsplash.com/photo-1620921575116-fb8902865f81",
  },
  {
    name: "Mie Aceh",
    img: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841",
  },
];

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

const renderMenu = (items: { name: string; img: string }[]) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.scrollContainer}
  >
    {items.map((item, index) => (
      <CardProduct key={index} name={item.name} img={item.img} />
    ))}
  </ScrollView>
);

export default function HomeScreen() {
  return (
    <MainLayout style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Welcome, Dystian 👋</Text>
          <Text style={styles.subtitle}>Temukan Makanan Favoritmu!</Text>
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

        <Text style={styles.sectionTitle}>Favorit Waroeng Kecil</Text>
        <View style={styles.menuRow}>{renderMenu(foodDummy)}</View>

        <Text style={styles.sectionTitle}>Menu Baru</Text>
        <View style={styles.menuRow}>{renderMenu(newMenu)}</View>

        <Text style={styles.sectionTitle}>Menu Terenak</Text>
        <View style={styles.menuRow}>{renderMenu(bestMenu)}</View>

        {/* Reviews */}
        <Text style={styles.sectionTitle}>Ulasan Menu Kami</Text>
        <View style={styles.reviewContainer}>
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
        </View>

        {/* Load More */}
        <TouchableOpacity style={styles.loadMore}>
          <Text style={{ color: "#aaa" }}>Load More...</Text>
        </TouchableOpacity>
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  greeting: {
    marginTop: 8,
  },
  greetingText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 14,
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
    fontSize: 14,
    marginTop: 20,
  },
  scrollContainer: {
    flexDirection: "row",
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
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 4,
  },
  reviewContainer: {
    marginTop: 10,
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
