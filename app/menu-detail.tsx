import MainLayout from "@/components/layouts/MainLayout";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";

const imgThumbnail = [
  "https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da",
  "https://plus.unsplash.com/premium_photo-1668782623937-56d6d64a7f36",
  "https://images.unsplash.com/photo-1512058533999-106ee01bf777",
  "https://images.unsplash.com/photo-1551326844-4df70f78d0e9",
  "https://images.unsplash.com/photo-1540100716001-4b432820e37f",
  "https://images.unsplash.com/photo-1578160112054-954a67602b88",
  "https://images.unsplash.com/photo-1705088293300-8fc8c7be90e2",
];

const width = Dimensions.get("window").width;

export default function ProductDetail() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MainLayout style={styles.container}>
        <View style={styles.carouselWrapper}>
          <Carousel
            width={width - 32}
            height={550}
            autoPlayInterval={2000}
            loop
            snapEnabled
            data={imgThumbnail}
            renderItem={({ item }) => (
              <View style={styles.imageBox}>
                <Image
                  source={{ uri: item, cache: "only-if-cached" }}
                  style={{ width: "100%", height: "100%", borderRadius: 12 }}
                  resizeMode="cover"
                />
              </View>
            )}
          />
        </View>
      </MainLayout>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[250, 400]}
        onChange={handleSheetChanges}
        index={0}
      >
        <BottomSheetView style={styles.sheetContent}>
          <View style={styles.titlePrice}>
            <Text style={styles.productTitle}>Nasi Goreng</Text>
            <Text style={styles.productPrice}>Rp25.000</Text>
          </View>

          <Text style={styles.description}>
            Nasi yang digoreng dengan bumbu bawang putih, kecap manis, telur,
            potongan ayam, dan sayuran (wortel dan kol). Disajikan dengan
            kerupuk dan acar.
          </Text>

          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="cart-outline" size={18} color={"#fff"} />
            <Text style={{ marginLeft: 8, fontWeight: "600", color: "#fff" }}>
              Tambah Menu Ini
            </Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative", // penting
  },
  carouselWrapper: {
    alignItems: "center",
    marginBottom: 16,
    paddingTop: 16,
  },
  imageBox: {
    flex: 1,
    backgroundColor: "#eee",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  sheetContent: {
    flex: 1,
    padding: 16,
  },
  titlePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 8,
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
    marginTop: 16,
    shadowColor: "#f33",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    alignSelf: "flex-start",
  },
});
