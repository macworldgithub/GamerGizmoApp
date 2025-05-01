import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Add from "../(tabs)/add";
import { useRouter } from "expo-router";
import PopularMainSection from "./PopularMainSection";

const categories = [
  { name: "Used Gaming PC", img: require("../../assets/images/pc1.png") },
  {
    name: "Used Gaming Laptops",
    img: require("../../assets/images/laptop.png"),
  },
  {
    name: "Used Gaming PC Parts",
    img: require("../../assets/images/both.png"),
  },
  {
    name: "Used Gaming Consoles",
    img: require("../../assets/images/gaming1.png"),
  },
  { name: "New Gaming PC Parts", img: require("../../assets/images/pc1.png") },
  {
    name: "New Gaming Laptops",
    img: require("../../assets/images/laptop.png"),
  },
  { name: "New Gaming Consoles", img: require("../../assets/images/both.png") },
  {
    name: "New Gaming Consoles",
    img: require("../../assets/images/gaming1.png"),
  },
  {
    name: "Customization & Gaming Gears",
    img: require("../../assets/images/gear.png"),
  },
];

export default function GamingStore() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <View className="p-6 bg-gray-100 h-full">
      {/* Search Bar */}

      <View className="flex-row items-center bg-white border border-gray-300 rounded-full shadow-lg">
        <TextInput
          placeholder="Search"
          className="flex-1 text-gray-700 text-sm"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <ScrollView>
        {/* Categories List (3 items per row) */}
        <View className="bg-white mt-6 px-2 py-3 border-t border-gray-200 rounded-2xl">
          <View className="mt-6 flex flex-wrap flex-row justify-between">
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white w-[30%] m-1 p-3 rounded-lg shadow-lg shadow-purple-500 items-center"
              >
                <Image source={item.img} className="" />
                <Text className="text-center text-gray-700 mt-2 text-xs">
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View className="bg-purple-100 p-4 rounded-xl shadow-md mb-4 mt-6">
          <View className="flex-row justify-between items-center">
            <View className="w-2/3">
              <Text className="text-lg font-semibold text-gray-900">
                New Projects
              </Text>
              <Text className="text-gray-600 text-sm">
                Get access to the latest gaming accessories
              </Text>
            </View>

            <Image
              source={require("../../assets/images/check.png")}
              className="w-20 h-20"
            />
          </View>

          <TouchableOpacity className="mt-4 self-center w-full">
            <Image
              source={require("../../assets/images/explore.png")}
              className="w-full "
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View className="bg-purple-200 p-4 rounded-xl shadow-md flex-row items-center justify-between mb-4 h-28">
          <View className="flex-row items-center">
            {/* <MaterialIcons name="verified" size={20} color="#6B46C1" /> */}
            <Image source={require("../../assets/images/verified1.png")} />

            <View className="ml-9">
              <Text className="text-sm font-semibold text-gray-900 text-center">
                Got a verified badge yet?
              </Text>
              <Text className="text-gray-600 text-xs text-center">
                Get more visibility
              </Text>
              <Text className="text-gray-600 text-xs text-center">
                Enhance your credibility
              </Text>
            </View>
          </View>
          {/* <ArrowRight size={20} color="black" /> */}
          <Image source={require("../../assets/images/right.png")} />
        </View>
        <View className="">
          <Add />
        </View>
        <View className="bg-white p-4 rounded-xl shadow-md flex-row items-center justify-between h-28 mt-7">
          <View className="flex-row items-center">
            {/* <FontAwesome5 name="file-alt" size={20} color="#6B46C1" /> */}
            <Image source={require("../../assets/images/files.png")} />
            <View className="ml-2">
              <Text className="text-sm font-semibold text-gray-900">
                You recently looked at
              </Text>
              <Text className="text-gray-600 text-xs">
                Classifieds &gt; Computers & Accessories
              </Text>
            </View>
          </View>
          <Image source={require("../../assets/images/right.png")} />
        </View>

        <PopularMainSection/>

      </ScrollView>
    </View>
  );
}

