import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { router, useLocalSearchParams } from "expo-router";
import socket from "../socket";
import dayjs from "dayjs";
import { API_BASE_URL } from "@/utils/config";
import { FontAwesome } from "@expo/vector-icons";

interface Message {
  id?: number;
  chat_id: number;
  sender_id: number;
  receiver_id: number;
  message_text: string;
  product_id: number;
  sent_at: Date;
  is_read: boolean;
}

const Chating = () => {
  const { chatId, sellerId, productId, sellerName } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [buyerUserId, setBuyerUserId] = useState<number | null>(null);
  const flatListRef = useRef<FlatList | null>(null);

  useEffect(() => {
    const loadUserId = async () => {
      const id = await AsyncStorage.getItem("userId");
      if (id) {
        setBuyerUserId(Number(id));
        if (!socket.connected) {
          socket.io.opts.query = { userId: id };
          socket.connect();
        }
        socket.emit("joinRoom", chatId);
      }
    };
    loadUserId();
  }, []);

  // Load initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {

        const token = await AsyncStorage.getItem('token');
        console.log("Token retrieved:", token);
        if (!token) {
          console.warn("No token found, cannot fetch messages.");
          return;
        }

        console.log("Fetching messages for chat ID:", chatId);
        const res = await axios.get(`${API_BASE_URL}/chats/messages`, {
          params: {
            chatId: chatId
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Messages response:", res.data);

        if (Array.isArray(res.data)) {
          const sortedMessages = [...res.data].sort((a, b) =>
            new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime()
          );
          console.log("Sorted messages count:", sortedMessages.length);
          setMessages(sortedMessages);
        } else {
          console.log("No messages found or invalid response format:", res.data);
          setMessages([]);
        }

      } catch (error) {
        const err = error as AxiosError;
        console.error("Failed to load messages:", {
          error: err.response?.data || err.message,
          status: err.response?.status,
          statusText: err.response?.statusText,
          chatId: chatId
        });
        setMessages([]);
      }
    };

    if (chatId) {
      console.log("Chat ID present, fetching messages...");
      fetchMessages();
    } else {
      console.log("No chat ID provided");
    }
  }, [chatId]);

  // Socket receive message
  useEffect(() => {
    socket.on("receiveMessage", (msg: Message) => {
      if (msg.chat_id === Number(chatId)) {
        setMessages((prev) => {
          // Remove any temp messages (optional logic)
          const filtered = prev.filter(m => m.id !== msg.id);
          return [...filtered, msg];
        });
      }
    });

    socket.on("messageSendError", (error) => {
      console.error("Socket message send error:", error);
      alert("Failed to send message. Please try again.");
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messageSendError");
    };
  }, [chatId]);


  const sendMessage = async () => {
    if (!messageText.trim() || !buyerUserId) return;

    const message = {
      chat_id: Number(chatId),
      sender_id: buyerUserId,
      receiver_id: Number(sellerId),
      message_text: messageText,
      product_id: Number(productId),
    };

    try {
      console.log("Sending message via socket:", message);

      // Emit the message through socket
      socket.emit("sendMessage", {
        chatId: Number(chatId),
        receiverId: Number(sellerId),
        messageText: messageText
      });

      // Add message to local state immediately for UI responsiveness
      const localMessage: Message = {
        ...message,
        sent_at: new Date(),
        id: Date.now(), 
        is_read: false  
      };
      setMessages((prev) => [...prev, localMessage]);
      setMessageText("");
      flatListRef.current?.scrollToEnd({ animated: true });

    } catch (error) {
      console.error("Message send failed:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  // Update socket message handler to handle server response
  useEffect(() => {
    // Handle successful message send
    socket.on("receiveMessage", (msg: Message) => {
      console.log("Received message:", msg);
      if (msg.chat_id === Number(chatId)) {
        setMessages((prev) => {
          // Remove temporary message if it exists
          const filtered = prev.filter(m => m.id !== Date.now());
          return [...filtered, msg];
        });
      }
    });

    // Handle message send error
    socket.on("messageSendError", (error) => {
      console.error("Socket message send error:", error);
      alert("Failed to send message. Please try again.");
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messageSendError");
    };
  }, [chatId]);

  const renderItem = ({ item }: { item: Message }) => {
    const isOwnMessage = item.sender_id === buyerUserId;
    const time = dayjs(item.sent_at).format("HH:mm");

    return (
      <View
        className={`my-1 px-4 py-2 rounded-lg max-w-[75%] ${isOwnMessage ? "bg-purple-600 self-end" : "bg-gray-200 self-start"
          }`}
      >
        <Text className={isOwnMessage ? "text-white" : "text-black"}>
          {item.message_text}
        </Text>

        {isOwnMessage && (
          <View className="flex-row justify-end items-center mt-1 gap-3">
            <Text className="text-xs mr-1 text-gray-400">{time}</Text>
            <Text className={`text-xs ${item.is_read ? "text-blue-400" : "text-white"}`}>
              ✓✓
            </Text>
          </View>
        )}

        {!isOwnMessage && (
          <Text className="text-xs mt-1 text-gray-400">{time}</Text>
        )}
      </View>
    );
  };


  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="p-4 border-b border-gray-200 bg-white">
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/product/[id]",
              params: { id: productId?.toString() },
            })
          }
          className="absolute top-2 left-2 bg-white/70 p-2 rounded-full"
        >
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-black text-center">
          {sellerName || "Seller"}
        </Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 10 }}
      />
      <View className="flex-row items-center p-2 border-t border-gray-300">
        <TextInput
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type a message"
          className="flex-1 bg-gray-100 px-4 py-2 rounded-full"
        />
        <TouchableOpacity
          onPress={sendMessage}
          className="ml-2 px-4 py-2 bg-purple-600 rounded-full"
        >
          <Text className="text-white font-semibold">Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chating;
