

import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Add from "../(tabs)/add";
import { useRouter } from "expo-router";


const RatingStars = ({ rating }) => {
  const totalStars = 5;

  return (
    <View className="flex-row">
      {[...Array(totalStars)].map((_, index) => (
        <MaterialIcons
          key={index}
          name={index < rating ? "star" : "star-border"}
          size={16}
          color={index < rating ? "#FFD700" : "gray"}
        />
      ))}
    </View>
  );
};
const router = useRouter();
export default function Results() {
  return (
    <View className="flex-1 bg-white gap-3">
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity>
          <FontAwesome name="arrow-left" size={15} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold mr-28">14,518 Results</Text>
      </View>

      <View className="flex-row items-center justify-center px-4 py-2 border-t border-gray-200">
        <TouchableOpacity className="flex-row items-center mx-3 mr-10 gap-3">
          <FontAwesome name="bookmark-o" size={18} color="black" />
          <Text className="ml-1 text-gray-600 font-semibold">SAVE</Text>
        </TouchableOpacity>
        <Text className="text-gray-400">|</Text>
        <TouchableOpacity className="flex-row items-center mx-3 gap-3">
          <FontAwesome5 name="sliders-h" size={18} color="black" />
          <Text className="ml-1 text-gray-600 font-semibold">FILTERS</Text>
        </TouchableOpacity>
        <Text className="text-gray-400">|</Text>
        <TouchableOpacity className="flex-row items-center mx-3 mr-5 gap-3">
          <FontAwesome5 name="sort" size={18} color="black" />
          <Text className="ml-1 text-gray-600 font-semibold">SORT</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="px-4 py-2 ">
        <View className="bg-white rounded-2xl shadow-md p-3 border border-gray-200 mb-4">
          <View className=" flex-row justify-end ">
            <Image source={require("../../assets/images/heart.png")} />
            <Image source={require("../../assets/images/share.png")} />
          </View>
          <TouchableOpacity onPress={() => router.push("/processor")}>
            <Image
              source={require("../../assets/images/intel.png")}
              className="w-full h-40 rounded-lg"
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text className="text-purple-600 font-bold text-lg mt-2">
            AED 551.00
          </Text>
          <Text className="text-gray-800 font-semibold">
            USED INTEL CORE I7 7TH GEN PROCESSOR...
          </Text>

          <View className="flex-row items-center justify-between mt-1">
            <RatingStars rating={0} />

            <View className="flex-row items-center">
              <Image source={require("../../assets/images/location.png")} />
              <Text className="text-gray-500 ml-2">Dubai</Text>
            </View>
            <View>
              <Image
                source={require("../../assets/images/verified.png")}
                className="mr-14"
              />
            </View>
          </View>

          <View className="flex-row justify-between mt-3">
            <TouchableOpacity className="bg-green-300 flex-1 mx-1 py-2 rounded-full">
              <Text className="text-black text-center font-semibold">
                WhatsApp
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-purple-200 flex-1 mx-1 py-2 rounded-full">
              <Text className="text-black text-center font-semibold">Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Add />
        <View className="bg-white rounded-2xl shadow-md p-3 border border-gray-200 mb-4 mt-7 ">
          <View className=" flex-row justify-end ">
            <Image source={require("../../assets/images/heart.png")} />
            <Image source={require("../../assets/images/share.png")} />
          </View>
          
          <Image
            source={require("../../assets/images/gen.png")}
            className="w-full h-40 rounded-lg"
            resizeMode="contain"
          />

          <Text className="text-purple-600 font-bold text-lg mt-2">
            AED 551.00
          </Text>
          <Text className="text-gray-800 font-semibold">
            USED INTEL CORE I7 7TH GEN PROCESSOR...
          </Text>

          <View className="flex-row items-center justify-between mt-1">
            <RatingStars rating={0} />

            <View className="flex-row items-center">
              <Image source={require("../../assets/images/location.png")} />
              <Text className="text-gray-500 ml-2">Dubai</Text>
            </View>
            <View>
              <Image
                source={require("../../assets/images/verified.png")}
                className="mr-14"
              />
            </View>
          </View>

          <View className="flex-row justify-between mt-3">
            <TouchableOpacity className="bg-green-300 flex-1 mx-1 py-2 rounded-full">
              <Text className="text-black text-center font-semibold">
                WhatsApp
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-purple-200 flex-1 mx-1 py-2 rounded-full">
              <Text className="text-black text-center font-semibold">Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white rounded-2xl shadow-md p-3 border border-gray-200">
          <View className=" flex-row justify-end ">
            <Image source={require("../../assets/images/heart.png")} />
            <Image source={require("../../assets/images/share.png")} />
          </View>

          <Image
            source={require("../../assets/images/processor.png")}
            className="w-full h-40 rounded-lg"
            resizeMode="contain"
          />

          <Text className="text-purple-600 font-bold text-lg mt-2">
            AED 551.00
          </Text>
          <Text className="text-gray-800 font-semibold">
            USED INTEL CORE I7 7TH GEN PROCESSOR...
          </Text>

          <View className="flex-row items-center justify-between mt-1">
            <RatingStars rating={0} />

            <View className="flex-row items-center">
              <Image source={require("../../assets/images/location.png")} />
              <Text className="text-gray-500 ml-2">Dubai</Text>
            </View>
            <View>
              <Image
                source={require("../../assets/images/verified.png")}
                className="mr-14"
              />
            </View>
          </View>

      
          <View className="flex-row justify-between mt-3">
            <TouchableOpacity className="bg-green-300 flex-1 mx-1 py-2 rounded-full">
              <Text className="text-black text-center font-semibold">
                WhatsApp
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-purple-200 flex-1 mx-1 py-2 rounded-full">
              <Text className="text-black text-center font-semibold">Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-5">
          <Add />
        </View>
      </ScrollView>
    </View>
  );
}
