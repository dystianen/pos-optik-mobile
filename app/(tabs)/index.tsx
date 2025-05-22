import CardProduct from "@/components/CardProduct";
import Layout from "@/components/layouts/layout";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const foodDummy = ["Nasi Goreng", "Martabak", "Es Cendol", "Nasi Uduk"];
const newMenu = ["Bakso Sniper", "Tahu Pidis", "Es Matahari", "Nasi Kuning"];
const bestMenu = ["Ayam Geprek", "Sate Padang", "Roti Bakar", "Mie Aceh"];

const renderMenu = (items: string[]) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.scrollContainer}
  >
    {items.map((item, index) => (
      <CardProduct key={index} name={item} img={""} />
    ))}
  </ScrollView>
);

export default function HomeScreen() {
  return (
    <Layout withSearch>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Welcome, Dystian 👋</Text>
          <Text style={styles.subtitle}>Temukan Makanan Favoritmu!</Text>
        </View>

        <View style={styles.carousel}>
          <Text style={{ color: "#ccc", textAlign: "center" }}>
            [ Carousel Placeholder ]
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Favorit Warung Kecil</Text>
        <View style={styles.menuRow}>{renderMenu(foodDummy)}</View>

        <Text style={styles.sectionTitle}>Menu Baru</Text>
        <View style={styles.menuRow}>{renderMenu(newMenu)}</View>

        <Text style={styles.sectionTitle}>Menu Terenak</Text>
        <View style={styles.menuRow}>{renderMenu(bestMenu)}</View>
        <Text style={styles.sectionTitle}>Menu Terenak</Text>
        <View style={styles.menuRow}>{renderMenu(bestMenu)}</View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  greeting: {
    marginTop: 16,
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
});
