import AuthLayout from "@/components/layouts/AuthLayout";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validasi Gagal", "Email dan password harus diisi.");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert("Login Berhasil", `Selamat datang, ${email}`);
      router.push({
        pathname: "/(tabs)/home",
      });
      // TODO: Simpan token / redirect ke halaman utama
    } catch (err) {
      Alert.alert("Gagal", "Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Masuk ke Akun</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 32,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Login;
