
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";

interface Props {
  visible: boolean;
  onClose: () => void;
  onOTPSent: (email: string) => void;
}

const ForgotPasswordModal: React.FC<Props> = ({ visible, onClose, onOTPSent }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/sendForgetPasswordOtp`,
       {
        email: email.trim(),
      });

      if (res.status === 200 || res.status === 201) {
        Alert.alert("OTP Sent", "Please check your email for the OTP.");
        onOTPSent(email.trim());
      } else {
        Alert.alert("Error", res.data?.message || "Failed to send OTP.");
      }
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent={false} animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-center px-6 bg-white">
        <Text className="text-3xl font-bold text-center text-fuchsia-500 mb-3">
          Forgot Password?
        </Text>
        <Text className="text-gray-600 text-center mb-6">
          Enter your email below and we’ll send you an OTP to reset your password.
        </Text>

        <Text className="text-fuchsia-500 font-medium mb-1">Email Address</Text>
        <TextInput
          className="border-2 border-fuchsia-500 rounded-lg p-3 mb-6"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          disabled={loading}
          onPress={handleSendOTP}
          className="bg-gray-300 rounded-xl py-4 items-center mb-4"
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text className="text-gray-600 font-bold">SEND OTP TO EMAIL</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose}>
          <Text className="text-center text-fuchsia-600 font-semibold">Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ForgotPasswordModal;
