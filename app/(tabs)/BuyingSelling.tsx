import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@/utils/config";
import { router } from "expo-router";

const tabs = ["All", "Buying", "Selling"];

interface ChatUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  type: "buyer" | "seller";
}

export default function BuyingSelling() {
  const [activeTab, setActiveTab] = useState("All");
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuyersAndSellers();
  }, []);

  const fetchBuyersAndSellers = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token fetched:", token);

      const response = await axios.get(`${API_BASE_URL}/chats/buyers-and-sellers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Buyers & Sellers API response:", response.data);

      const buyers: ChatUser[] = (response.data?.data?.buyers || []).map((user: any) => ({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        avatar: user.avatar || null,
        type: "buyer",
      }));

      const sellers: ChatUser[] = (response.data?.data?.sellers || []).map((user: any) => ({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        avatar: user.avatar || null,
        type: "seller",
      }));

      setUsers([...buyers, ...sellers]);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredUsers = () => {
    if (!Array.isArray(users)) return [];

    switch (activeTab) {
      case "Buying":
        return users.filter((user) => user.type === "buyer");
      case "Selling":
        return users.filter((user) => user.type === "seller");
      default:
        return users;
    }
  };

  // const handleChatPress = (user: ChatUser) => {
  //   router.push({
  //     pathname: "/(tabs)/Chating",
  //     params: {
  //       userId: user.id.toString(),
  //       userName: `${user.first_name} ${user.last_name}`,
  //       userType: user.type,
  //       username: user.username,
  //     },
  //   });
  // };

  const handleChatPress = async (user: ChatUser) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const buyerId = await AsyncStorage.getItem("userId");

    if (!token || !buyerId) {
      console.warn("Token or buyerId missing");
      return;
    }

    const response = await axios.post(`${API_BASE_URL}/chats/get-or-create`, {
      buyerId: Number(buyerId),
      sellerId: user.id,
      // productId: OPTIONAL - add if needed
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const chatId = response.data?.chatId;

    if (!chatId) {
      console.warn("Chat ID not returned from server.");
      return;
    }
    
    router.push({
      pathname: "/(tabs)/Chating",
      params: {
        chatId: chatId.toString(),
        sellerId: user.id.toString(),
        sellerName: `${user.first_name} ${user.last_name}`,
        productId: response.data?.productId?.toString() || "", // optional
      },
    });
  } catch (err) {
    console.error("Error navigating to chat:", err);
  }
};


  const renderChatItem = ({ item }: { item: ChatUser }) => (
    <TouchableOpacity
      className="flex-row items-center px-4 py-3 border-b border-gray-100"
      onPress={() => handleChatPress(item)}
    >
      <View className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
        <Image
          source={
            item.avatar
              ? { uri: item.avatar }
              : require("../../assets/images/avatar.png")
          }
          className="h-12 w-12"
          resizeMode="cover"
        />
      </View>

      <View className="flex-1 ml-3">
        <Text className="text-base font-semibold text-gray-800">
          {item.first_name} {item.last_name}
        </Text>
        <Text className="text-sm text-gray-500 capitalize">{item.type}</Text>
        <Text className="text-xs text-gray-400">{item.username}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-12 pb-2">
        <Text className="text-2xl font-bold text-gray-800">Chats</Text>
      </View>

      {/* Tabs */}
      <View className="px-4">
        <View className="flex-row justify-around border-b border-gray-200">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`pb-2 px-6 ${
                activeTab === tab ? "border-b-2 border-[#6345ED]" : ""
              }`}
            >
              <Text
                className={`text-base ${
                  activeTab === tab
                    ? "text-[#6345ED] font-semibold"
                    : "text-gray-400"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content */}
      <View className="flex-1">
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <Text>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={getFilteredUsers()}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center mt-10">
                <Text className="text-gray-500">No chats found</Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
}
