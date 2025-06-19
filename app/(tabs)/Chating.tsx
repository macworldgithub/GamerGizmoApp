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
import { Icon } from "lucide-react-native";
import Feather from 'react-native-vector-icons/Feather';


interface Message {
  id?: number;
  chat_id: number;
  sender_id: number;
  message_text: string;
  sent_at: Date;
  is_read?: boolean;
}

const Chating = () => {
  const { chatId, sellerId, productId, sellerName } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [buyerUserId, setBuyerUserId] = useState<number | null>(null);
  const flatListRef = useRef<FlatList | null>(null);
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);

  //functions start
  const handleBack = () => {
    if (isNavigatingBack) return;
    setIsNavigatingBack(true);

    setTimeout(() => {
      router.replace({
        pathname: "/(tabs)/chat",
        //@ts-ignore
        query: { productId, sellerId },
        //@ts-ignore
        params: { refresh: true },
      });

      setIsNavigatingBack(false);
    }, 100); // slight delay to allow UI to settle
  };

  // Function to mark messages as read
  const markMessagesAsRead = (msgs: Message[]) => {
    if (!buyerUserId) return;


    const unreadMessages = msgs.filter(
      msg => !msg.is_read && msg.sender_id !== buyerUserId
    );

    if (unreadMessages.length > 0) {
      console.log("Marking messages as read:", unreadMessages.map(msg => msg.id));

      // Mark each message as read individually
      unreadMessages.forEach(msg => {
        socket.emit("markMessageAsRead", {
          messageId: msg.id
        }, (response: any) => {
          console.log("Backend response for message", msg.id, ":", response);
        });
      });

      // Update local state
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          unreadMessages.some(unread => unread.id === msg.id)
            ? { ...msg, is_read: true }
            : msg
        )
      );
    }
  };
  useEffect(() => {
    return () => {
      socket.emit("leaveRoom", chatId);
      socket.off("receiveMessage");
      socket.off("messageRead");
      socket.off("messageSendError");
    };
  }, [chatId]);

  // Add a new effect to mark messages as read when they become visible
  useEffect(() => {
    if (messages.length > 0 && buyerUserId) {
      markMessagesAsRead(messages);
    }
  }, [messages, buyerUserId]);

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

        if (Array.isArray(res.data?.data)) {
          const sortedMessages = [...res.data.data].sort((a, b) =>
            new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime()
          );
          setMessages(sortedMessages);
          markMessagesAsRead(sortedMessages);
        } else {
          console.warn("Unexpected response structure:", res.data);
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
  }, [chatId, buyerUserId]);

  // Update the socket event handlers
  useEffect(() => {
    // Handle message received
    socket.on("receiveMessage", (msg: Message) => {
      console.log("Received message:", msg);
      if (msg.chat_id === Number(chatId)) {
        setMessages(prev => {
          const filtered = prev.filter(m => m.id !== msg.id);
          const newMessages = [...filtered, msg];
          // Mark new message as read if we are the receiver (not the sender)
          if (msg.sender_id !== buyerUserId) {
            markMessagesAsRead([msg]);
          }
          return newMessages;
        });
      }
    });

    // Handle message read status update
    socket.on("messageRead", (messageData: any) => {
      console.log("Message read event received:", messageData);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageData.id
            ? { ...msg, is_read: true }
            : msg
        )
      );
    });

    socket.on("messageSendError", (error) => {
      console.error("Socket message send error:", error);
      alert("Failed to send message. Please try again.");
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messageRead");
      socket.off("messageSendError");
    };
  }, [chatId, buyerUserId]);

  const sendMessage = async () => {
    if (!messageText.trim() || !buyerUserId) return;

    const message = {
      chat_id: Number(chatId),
      sender_id: buyerUserId,
      message_text: messageText,
    };

    try {
      console.log("Sending message via socket:", message);

      // Emit the message through socket
      socket.emit("sendMessage", {
        chatId: Number(chatId),
        receiverId: Number(sellerId),
        messageText: messageText
      });

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

  const renderItem = ({ item }: { item: Message }) => {
    const isOwnMessage = item.sender_id === buyerUserId;
    const time = dayjs(item.sent_at).format("HH:mm");

    return (
      <View
        className={`my-1 px-4 py-2 rounded-lg max-w-[75%]  ${isOwnMessage ? "bg-purple-600 self-end" : "bg-gray-200 self-start"
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

          onPress={handleBack}
          className="absolute  top-2 left-2  p-2 rounded-full"
        >
          {/* <FontAwesome name="arrow-left" size={20} color="black" /> */}
          <Feather name="arrow-left" size={24} color="black" />

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
      <View className="flex-row items-center p-4 border-t border-gray-300">
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
