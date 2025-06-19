import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@/utils/config";
import { router, useFocusEffect } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const tabs = ["All", "Buying", "Selling"];

interface ChatUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  profile_picture?: string | null;
  type: "buyer" | "seller";
  last_message?: {
    message_text: string;
    sent_at: string;
    is_read: boolean;
  } | null;
  chat_id?: number;
  unread_count: number;
}

export default function chat() {
  const [activeTab, setActiveTab] = useState("All");
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuyersAndSellers();
  }, []);

  const fetchBuyersAndSellers = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token retrieved:", token);

      const response = await axios.get(`${API_BASE_URL}/chats/buyers-and-sellers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const buyers: ChatUser[] = (response.data?.data?.buyers || []).map((user: any) => ({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        profile_picture: user.profile_picture || null,
        type: "buyer",
        last_message: user.last_message || null,
        chat_id: user.chat_id,
        unread_count: user.unread_count || 0,
      }));

      const sellers: ChatUser[] = (response.data?.data?.sellers || []).map((user: any) => ({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        profile_picture: user.profile_picture || null,
        type: "seller",
        last_message: user.last_message || null,
        chat_id: user.chat_id,
        unread_count: user.unread_count || 0,
      }));

      // Combine and sort by last message timestamp (desc)
      const combinedUsers = [...buyers, ...sellers].sort((a, b) => {
        const aTime = a.last_message?.sent_at ? new Date(a.last_message.sent_at).getTime() : 0;
        const bTime = b.last_message?.sent_at ? new Date(b.last_message.sent_at).getTime() : 0;
        return bTime - aTime;
      });

      setUsers(combinedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  // useFocusEffect(
  //   useCallback(() => {
  //     fetchBuyersAndSellers();
  //   }, [])
  // );

  // useFocusEffect(
  //   useCallback(() => {
  //     const route = useRoute();
  //     if ((route.params as any)?.refresh) {
  //       fetchBuyersAndSellers();
  //     }
  //   }, [])
  // );
  useFocusEffect(
    useCallback(() => {
      fetchBuyersAndSellers();
    }, [])
  );

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

  // const handleChatPress = async (user: ChatUser) => {
  //   try {
  //     const chatId = user?.last_message ? (user as any).chat_id : null;

  //     if (!chatId) {
  //       alert("No existing chat found for this user.");
  //       return;
  //     }

  //     router.push({
  //       pathname: "/(tabs)/Chating",
  //       params: {
  //         chatId: chatId.toString(),
  //         sellerId: user.id.toString(),
  //         sellerName: `${user.first_name} ${user.last_name}`,
  //         productId: "",
  //       },
  //     });
  //   } catch (err) {
  //     console.error("Error navigating to chat:", err);
  //   }
  // };


  const handleChatPress = async (user: ChatUser) => {
    try {
      const chatId = user?.last_message ? (user as any).chat_id : null;

      if (!chatId) {
        alert("No existing chat found for this user.");
        return;
      }

      // Set unread_count to 0 locally
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.chat_id === chatId ? { ...u, unread_count: 0 } : u
        )
      );

      router.push({
        pathname: "/(tabs)/Chating",
        params: {
          chatId: chatId.toString(),
          sellerId: user.id.toString(),
          sellerName: `${user.first_name} ${user.last_name}`,
          productId: "",
        },
      });
    } catch (err) {
      console.error("Error navigating to chat:", err);
    }
  };



  const renderChatItem = ({ item }: { item: ChatUser }) => {
    const time = item.last_message?.sent_at
      ? new Date(item.last_message.sent_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
      : "";

    return (
      <TouchableOpacity
        className="flex-row items-start px-4 py-3 border-b border-gray-100"
        onPress={() => handleChatPress(item)}
      >
        <View className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden items-center justify-center">
          {item.profile_picture ? (
            <Image
              source={{ uri: item.profile_picture }}
              className="h-12 w-12"
              resizeMode="cover"
            />
          ) : (
            <FontAwesome name="user-circle" size={40} color="#999" />
          )}
        </View>

        <View className="flex-1 flex-row justify-between ml-3">
          <View className="flex-1 pr-2">
            <Text className={`text-base font-semibold text-gray-800`}>
              {item.first_name} {item.last_name}
            </Text>

            {item.last_message?.message_text && (
              <Text
                className={`text-sm mt-0.5 ${item.unread_count > 0 ? "font-bold text-black" : "text-gray-600"}`}
                numberOfLines={1}
              >
                {item.last_message.message_text}
              </Text>
            )}
          </View>

          <View className="items-end">
            {item.last_message?.sent_at && (
              <Text className="text-xs text-gray-400">
                {new Date(item.last_message.sent_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            )}

            {item.unread_count > 0 && (
              <View className="bg-[#6345ED] rounded-full px-2 py-0.5 mt-1">
                <Text className="text-white text-xs font-semibold">{item.unread_count}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>

    );
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-12 pb-2">
        <Text className="text-2xl font-bold text-gray-800">Chats</Text>
      </View>

      <View className="px-4">
        <View className="flex-row justify-around border-b border-gray-200">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`pb-2 px-6 ${activeTab === tab ? "border-b-2 border-[#6345ED]" : ""
                }`}
            >
              <Text
                className={`text-base ${activeTab === tab
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

      <View className="flex-1">
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <Text>Loading...</Text>
          </View>
        ) : getFilteredUsers().length === 0 ? (
          <View className="flex-1 items-center justify-center p-6 mt-12">
            <Image source={require("../../assets/images/chat1.png")} />
            <Text className="text-lg font-bold text-black text-center mt-12">
              Your Chat is Empty
            </Text>
            <Text className="text-gray-500 text-center mt-2 px-6">
              Post an ad or message a seller to start seeing conversations here
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/home")}
              className="bg-[#6345ED] border border-gray-400 px-16 py-3 rounded-md mt-6"
            >
              <Text className="text-white font-semibold">Explore</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/placead")}
              className="bg-white border border-gray-400 px-12 py-3 rounded-md mt-6"
            >
              <Text className="text-[#6345ED] font-semibold">Post an Ad</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={getFilteredUsers()}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        )}
      </View>
    </View>
  );
}
