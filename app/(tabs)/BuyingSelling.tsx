// ChatsScreen.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const tabs = ["All", "Buying", "Selling"];

export default function BuyingSelling() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <View className="flex-1 bg-black px-4 pt-12">
      <Text className="text-white text-2xl font-bold mb-4">Chats</Text>

      {/* Tabs */}
      <View className="flex-row justify-around border-b border-gray-700 pb-2">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`pb-1 ${
              activeTab === tab ? "border-b-2 border-white" : ""
            }`}
          >
            <Text
              className={`text-base ${
                activeTab === tab ? "text-white font-semibold" : "text-gray-400"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View className="mt-6">
        {activeTab === "All" && (
          <Text className="text-white">This is All Chats content</Text>
        )}
        {activeTab === "Buying" && (
          <Text className="text-white">This is Buying Chats content</Text>
        )}
        {activeTab === "Selling" && (
          <Text className="text-white">This is Selling Chats content</Text>
        )}
      </View>
    </View>
  );
}
