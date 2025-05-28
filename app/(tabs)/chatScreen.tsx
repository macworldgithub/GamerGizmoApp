import React, { useEffect, useState } from "react";
import { View, TextInput, FlatList, Text, Button } from "react-native";
import { socket } from "../socket";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";

export default function ChatScreen({ route }) {
  const { chatId, senderId, receiverId } = route.params;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Connect socket and set up listener
  useEffect(() => {
    socket.connect();

    socket.emit("join", chatId); // optional: join room by chatId

    socket.on("chat message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("chat message");
      socket.disconnect();
    };
  }, [chatId]);

  // Fetch existing messages
  useEffect(() => {
    axios.get(`${API_BASE_URL}/chat/${chatId}/messages`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching messages", err));
  }, [chatId]);

  const sendMessage = () => {
    const newMsg = {
      chatId,
      senderId,
      receiverId,
      message,
    };

    // Emit via socket
    socket.emit("chat message", newMsg);

    // Optionally, POST to server to store the message
    axios.post(`${API_BASE_URL}/chat/message`, newMsg)
      .catch((err) => console.error("Error sending message", err));

    setMessage("");
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ padding: 5 }}>{item.senderId === senderId ? "Me: " : "Them: "}{item.message}</Text>
        )}
      />

      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
        style={{
          borderColor: "gray",
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}
