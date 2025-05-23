import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import { useRouter } from "expo-router";
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import Login from "./auth/login";
import { useDispatch } from "react-redux";
import { InitializeUserData } from '@/store/slice/loginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Constants.expoConfig?.extra?.googleClientId,
    androidClientId: Constants.expoConfig?.extra?.googleClientIdAndroid,
  });
  const dispatch = useDispatch();

  useEffect(() => {
  const fetchGoogleUser = async (accessToken: string) => {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const userInfo = await res.json();
      alert("User Info: " + JSON.stringify(userInfo, null, 2));


      const basicUser = {
        token: accessToken,
        id: userInfo.id,
        username: userInfo.name,
        email: userInfo.email,
        first_name: userInfo.given_name,
        last_name: userInfo.family_name,
        profile: userInfo.picture,
        phone: null,
        dob: null,
        gender: null,
        address: null,
        isLoggedIn: true,
      };

      // Store partially in Redux (awaiting additional fields)
      dispatch(InitializeUserData(basicUser));

      // Save partial data in AsyncStorage
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          createdAt: new Date().toISOString(),
        })
      );
      await AsyncStorage.setItem("token", accessToken);
      await AsyncStorage.setItem("userId", String(userInfo.id));

      // Navigate to complete-profile to gather missing fields
      router.push("/home");
    } catch (error) {
      console.error("Google user fetch failed:", error);
      alert("Google login failed. Try again.");
    }
  };

  if (response?.type === "success" && response.authentication?.accessToken) {
    const { accessToken } = response.authentication;
    
    fetchGoogleUser(accessToken);
  }
}, [response]);


  // useEffect(() => {
  //   if (response?.type === 'success' && response.authentication?.accessToken) {
  //     const { accessToken } = response.authentication;
  //     console.warn(" Logged in with token:", accessToken); 
  //   alert(" Logged in with token: " + accessToken);
  //     setTimeout(() => {
  //       router.push("/home");
  //     }, 100); 
  //   }
  // }, [response]);

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

      <TouchableOpacity className="w-4/5 mb-3"
        onPress={() => router.push('/home')}
      >
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
