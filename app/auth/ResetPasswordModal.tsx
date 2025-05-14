import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { API_BASE_URL } from "@/utils/config";

interface ResetPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  email: string;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  visible,
  onClose,
  email,
}) => {
  const router = useRouter();
  const [otpDigits, setOtpDigits] = useState<string[]>(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    // Autofocus first box
    if (visible) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 300);
    }
  }, [visible]);

  const handleOtpChange = (text: string, index: number) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otpDigits];
      newOtp[index] = text;
      setOtpDigits(newOtp);
      if (text && index < otpDigits.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleResetPassword = async () => {
    const otp = otpDigits.join("").trim();

    if (!otp || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/resetPasswordOtp`,
        {
          email: email.trim(),
          otp,
          password: newPassword.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Password updated", "Your password has been reset successfully.", [
          {
            text: "OK",
            onPress: () => {
              onClose();
              router.push("/login");
            },
          },
        ]);
      } else {
        Alert.alert("Error", response.data?.message || "Reset failed.");
      }
    } catch (error: any) {
      console.error("Reset error:", error.response?.data);
      Alert.alert("Error", error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View className="flex-1 bg-white justify-center px-5">
        <Text className="text-xl font-bold text-center text-fuchsia-600 mb-2">
          Enter OTP & Reset Password
        </Text>
        <Text className="text-gray-500 text-center mb-5">
          Enter the OTP sent to your email and reset your password.
        </Text>

        <View className="flex-row justify-center space-x-2 mb-6">
          {otpDigits.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              className="border-2 border-fuchsia-400 text-center text-xl rounded-md w-12 h-12"
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
            />
          ))}
        </View>

        <Text className="mb-1 text-sm font-medium">New Password</Text>
        <TextInput
          className="border-2 border-fuchsia-400 rounded-md px-4 py-2 mb-4"
          secureTextEntry
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Text className="mb-1 text-sm font-medium">Confirm Password</Text>
        <TextInput
          className="border-2 border-fuchsia-400 rounded-md px-4 py-2 mb-6"
          secureTextEntry
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#d946ef" />
        ) : (
          <TouchableOpacity
            className="bg-fuchsia-500 py-4 rounded-xl"
            onPress={handleResetPassword}
          >
            <Text className="text-white text-center font-bold uppercase">
              Reset Password
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

export default ResetPasswordModal;
