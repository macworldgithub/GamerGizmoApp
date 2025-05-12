import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function NoAds() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/placead"); // Route to your PublishAd screen
  };

  return (
    <View className="items-center px-4 mt-10">
      {/* Badge */}
      <View className="bg-black px-4 py-1 rounded-full mb-6">
        <Text className="text-white text-lg font-medium">All Ads (0)</Text>
      </View>

      {/* Image & Message */}
      <View className="items-center">
        {/* <Image
          source={require("../../assets/images/question.png")} // Adjust path
          className="w-52 h-52 mb-4 opacity-50"
          resizeMode="contain"
        /> */}
        <Text className="text-lg font-bold mb-4 text-black">
          You haven’t placed any ads yet
        </Text>

        {/* Button */}
        <TouchableOpacity
          className="px-20 py-2 bg-purple-700 rounded-lg"
          onPress={handleClick}
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold text-center">
            Post Your Ad
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
