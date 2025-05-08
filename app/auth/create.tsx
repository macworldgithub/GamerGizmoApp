
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import OtpModal from "./otp";

type Props = {
  onClose: () => void
}
export default function RegisterScreen({ onClose }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !username ||
      !gender ||
      !email ||
      !password ||
      !confirmPassword ||
      !acceptTerms
    ) {
      Alert.alert("Error", "All fields are required and Terms must be accepted.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("https://backend.gamergizmo.com/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          username: username.substring(0, 20),
          gender,
          dob: dob.toISOString().split("T")[0],
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Account created successfully!");
        setRegisteredEmail(email);
        setShowOtpModal(true);
      } else {
        const errorMessage = Array.isArray(data?.message)
          ? data.message[0]
          : data?.message || "Something went wrong";
        Alert.alert("Error", errorMessage);
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 gap-6  bg-white px-5 py-6">
      <TouchableOpacity onPress={onClose} className="self-start mb-4">
        <Text className="text-2xl ">✕</Text>
      </TouchableOpacity>
      <Text className="text-2xl font-bold mb-4 text-center">Create an account</Text>
      <View className="flex-row gap-4">
        <TextInput
          className="flex-1 bg-violet-100 p-3 rounded-lg mb-3"
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          className="flex-1 bg-violet-100 p-3 rounded-lg mb-3"
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View className="flex-row gap-4">
        <TextInput
          className="flex-1 bg-violet-100 p-3 rounded-lg mb-3"
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          className="flex-1 bg-violet-100 p-3 rounded-lg mb-3"
          placeholder="User Name"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View className="flex-row gap-4 mb-3">
        <View className="flex-1 bg-violet-100 rounded-lg justify-center px-3">
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={{ height: 50 }}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
        <TouchableOpacity
          className="flex-1 bg-violet-100 rounded-lg justify-center px-3 py-3"
          onPress={() => setDatePickerVisibility(true)}
        >
          <Text className={dob ? "text-black" : "text-gray-500"}>
            {dob ? dob.toLocaleDateString() : "mm/dd/yyyy"}
          </Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        maximumDate={new Date()}
        onConfirm={(date) => {
          setDob(date);
          setDatePickerVisibility(false);
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <TextInput
        className="bg-violet-100 p-3 rounded-lg mb-3"
        placeholder="Email Address"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View className="flex-row gap-4">
        <TextInput
          className="flex-1 bg-violet-100 p-3 rounded-lg mb-3"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          className="flex-1 bg-violet-100 p-3 rounded-lg mb-3"
          placeholder="Re-Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <View className="flex-row items-center mb-4">
        <Switch
          value={acceptTerms}
          onValueChange={setAcceptTerms}
          trackColor={{ false: "#ccc", true: "#a855f7" }}
          thumbColor={acceptTerms ? "#fff" : "#f4f3f4"}
        />
        <Text className="ml-2">
          I accept the{" "}
          <Text className="text-pink-500 underline">Terms and Condition</Text>
        </Text>
      </View>

      <TouchableOpacity
        className={`bg-purple-600 p-4 rounded-full items-center ${!acceptTerms ? "opacity-50" : ""
          }`}
        disabled={!acceptTerms || loading}
        onPress={handleRegister}
      >
        <Text className="text-white font-bold text-base">
          {loading ? "Signing Up..." : "Sign Up"}
        </Text>
      </TouchableOpacity>
      <OtpModal
        visible={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        email={registeredEmail}
      />
    </View>
  );
}
