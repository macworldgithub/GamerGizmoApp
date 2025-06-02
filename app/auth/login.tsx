import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Platform,
} from "react-native";
import axios from "axios";
import { useDispatch } from "react-redux";
import { InitializeUserData } from "../../store/slice/loginSlice";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RegisterScreen from "./create";
import ForgotPasswordModal from "./ForgotPasswordModal";
import ResetPasswordModal from "./ResetPasswordModal";
import MaxLimitModal from "./MaxLimitModal";
import { API_BASE_URL } from "@/utils/config";
import { getLocation } from "@/utils/getLocation";

type Props = {
  onClose: () => void;
};

const Login = ({ onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [maxLimitModalVisible, setMaxLimitModalVisible] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [region, setRegion] = useState<string | null>(null);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchRegion = async () => {
      const loc = await getLocation();
      setRegion(loc);
    };
    fetchRegion();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill in all fields");

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/signin`,
        {
          name: email,
          password,
          platform: Platform.OS,
          region: region || "Unknown",
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
        // alert("Login successful!");
        router.replace("/(tabs)/home");
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error: any) {
      const data = error.response?.data;
      console.log(data || error.message);

      if (
        typeof data?.message === "string" &&
        data.message.toLowerCase().includes("max account logins") &&
        Array.isArray(data?.accounts)
      ) {
        setSessions(
          data.accounts.map((acc: any) => ({
            platform: acc.platform,
            timestamp: acc.created_at,
            location: acc.region || "Unknown",
            token: acc.token,
          }))
        );
        setMaxLimitModalVisible(true);
      } else {
        alert(data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };



  const handleLogoutSession = async (index: number) => {
    const session = sessions[index];
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/logoutOtherAccounts`,
        //@ts-ignore
        { token: session.token }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Confirmation sent to registered email");
        const updatedSessions = [...sessions];
        updatedSessions.splice(index, 1);
        setSessions(updatedSessions);
      } else {
        alert("Logout failed");
      }
    } catch (err) {
      alert("Error logging out session");
      console.error(err);
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
        disabled={loading || !region}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-bold">Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowForgotModal(true)} className="mb-4">
        <Text className="text-center text-blue-600 font-semibold">Forgot Password?</Text>
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

      <ForgotPasswordModal
        visible={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        onOTPSent={(email) => {
          setResetEmail(email);
          setShowForgotModal(false);
          setShowResetModal(true);
        }}
      />

      {/* Reset Password Modal */}
      <ResetPasswordModal
        visible={showResetModal}
        onClose={() => setShowResetModal(false)}
        email={resetEmail}
      />

      <MaxLimitModal
        visible={maxLimitModalVisible}
        onClose={() => setMaxLimitModalVisible(false)}
        sessions={sessions}
        handleLogoutSession={handleLogoutSession}
      />

    </View>
  );
};

export default Login;