import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

const Chat = () => {
  return (
    <View className="bg-white w-full h-full">
      <View className="items-center justify-center p-6 mt-12">
     
        <Image
          source={require("../../assets/images/chat1.png")} 
        />

    
        <Text className="text-lg font-bold text-black text-center mt-12">
          Your Chat is Empty
        </Text>
        <Text className="text-gray-500 text-center mt-2 px-6">
          Post an ad or message a seller to start seeing conversations here
        </Text>

    
        <TouchableOpacity className="bg-[#6345ED] border border-gray-400 px-16 py-3 rounded-md mt-6">
          <Text className="text-white font-semibold">Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white border border-gray-400 px-12 py-3 rounded-md mt-6">
          <Text className="text-[#6345ED] font-semibold">Post an Add</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default Chat;
