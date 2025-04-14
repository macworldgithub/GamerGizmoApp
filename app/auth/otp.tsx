import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Modal } from "react-native";
import { useRouter } from "expo-router";

interface Props {
  visible: boolean;
  onClose: () => void;
  email: string;
}

export default function OtpModal({ visible, onClose, email }: Props) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://backend.gamergizmo.com/auth/verifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "OTP Verified!");
        onClose(); // Close modal
        router.replace("/home"); // Navigate to Home
      } else {
        const errorMsg = Array.isArray(data.message) ? data.message[0] : data.message;
        Alert.alert("Error", errorMsg || "Invalid OTP");
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black/40 justify-center items-center px-5">
        <View className="bg-white p-6 rounded-2xl w-full max-w-md">
          <Text className="text-xl font-bold mb-4 text-center">Enter OTP</Text>
          <TextInput
            className="bg-violet-100 p-3 rounded-lg mb-4 text-center"
            placeholder="Enter OTP"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity
            onPress={handleVerifyOtp}
            className="bg-purple-600 p-4 rounded-full items-center"
            disabled={loading}
          >
            <Text className="text-white font-bold">{loading ? "Verifying..." : "Verify OTP"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} className="mt-4 items-center">
            <Text className="text-gray-500 underline">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
