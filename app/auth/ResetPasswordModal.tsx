import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

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
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (resendDisabled && countdown === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, resendDisabled]);

  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      Alert.alert("Error", "Please enter OTP and new password.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://backend.gamergizmo.com/auth/resetPasswordOtp",
        {
          email: email.trim(),
          otp: otp.trim(),
          newPassword: newPassword.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Success", "Password has been reset successfully.", [
          {
            text: "OK",
            onPress: () => {
              onClose();
              router.replace("/login");
            },
          },
        ]);
      } else {
        Alert.alert("Error", response.data?.message || "Reset failed.");
      }
    } catch (error: any) {
      console.error("Reset error:", error.response?.data);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendDisabled) return;

    setResendDisabled(true);
    setCountdown(10);
    try {
      const response = await axios.post(
        "https://backend.gamergizmo.com/auth/forgotPassword",
        { email: email.trim() },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Success", "OTP resent to your email.");
      } else {
        Alert.alert("Error", "Failed to resend OTP.");
      }
    } catch (error: any) {
      console.error("Resend error:", error.response?.data);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to resend OTP."
      );
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleResendOtp} disabled={resendDisabled}>
          <Text
            style={[
              styles.resendText,
              resendDisabled && { opacity: 0.5 },
            ]}
          >
            {resendDisabled ? `Resend in ${countdown}s...` : "Resend OTP"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ResetPasswordModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
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
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelBtn: {
    marginTop: 20,
    alignItems: "center",
  },
  cancelText: {
    color: "red",
    fontSize: 16,
  },
  resendText: {
    color: "#007bff",
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
