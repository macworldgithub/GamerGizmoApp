import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
// import { Ionicons } from "@expo/vector-icons";

const Category = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
   
      <View className="px-4 mt-4 py-4 flex">
        <View className="border-b border-gray-200 pb-8">
          <Image
            source={require("../../assets/images/left.png")}
            className=""
          />

          <View className="items-center -mt-6">
            <Text className="text-black font-semibold text-lg">
              Category Selection
            </Text>
          </View>
        </View>
      </View>

     
      <ScrollView className="mt-2">
        <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
          <Text className="text-black text-base">Gaming PCs</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
          <Text className="text-black text-base">Laptops</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
          <Text className="text-black text-base">Gaming Consoles</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
          <Text className="text-black text-base">
            Components and Accessories
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Category;
