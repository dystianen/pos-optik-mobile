import AuthLayout from "@/components/layouts/AuthLayout";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/features/auth";
import { useAuthStore } from "@/stores/useAuthStore";
import { decodedToken, setAccessToken } from "@/utils/auth";
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
  const { setProfile } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: submitLogin, isPending } = useAuth.login();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validasi Gagal", "Email dan password harus diisi.");
      return;
    }

    const payload = {
      customer_email: email,
      customer_password: password,
    };

    submitLogin(payload, {
      onSuccess: async (res) => {
        setAccessToken(res.data.token);
        const decoded = await decodedToken(res.data.token);
        setProfile(decoded);
        router.replace("/(tabs)/home");
      },
      onError: (err) => {
        Alert.alert(err.message);
      },
    });
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
          style={[styles.button, isPending && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isPending}
        >
          {isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={styles.redirectContainer}>
          <Text style={styles.redirectText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.replace("/register")}>
            <Text style={styles.redirectLink}>Register</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: Colors.primary,
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
  redirectContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  redirectText: {
    fontSize: 14,
    color: "#666",
  },
  redirectLink: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 4,
    fontWeight: "bold",
  },
});

export default Login;
