import CardProduct from "@/components/ui/CardProduct";
import { Colors } from "@/constants/Colors";
import { useProducts } from "@/features/products";
import { debounce } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const Product = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState<string>("");

  const { data: products, isLoading } = useProducts.getProduct({
    search: query,
  });

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        setQuery(text.trim());
      }, 500),
    []
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>

      <TextInput
        placeholder="Search product..."
        value={search}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.product_id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <CardProduct item={item} variant="grid" />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No products found.</Text>
          }
        />
      )}
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#333",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  row: {
    justifyContent: "space-between",
    gap: 16,
  },
  grid: {
    paddingBottom: 60,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#888",
  },
});
