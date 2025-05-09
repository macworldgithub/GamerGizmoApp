import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from "react-native";
import axios from "axios";
import { useDispatch } from "react-redux";
import { InitializeUserData } from "../../store/slice/loginSlice";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ imported

import RegisterScreen from "./create";
type Props = {
  onClose: () => void;
};
const Login = ({ onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill in all fields");

    setLoading(true);
    try {
      const response = await axios.post(
        "https://backend.gamergizmo.com/auth/signin",
        {
          name: email,
          password,
          platform: "mobile",
          region: "PK",
        }
      );

      if (response.status === 200 || response.status === 201) {
        // ✅ Save user and token to AsyncStorage
        const user = response.data;

        await AsyncStorage.setItem(
          "user",
          JSON.stringify({
            name: user?.name || email,
            createdAt: user?.createdAt,
          })
        );

        await AsyncStorage.setItem("token", user?.token || "");
        await AsyncStorage.setItem("userId", String(user?.id));

        console.log(user?.id, "123");

        dispatch(InitializeUserData(user));
        alert("Login successful!");
        router.replace("/(tabs)/home");
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} className="self-start mb-4">
        <Text className="text-2xl ">✕</Text>
      </TouchableOpacity>
      <Text style={styles.heading} className="text-center">
        Login
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email or Username"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowRegisterModal(true)}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
      <Modal
        visible={showRegisterModal}
        onDismiss={() => setShowRegisterModal(false)}
        animationType="slide"
        transparent={false}
      >
        <RegisterScreen onClose={() => setShowRegisterModal(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#DC39FC",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  link: { color: "#DC39FC", textAlign: "center" },
});

export default Login;
