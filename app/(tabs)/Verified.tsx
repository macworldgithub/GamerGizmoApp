import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
// import { Verified } from "lucide-react-native";

const Verified = () => {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const isValid = phone.length === 9; // simple validation (5xxxxxxx)

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-2xl font-bold text-gray-500">×</Text>
        </TouchableOpacity>
        <Text className="text-base font-semibold text-black">Confirm Phone Number</Text>
        <View style={{ width: 24 }} /> 
      </View>

      {/* Shield Image */}
      <View className="items-center mb-5">
       
      </View>

      {/* Title & Subtitle */}
      <Text className="text-lg font-semibold text-center text-black mb-2">Safety first</Text>
      <Text className="text-sm text-gray-500 text-center mb-6">
        To keep everyone safe on dubizzle, only{"\n"}phone-verified users can connect with sellers.
      </Text>

      {/* Phone Input */}
      <View className="flex-row border border-gray-300 rounded px-4 py-3 items-center mb-6">
        <Text className="text-base text-black mr-2">+971</Text>
        <TextInput
          placeholder="5X XXX XXXX"
          keyboardType="numeric"
          maxLength={9}
          className="flex-1 text-base text-black"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      {/* Button */}
      <TouchableOpacity
      
      >
        <Text className="text-white font-semibold text-base">Send verification code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Verified;
