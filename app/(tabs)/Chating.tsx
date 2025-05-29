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
import { useLocalSearchParams } from "expo-router";
import socket from "../socket";
import dayjs from "dayjs";
import { API_BASE_URL } from "@/utils/config";

interface Message {
  id?: number;
  chat_id: number;
  sender_id: number;
  receiver_id: number;
  message_text: string;
  product_id: number;
  created_at: Date;
}

const Chating = () => {
  const { chatId, sellerId, productId } = useLocalSearchParams();
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
        console.log("Fetching messages for chat ID:", chatId);
        const res = await axios.get(`${API_BASE_URL}/chats/messages`, {
          params: {
            chatId: chatId
          }
        });
        console.log("Messages response:", res.data);
        
        if (res.data && res.data.data && Array.isArray(res.data.data)) {
          // Sort messages by date and reverse to show newest at bottom
          const sortedMessages = [...res.data.data].sort((a, b) => 
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
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
      console.log("Received message:", msg);
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
      const localMessage = {
        ...message,
        created_at: new Date(),
        id: Date.now() // temporary ID
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
    return (
      <View
        className={`my-1 px-4 py-2 rounded-lg max-w-[75%] ${
          isOwnMessage ? "bg-purple-600 self-end" : "bg-gray-200 self-start"
        }`}
      >
        <Text className={isOwnMessage ? "text-white" : "text-black"}>
          {item.message_text}
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
