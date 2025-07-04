import AuthLayout from "@/components/layouts/AuthLayout";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/features/auth";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
  const [showDateDob, setShowDateDob] = useState(false);
  const [showDateLastCheckup, setShowDateLastCheckup] = useState(false);

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
          Alert.alert("Error", err.message || "Registration failed");
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
          placeholder="Fullname"
          placeholderTextColor="#999"
          value={form.customer_name}
          onChangeText={(text) => handleChange("customer_name", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          autoCapitalize="none"
          keyboardType="email-address"
          value={form.customer_email}
          onChangeText={(text) => handleChange("customer_email", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={form.customer_password}
          onChangeText={(text) => handleChange("customer_password", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={form.customer_phone}
          onChangeText={(text) => handleChange("customer_phone", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Occupation"
          placeholderTextColor="#999"
          value={form.customer_occupation}
          onChangeText={(text) => handleChange("customer_occupation", text)}
        />

        <TouchableOpacity
          onPress={() => setShowDateDob(true)}
          style={styles.input}
        >
          <Text style={{ color: form.customer_dob ? "#000" : "#999" }}>
            {form.customer_dob || "Date of Birth"}
          </Text>
        </TouchableOpacity>
        {showDateDob && (
          <DateTimePicker
            value={form.customer_dob ? new Date(form.customer_dob) : new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowDateDob(false);
              if (selectedDate) {
                const iso = selectedDate.toISOString().split("T")[0]; // format YYYY-MM-DD
                handleChange("customer_dob", iso);
              }
            }}
          />
        )}

        <View style={styles.pickerWrapper}>
          <Picker
            placeholder="Gender"
            selectedValue={form.customer_gender}
            onValueChange={(value) => handleChange("customer_gender", value)}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>

        {/* Preferences */}
        <Text style={styles.sectionTitle}>Preferensi</Text>
        <TextInput
          style={styles.input}
          placeholder="Favorit Color"
          placeholderTextColor="#999"
          value={form.customer_preferences.color}
          onChangeText={(text) =>
            handleChange("customer_preferences.color", text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Material"
          placeholderTextColor="#999"
          value={form.customer_preferences.material}
          onChangeText={(text) =>
            handleChange("customer_preferences.material", text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Frame Style"
          placeholderTextColor="#999"
          value={form.customer_preferences.frame_style}
          onChangeText={(text) =>
            handleChange("customer_preferences.frame_style", text)
          }
        />

        {/* Eye History */}
        <TextInput
          style={styles.input}
          placeholder="Eye Conditions"
          placeholderTextColor="#999"
          value={form.customer_eye_history.condition}
          onChangeText={(text) =>
            handleChange("customer_eye_history.condition", text)
          }
        />

        <TouchableOpacity
          onPress={() => setShowDateLastCheckup(true)}
          style={styles.input}
        >
          <Text
            style={{
              color: form.customer_eye_history.last_checkup ? "#000" : "#999",
            }}
          >
            {form.customer_eye_history.last_checkup || "Last Checkup"}
          </Text>
        </TouchableOpacity>
        {showDateLastCheckup && (
          <DateTimePicker
            value={
              form.customer_eye_history.last_checkup
                ? new Date(form.customer_eye_history.last_checkup)
                : new Date()
            }
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowDateLastCheckup(false);
              if (selectedDate) {
                const iso = selectedDate.toISOString().split("T")[0]; // format YYYY-MM-DD
                handleChange("customer_eye_history.last_checkup", iso);
              }
            }}
          />
        )}

        <Text style={styles.sectionLabel}>Left Eye</Text>
        <TextInput
          style={styles.input}
          placeholder="Axis"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={form.customer_eye_history.left_eye.axis}
          onChangeText={(text) =>
            handleChange("customer_eye_history.left_eye.axis", text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Sphere"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={form.customer_eye_history.left_eye.sphere}
          onChangeText={(text) =>
            handleChange("customer_eye_history.left_eye.sphere", text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Cylinder"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={form.customer_eye_history.left_eye.cylinder}
          onChangeText={(text) =>
            handleChange("customer_eye_history.left_eye.cylinder", text)
          }
        />

        <Text style={styles.sectionLabel}>Right Eye</Text>
        <TextInput
          style={styles.input}
          placeholder="Axis"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={form.customer_eye_history.right_eye.axis}
          onChangeText={(text) =>
            handleChange("customer_eye_history.right_eye.axis", text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Sphere"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={form.customer_eye_history.right_eye.sphere}
          onChangeText={(text) =>
            handleChange("customer_eye_history.right_eye.sphere", text)
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Cylinder"
          placeholderTextColor="#999"
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

        <View style={styles.redirectContainer}>
          <Text style={styles.redirectText}>Have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.redirectLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 16,
    alignSelf: "center",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 8,
    color: "#000",
    marginBottom: 16,
  },
});

export default Register;
