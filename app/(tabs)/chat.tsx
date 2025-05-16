import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

const Chat = () => {
  const router = useRouter();
  return (
    <View className="bg-white w-full h-full">
      <View className="border-b border-gray-200 pb-4">
        <View className="px-4  py-4 flex-row items-center">
          <TouchableOpacity onPress={() => router.push("/home")}>
            <Image source={require("../../assets/images/left.png")} />
          </TouchableOpacity>
          <View className="flex-1 items-center -ml-48">
            <Text className="text-black font-semibold text-lg">Chat</Text>
          </View>
        </View>
      </View>

      <View className="items-center justify-center p-6 mt-12">
        <Image source={require("../../assets/images/chat1.png")} />

        <Text className="text-lg font-bold text-black text-center mt-12">
          Your Chat is Empty
        </Text>
        <Text className="text-gray-500 text-center mt-2 px-6">
          Post an ad or message a seller to start seeing conversations here
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/home")}
          className="bg-[#6345ED] border border-gray-400 px-16 py-3 rounded-md mt-6"
        >
          <Text className="text-white font-semibold">Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/placead")}
          className="bg-white border border-gray-400 px-12 py-3 rounded-md mt-6"
        >
          <Text className="text-[#6345ED] font-semibold">Post an Ad</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
