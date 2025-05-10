import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import axios from "axios";
import { useDispatch } from "react-redux";
import { InitializeUserData } from "../../store/slice/loginSlice";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RegisterScreen from "./create";

type Props = {
  onClose: () => void;
};

const Login = ({ onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

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
    <View className="flex-1 bg-white justify-center px-5">
      <TouchableOpacity onPress={onClose} className="absolute top-10 left-5">
        <Text className="text-2xl">✕</Text>
      </TouchableOpacity>

      <Text className="text-2xl font-bold text-center mb-6">Login</Text>

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
        placeholder="Email or Username"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className="bg-fuchsia-500 rounded-lg py-3 mb-5 items-center"
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-bold">Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowRegisterModal(true)}>
        <Text className="text-center text-fuchsia-500">
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showRegisterModal}
        onRequestClose={() => setShowRegisterModal(false)}
        animationType="slide"
      >
        <RegisterScreen onClose={() => setShowRegisterModal(false)} />
      </Modal>
    </View>
  );
};

export default Login;
