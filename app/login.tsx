import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import CreateAccount from "./auth/create";
import {useRouter} from "expo-router";
export default function LoginScreen() {
  // const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();

  return (
    <View className="flex-1 bg-white justify-start items-center px-5 pt-20">
    <TouchableOpacity className="absolute top-3 right-5">
      <Image source={require("../assets/images/cross.png")} />
    </TouchableOpacity>

    <Image
      source={require("../assets/images/logo.png")}
      className="w-32 h-16 mb-4"
      resizeMode="contain"
    />

    <Image
      source={require("../assets/images/login.png")}
      className="w-56 h-44 mb-5"
      resizeMode="contain"
    />

    <Text className="text-2xl font-bold text-center mb-5">
      Login to contact the seller
    </Text>

    <TouchableOpacity className="w-4/5 mb-3">
      <Image
        source={require("../assets/images/facebbok.png")}
        className="w-full h-10"
        resizeMode="contain"
      />
    </TouchableOpacity>

    <TouchableOpacity className="w-4/5 mb-3"
      onPress={() => router.push("./(tabs)/home")}
      // onPress={() => setShowCreateModal(true)}
    >
      <Image
        source={require("../assets/images/google.png")}
        className="w-full h-10"
        resizeMode="contain"
      />
    </TouchableOpacity>

    <TouchableOpacity className="w-4/5 mb-3">
      <Image
        source={require("../assets/images/email.png")}
        className="w-full h-10"
        resizeMode="contain"
      />
    </TouchableOpacity>

    <TouchableOpacity className="w-4/5 mb-3">
      <Image
        source={require("../assets/images/apple.png")}
        className="w-full h-10"
        resizeMode="contain"
      />
    </TouchableOpacity>

    <Text className="text-[#6345ED] text-xl mt-3 font-semibold">
      Don’t have an account?{" "}
      <TouchableOpacity onPress={() => router.push('/auth/create')}>
        <Text className="text-[#6345ED] font-semibold mt-2">Create one</Text>
      </TouchableOpacity>
    </Text>

    <Text className="text-xs text-center mt-2 text-gray-400">
      By logging in, I agree to the{" "}
      <Text className="text-[#6345ED] font-semibold">
        Terms and Conditions
      </Text>{" "}
      and{" "}
      <Text className="text-[#6345ED] font-semibold">Privacy Policy</Text>
    </Text>

    {/* CreateAccount Modal */}
    {/* <CreateAccount
      isVisible={showCreateModal}
      onClose={() => setShowCreateModal(false)}
    /> */}
  </View>
  );
}
