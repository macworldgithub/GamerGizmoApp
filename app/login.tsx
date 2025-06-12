import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState, useCallback } from "react";
import {
  Alert,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Login from "./auth/login";
import { useDispatch } from "react-redux";
import { InitializeUserData } from "@/store/slice/loginSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@/utils/config";
import { Platform } from "react-native";
import { getLocation } from "@/utils/getLocation";
import { makeRedirectUri } from "expo-auth-session";
WebBrowser.maybeCompleteAuthSession();

import * as Facebook from "expo-auth-session/providers/facebook";
import { FacebookAuthProvider, signInWithCredential } from "firebase/auth";

import { auth } from "../firebaseConfig";

const FB_APP_ID = "1353257789065485";

export default function LoginScreen() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [locationCity, setLocationCity] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Constants.expoConfig?.extra?.googleClientId,
    androidClientId: Constants.expoConfig?.extra?.googleClientIdAndroid,
  });

  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: FB_APP_ID,
    scopes: ['public_profile', 'email'],
    responseType: 'token',
    redirectUri: makeRedirectUri({
      scheme: 'com.gamergizmoapp',
      path: 'oauth2redirect/facebook'
    }),
  });

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGoogleUser = async (idToken: string, region: string | null) => {
      try {
        const backendRes = await fetch(`${API_BASE_URL}/auth/google-signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: idToken,
            platform: Platform.OS,
            region: region || "PK",
          }),
        });

        const responseText = await backendRes.text();

        const backendData = JSON.parse(responseText);

        if (!backendRes.ok) {
          alert(backendData.message || "Backend signup failed");
          return;
        }

        if (!backendData.id) {
          throw new Error("User data missing from backend response");
        }

        await AsyncStorage.setItem("token", backendData.token);

        await AsyncStorage.setItem("userId", String(backendData.id));

        // alert("User ID backend:"+ backendData.id);
        dispatch(
          InitializeUserData({
            token: backendData.token,
            id: backendData.id,
            username: backendData.username,
            email: backendData.email,
            first_name: backendData.first_name,
            last_name: backendData.last_name || "",
            profile: backendData.profile,
            phone: backendData.phone || null,
            dob: backendData.dob || null,
            gender: backendData.gender || null,
            address: backendData.address || null,
            isLoggedIn: true,
          })
        );

        router.replace("/home");
      } catch (error) {
        alert("Google login failed. Try again.");
      }
    };

    if (
      response?.type === "success" &&
      "authentication" in response &&
      response.authentication?.idToken
    ) {
      fetchGoogleUser(response.authentication.idToken, locationCity);
    }
  }, [response]);

  useEffect(() => {
    const handleFacebookResponse = async () => {
      if (fbResponse?.type === "success" && !isAuthenticating) {
        try {
          setIsAuthenticating(true);
          const city = await getLocation();
          const { access_token } = fbResponse.params;
          const credential = FacebookAuthProvider.credential(access_token);

          // Sign in with Firebase
          const userCredential = await signInWithCredential(auth, credential);
          const idToken = await userCredential.user.getIdToken();

          // Send token to backend
          const backendRes = await fetch(
            `${API_BASE_URL}/auth/facebook-signin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idToken: idToken,
                platform: Platform.OS,
                region: city || "PK",
              }),
            }
          );

          const responseText = await backendRes.text();
          const backendData = JSON.parse(responseText);

          if (!backendRes.ok) {
            Alert.alert(
              "Error",
              backendData.message || "Backend signup failed"
            );
            return;
          }

          if (!backendData.id) {
            throw new Error("User data missing from backend response");
          }

          // Store user data
          await AsyncStorage.setItem("token", backendData.token);
          await AsyncStorage.setItem("userId", String(backendData.id));

          // Update Redux store
          dispatch(
            InitializeUserData({
              token: backendData.token,
              id: backendData.id,
              username: backendData.username,
              email: backendData.email,
              first_name: backendData.first_name,
              last_name: backendData.last_name || "",
              profile: backendData.profile,
              phone: backendData.phone || null,
              dob: backendData.dob || null,
              gender: backendData.gender || null,
              address: backendData.address || null,
              isLoggedIn: true,
            })
          );

          router.replace("/home");
        } catch (error: any) {
          console.error("Facebook login error:", error);
          Alert.alert(
            "Error",
            error.message || "Facebook login failed. Please try again."
          );
        } finally {
          setIsAuthenticating(false);
        }
      }
    };

    handleFacebookResponse();
  }, [fbResponse]);

  const handleGoogleLogin = useCallback(async () => {
    if (isAuthenticating) return;
    try {
      setIsAuthenticating(true);
      const city = await getLocation();
      setLocationCity(city);
      await promptAsync();
    } catch (error) {
      console.error("Google login error:", error);
      Alert.alert("Error", "Failed to start Google login. Please try again.");
    } finally {
      setIsAuthenticating(false);
    }
  }, [isAuthenticating, promptAsync]);

  const handleFacebookLogin = useCallback(async () => {
    if (isAuthenticating) return;
    try {
      setIsAuthenticating(true);
      await fbPromptAsync();
    } catch (error: any) {
      console.error("Facebook login error:", error);
      Alert.alert(
        "Error",
        error.message || "Facebook login failed. Please try again."
      );
    } finally {
      setIsAuthenticating(false);
    }
  }, [isAuthenticating, fbPromptAsync]);

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

      <TouchableOpacity className="w-4/5 mb-3" onPress={handleFacebookLogin}>
        <Image
          source={require("../assets/images/facebbok.png")}
          className="w-full h-10"
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        className="w-4/5 mb-3"
        disabled={!request}
        onPress={handleGoogleLogin}
        // onPress={() => promptAsync()}
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
          <Text className="text-[#6345ED] font-semibold mt-2"> Login</Text>
        </TouchableOpacity>
      </Text>

      <Text className="text-xs text-center mt-2 text-gray-400">
        By logging in, I agree to the{" "}
        <Text className="text-[#6345ED] font-semibold">
          Terms and Conditions
        </Text>{" "}
        and <Text className="text-[#6345ED] font-semibold">Privacy Policy</Text>
      </Text>

      <Modal visible={showLoginModal} animationType="slide" transparent={false}>
        <Login onClose={() => setShowLoginModal(false)} />
      </Modal>
    </View>
  );
}
