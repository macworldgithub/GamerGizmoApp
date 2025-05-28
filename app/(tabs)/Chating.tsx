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
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import socket from "../socket";
import dayjs from "dayjs";
import { API_BASE_URL } from "@/utils/config";

const Chating = () => {
  const { chatId, sellerId, productId } = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [buyerUserId, setBuyerUserId] = useState<number | null>(null);
  const flatListRef = useRef(null);

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
        const res = await axios.get(`${API_BASE_URL}/chats/messages?chatId=${chatId}`);

        setMessages(res.data.data.reverse());
      } catch (err) {
        console.error("Failed to load messages", err.response?.data || err.message);
      }
    };

    if (chatId) fetchMessages();
  }, [chatId]);

  // Socket receive message
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      if (msg.chat_id === Number(chatId)) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [chatId]);

  const sendMessage = async () => {
    if (!messageText.trim() || !buyerUserId) return;

    const message = {
      chat_id: Number(chatId),
      sender_id: buyerUserId,
      receiver_id: Number(sellerId),
      content: messageText,
      product_id: Number(productId),
    };

    try {
      await axios.post(`${API_BASE_URL}/chats/create`, message);
      socket.emit("sendMessage", message);
      setMessages((prev) => [...prev, { ...message, created_at: new Date() }]);
      setMessageText("");
      flatListRef.current?.scrollToEnd({ animated: true });
    } catch (err) {
      console.error("Message send failed", err.response?.data || err.message);

    }
  };

  const renderItem = ({ item }) => {
    const isOwnMessage = item.sender_id === buyerUserId;
    return (
      <View
        className={`my-1 px-4 py-2 rounded-lg max-w-[75%] ${
          isOwnMessage ? "bg-purple-600 self-end" : "bg-gray-200 self-start"
        }`}
      >
        <Text className={isOwnMessage ? "text-white" : "text-black"}>
          {item.content}
        </Text>
        <Text className="text-xs mt-1 text-gray-400">
          {dayjs(item.created_at).format("HH:mm")}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
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
