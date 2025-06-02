// ChatsScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@/utils/config";
import { router } from "expo-router";

const tabs = ["All", "Buying", "Selling"];

interface ChatUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
  type: 'buyer' | 'seller';
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
      const response = await axios.get(`${API_BASE_URL}/chats/buyers-and-sellers`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && (response.data.buyers || response.data.sellers)) {
        const buyers = (response.data.buyers || []).map((buyer: any) => ({
          ...buyer,
          type: 'buyer'
        }));
        
        const sellers = (response.data.sellers || []).map((seller: any) => ({
          ...seller,
          type: 'seller'
        }));

        setUsers([...buyers, ...sellers]);
      }
    } catch (error) {
      console.error("Error fetching buyers and sellers:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredUsers = () => {
    if (!Array.isArray(users)) return [];

    switch (activeTab) {
      case "Buying":
        return users.filter(user => user.type === 'buyer');
      case "Selling":
        return users.filter(user => user.type === 'seller');
      default:
        return users;
    }
  };

  const handleChatPress = (user: ChatUser) => {
    // Navigate to chat screen with the selected user
    router.push({
      pathname: "/(tabs)/Chating",
      params: {
        userId: user.id,
        userName: `${user.first_name} ${user.last_name}`,
        userType: user.type
      }
    });
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
        <View className="flex-row items-center">
          <Text className="text-base font-semibold text-gray-800">
            {item.first_name} {item.last_name}
          </Text>
        </View>
        <Text className="text-sm text-gray-500">Sales</Text>
        <Text className="text-xs text-gray-400">{item.email}</Text>
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
                  activeTab === tab ? "text-[#6345ED] font-semibold" : "text-gray-400"
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
