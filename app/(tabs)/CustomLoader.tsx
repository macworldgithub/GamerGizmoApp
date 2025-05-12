import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

const CustomLoader = () => {
  return (
    <View className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <View className="p-6 rounded-lg shadow-lg flex flex-col items-center">
        <ActivityIndicator size="large" color="#a855f7" />
        <Text className="text-lg mt-2 font-semibold text-white">
          Loading ...
        </Text>
      </View>
    </View>
  );
};

export default CustomLoader;
