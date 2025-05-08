
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import PopularMainSection from "./PopularMainSection";
import Add from "../(tabs)/add";

// Categories data
const categories = [
  {
    name: "Used Gaming PC",
    img: require("../../assets/images/pc1.png"),
    category: "desktop",
    condition: 2,
  },
  {
    name: "Used Gaming Laptops",
    img: require("../../assets/images/laptop.png"),
    category: "laptops",
    condition: 2,
  },
  {
    name: "Used Components and Accessories",
    img: require("../../assets/images/both.png"),
    category: "components",
    condition: 2,
  },
  {
    name: "Used Gaming Consoles",
    img: require("../../assets/images/gaming1.png"),
    category: "console",
    condition: 2,
  },
  {
    name: "New Gaming PC ",
    img: require("../../assets/images/pc1.png"),
    category: "desktop",
    condition: 1,
  },
  {
    name: "New Gaming Laptops",
    img: require("../../assets/images/laptop.png"),
    category: "laptops",
    condition: 1,
  },
  {
    name: "New Components and Accessories",
    img: require("../../assets/images/both.png"),
    category: "components",
    condition: 1,
  },
  {
    name: "New Gaming Consoles",
    img: require("../../assets/images/both.png"),
    category: "console",
    condition: 1,
  },
  {
    name: "Customization & Gaming Gears",
    img: require("../../assets/images/gear.png"),
    category: "components",
    condition: 1,
  },
];

export default function GamingStore() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  // Handle category click
  const handleCategoryClick = (category: string, condition: string) => {
    router.push({
  pathname: "/ExploreScreen",
  params: {
    category: category,
    condition: condition,
  },
});

  };

  return (
    <View className="p-6 bg-gray-100 h-full">
      {/* Search Bar */}
      <View className="flex-row items-center bg-white border border-gray-300 rounded-full shadow-lg">
        <TextInput
          placeholder="Search"
          className="flex-1 py-4 text-gray-700 text-md placeholder:px-4"
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
                onPress={() => handleCategoryClick(item.category, item.condition)}
                className="bg-white w-[30%] m-1 p-3 rounded-lg shadow-lg shadow-purple-500 items-center"
              >
                <Image source={item.img} />
                <Text className="text-center text-gray-700 mt-2 text-xs">
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* New Projects Section */}
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
            <Image source={require("../../assets/images/check.png")} className="w-20 h-20" />
          </View>
          <TouchableOpacity className="mt-4 self-center w-full">
            <Image source={require("../../assets/images/explore.png")} className="w-full" resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {/* Verified Badge Section */}
        <View className="bg-purple-200 p-4 rounded-xl shadow-md flex-row items-center justify-between mb-4 h-28">
          <View className="flex-row items-center">
            <Image source={require("../../assets/images/verified1.png")} />
            <View className="ml-9">
              <Text className="text-sm font-semibold text-gray-900 text-center">
                Got a verified badge yet?
              </Text>
              <Text className="text-gray-600 text-xs text-center">Get more visibility</Text>
              <Text className="text-gray-600 text-xs text-center">Enhance your credibility</Text>
            </View>
          </View>
          <Image source={require("../../assets/images/right.png")} />
        </View>

        {/* Add Section */}
        <View>
          <Add />
        </View>

        {/* Recently Looked At Section */}
        <View className="bg-white p-4 rounded-xl shadow-md flex-row items-center justify-between h-28 mt-7">
          <View className="flex-row items-center">
            <Image source={require("../../assets/images/files.png")} />
            <View className="ml-2">
              <Text className="text-sm font-semibold text-gray-900">You recently looked at</Text>
              <Text className="text-gray-600 text-xs">Classifieds &gt; Computers & Accessories</Text>
            </View>
          </View>
          <Image source={require("../../assets/images/right.png")} />
        </View>
        <PopularMainSection
        />
      </ScrollView>
    </View>
  );
}
