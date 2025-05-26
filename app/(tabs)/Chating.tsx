// ChatScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
// import { useTailwind } from 'nativewind';
import socket from "../socket"; // your socket setup file
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
//@ts-ignore
const ChatScreen = ({ route }) => {
  const params = useLocalSearchParams();
  const currentUserId = Number(params.currentUserId);
  const sellerId = Number(params.sellerId);
  const productId = Number(params.productId);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        "https://backend.gamergizmo.com/Chat/messages"
      );
      // Optionally filter by productId, sellerId, etc.
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    socket.connect();

    socket.on("new_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const message = {
      sender_id: currentUserId,
      receiver_id: sellerId,
      content: input,
      product_id: productId,
    };

    socket.emit("send_message", message);
    setInput("");
  };

  const renderMessage = ({ item }) => {
    const isSender = item.sender_id === currentUserId;

    return (
      <View
        className={`my-2 px-3 py-2 rounded-2xl max-w-[75%] ${
          isSender ? "bg-green-200 self-end" : "bg-white self-start"
        }`}
      >
        <View className="flex-row items-center mb-1">
          <Image
            source={{
              uri: `https://backend.gamergizmo.com/${item.users.profile}`,
            }}
            className="w-6 h-6 rounded-full mr-2"
          />
          <Text className="text-xs text-gray-500">{item.users.username}</Text>
        </View>
        <Text className="text-base text-black">{item.content}</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        inverted
        className="mb-3"
      />

      <View className="flex-row items-center bg-white p-2 rounded-full shadow-md">
        <TextInput
          className="flex-1 px-3 py-2 text-base text-black"
          placeholder="Type a message"
          placeholderTextColor="#999"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity
          onPress={sendMessage}
          className="bg-green-500 px-4 py-2 rounded-full ml-2"
        >
          <Text className="text-white font-semibold">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
