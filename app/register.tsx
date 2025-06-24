import AuthLayout from "@/components/layouts/AuthLayout";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/features/auth";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Register = () => {
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_password: "",
    customer_phone: "",
    customer_dob: "",
    customer_gender: "",
    customer_occupation: "",
    customer_preferences: {
      color: "",
      material: "",
      frame_style: "",
    },
    customer_eye_history: {
      left_eye: { axis: "", sphere: "", cylinder: "" },
      right_eye: { axis: "", sphere: "", cylinder: "" },
      condition: "",
      last_checkup: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const { mutate: submitRegister } = useAuth.register();

  const handleChange = (path: string, value: string) => {
    const keys = path.split(".");
    setForm((prev: any) => {
      const newForm = { ...prev };
      let current = newForm;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newForm;
    });
  };

  const handleSubmit = () => {
    setLoading(true);

    submitRegister(
      {
        ...form,
        customer_eye_history: JSON.stringify(form.customer_eye_history),
        customer_preferences: JSON.stringify(form.customer_preferences),
      },
      {
        onSuccess: () => {
          Alert.alert("Success", "Registration successfully!");
          setLoading(false);
          router.replace("/login");
        },
        onError: (err) => {
          Alert.alert("Gagal", err.message || "Registration failed");
          setLoading(false);
        },
      }
    );
  };

  return (
    <AuthLayout>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Register</Text>

        <TextInput
          style={styles.input}
          placeholder="Nama Lengkap"
          value={form.customer_name}
          onChangeText={(text) => handleChange("customer_name", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={form.customer_email}
          onChangeText={(text) => handleChange("customer_email", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={form.customer_password}
          onChangeText={(text) => handleChange("customer_password", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="No. HP"
          keyboardType="phone-pad"
          value={form.customer_phone}
          onChangeText={(text) => handleChange("customer_phone", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Tanggal Lahir (e.g., 2000-03-12)"
          value={form.customer_dob}
          onChangeText={(text) => handleChange("customer_dob", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Jenis Kelamin (Male/Female)"
          value={form.customer_gender}
          onChangeText={(text) => handleChange("customer_gender", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Pekerjaan"
          value={form.customer_occupation}
          onChangeText={(text) => handleChange("customer_occupation", text)}
        />

        {/* Preferences */}
        <Text style={styles.sectionTitle}>Preferensi</Text>
        <TextInput
          style={styles.input}
          placeholder="Warna Favorit"
          value={form.customer_preferences.color}
          onChangeText={(text) =>
            handleChange("customer_preferences.color", text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Material"
          value={form.customer_preferences.material}
          onChangeText={(text) =>
            handleChange("customer_preferences.material", text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Gaya Frame"
          value={form.customer_preferences.frame_style}
          onChangeText={(text) =>
            handleChange("customer_preferences.frame_style", text)
          }
        />

        {/* Eye History */}
        <Text style={styles.sectionTitle}>Riwayat Mata</Text>
        <TextInput
          style={styles.input}
          placeholder="Kondisi Mata"
          value={form.customer_eye_history.condition}
          onChangeText={(text) =>
            handleChange("customer_eye_history.condition", text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Terakhir Periksa (e.g., 2024-03-11)"
          value={form.customer_eye_history.last_checkup}
          onChangeText={(text) =>
            handleChange("customer_eye_history.last_checkup", text)
          }
        />
        <Text style={styles.sectionLabel}>Mata Kiri</Text>
        <TextInput
          style={styles.input}
          placeholder="Axis"
          keyboardType="numeric"
          value={form.customer_eye_history.left_eye.axis}
          onChangeText={(text) =>
            handleChange("customer_eye_history.left_eye.axis", text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Sphere"
          keyboardType="numeric"
          value={form.customer_eye_history.left_eye.sphere}
          onChangeText={(text) =>
            handleChange("customer_eye_history.left_eye.sphere", text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Cylinder"
          keyboardType="numeric"
          value={form.customer_eye_history.left_eye.cylinder}
          onChangeText={(text) =>
            handleChange("customer_eye_history.left_eye.cylinder", text)
          }
        />

        <Text style={styles.sectionLabel}>Mata Kanan</Text>
        <TextInput
          style={styles.input}
          placeholder="Axis"
          keyboardType="numeric"
          value={form.customer_eye_history.right_eye.axis}
          onChangeText={(text) =>
            handleChange("customer_eye_history.right_eye.axis", text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Sphere"
          keyboardType="numeric"
          value={form.customer_eye_history.right_eye.sphere}
          onChangeText={(text) =>
            handleChange("customer_eye_history.right_eye.sphere", text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Cylinder"
          keyboardType="numeric"
          value={form.customer_eye_history.right_eye.cylinder}
          onChangeText={(text) =>
            handleChange("customer_eye_history.right_eye.cylinder", text)
          }
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 16,
    alignSelf: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
  },
  sectionLabel: {
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
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

export default Register;
