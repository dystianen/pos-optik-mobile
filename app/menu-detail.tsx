import MainLayout from "@/components/layouts/MainLayout";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef } from "react";
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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    // Present the modal immediately without button
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <MainLayout style={styles.container}>
      {/* Carousel Container */}
      <View style={styles.carouselWrapper}>
        <Carousel
          width={width - 32}
          height={600}
          autoPlayInterval={2000}
          loop
          snapEnabled
          data={imgThumbnail}
          renderItem={({ item }) => (
            <View style={styles.imageBox}>
              <Image
                source={{ uri: item }}
                style={{ width: "100%", height: "100%", borderRadius: 12 }}
                resizeMode="cover"
              />
            </View>
          )}
        />
      </View>

      <GestureHandlerRootView style={styles.sheetContainer}>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
            snapPoints={["40%", "60%"]}
            enableDismissOnClose={false}
          >
            <BottomSheetView style={styles.sheetContent}>
              {/* Title & Price */}
              <View style={styles.titlePrice}>
                <Text style={styles.productTitle}>Nasi Goreng</Text>
                <Text style={styles.productPrice}>Rp25.000</Text>
              </View>

              {/* Description */}
              <Text style={styles.description}>
                Nasi yang digoreng dengan bumbu bawang putih, kecap manis,
                telur, potongan ayam, dan sayuran (wortel dan kol). Disajikan
                dengan kerupuk dan acar.
              </Text>

              {/* Add Button */}
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="cart-outline" size={18} color={"#fff"} />
                <Text
                  style={{ marginLeft: 8, fontWeight: "600", color: "#fff" }}
                >
                  Tambah Menu Ini
                </Text>
              </TouchableOpacity>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  carouselWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },
  sheetContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "flex-end", // penting agar sheet di bagian bawah
    backgroundColor: "transparent",
  },
  sheetContent: {
    flex: 1,
    alignItems: "center",
  },
  imageBox: {
    flex: 1,
    backgroundColor: "#eee",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  titlePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
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
    paddingHorizontal: 16,
    textAlign: "center",
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
  },
});
