import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal, Button } from "react-native";
import CreateAccount from "./auth/create";
import { useRouter } from "expo-router";
import Login from "./auth/login";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Constants.expoConfig?.extra?.googleClientId,
  });
// console.log("Redirect URI", Google.getRedirectUrl());
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log("Access Token:", authentication);

      // ✅ You can now fetch user info using this token
      // fetchUserInfo(authentication.accessToken);
    }
  }, [response]);

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
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <Image
          source={require("../assets/images/google.png")}
          className="w-full h-10"
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text className="text-[#6345ED] text-xl mt-3 font-semibold">
        Already have an account?{" "}
        <TouchableOpacity onPress={() => setShowLoginModal(true)}>
          <Text className="text-[#6345ED] font-semibold mt-2">  Login</Text>
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

      <Modal
        visible={showLoginModal}
        animationType="slide"
        transparent={false}
      >
        <Login onClose={() => setShowLoginModal(false)} />
      </Modal>
    </View>
  );
}
