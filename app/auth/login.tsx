import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import axios from "axios";
import { useDispatch } from "react-redux";
import { InitializeUserData } from "../../store/slice/loginSlice";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RegisterScreen from "./create";
import ResetPasswordModal from "./ResetPasswordModal";

type Props = {
  onClose: () => void;
};

const Login = ({ onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill in all fields");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://backend.gamergizmo.com/auth/signin",
        { name: email, password, platform: "mobile", region: "PK" }
      );

      if (response.status === 200 || response.status === 201) {
        const user = response.data;

        if (!user.id) {
          alert("User ID is missing.");
          return;
        }

        await AsyncStorage.setItem("user", JSON.stringify(user));
        //await AsyncStorage.setItem("token", user?.token || "user.token");

        dispatch(InitializeUserData(user));
        alert("Login successful!");
        console.log(
          response.data.token,
          "12345zwswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswswsws"
        );
        await AsyncStorage.setItem("token", user?.token);

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

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email or username first.");
      return;
    }
    try {
      const response = await axios.post(
        "https://backend.gamergizmo.com/auth/sendForgetPasswordOtp",
        { email }
      );

      if (response.status === 200 || response.status === 201) {
        setShowResetModal(true);
      } else {
        Alert.alert("Error", response.data?.message || "Failed to send OTP.");
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onClose}
        style={{ alignSelf: "flex-start", marginBottom: 16 }}
      >
        <Text style={{ fontSize: 24 }}>✕</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Login</Text>

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

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.link}>Forgot Password</Text>
      </TouchableOpacity>

      {otpMessage ? <Text style={styles.success}>{otpMessage}</Text> : null}

      <TouchableOpacity onPress={() => setShowRegisterModal(true)}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>

      <Modal
        visible={showRegisterModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowRegisterModal(false)}
      >
        <RegisterScreen onClose={() => setShowRegisterModal(false)} />
      </Modal>

      <ResetPasswordModal
        visible={showResetModal}
        email={email}
        onClose={() => setShowResetModal(false)}
      />
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
  link: { color: "#DC39FC", textAlign: "center", marginBottom: 5 },
  success: {
    textAlign: "center",
    color: "green",
    marginTop: 5,
    marginBottom: 10,
  },
});

export default Login;
