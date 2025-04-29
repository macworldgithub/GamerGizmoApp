import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";

const City = () =>{
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="border-b border-gray-200 pb-4">
        <View className="px-4 mt-4 py-4 flex">
          <Image
            source={require("../../assets/images/cross.png")}
            className="w-5 h-5"
          />

          <View className="items-center -mt-8">
            <Text className="text-black font-semibold text-lg">
              Select a City
            </Text>
            <Text className="text-gray-400 text-sm">
              Where should we place your ad?
            </Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
          <Text className="text-black text-base ml-2">Abu Dhabi</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
          <Text className="text-black text-base ml-2">Ajman</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
          <Text className="text-black text-base ml-2">Al Ain</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
          <Text className="text-black text-base ml-2">Dubai</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
          <Text className="text-black text-base ml-2">Fujairah</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
          <Text className="text-black text-base ml-2">Ras al Khaimah</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
          <Text className="text-black text-base ml-2">Sharjah</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
          <Text className="text-black text-base ml-2">Umm al Quwain</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default City;
