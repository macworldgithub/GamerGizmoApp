// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Toast from "react-native-toast-message";
// import axios from "axios";
// import socket from "../socket";
// import { useLocalSearchParams } from "expo-router";
// const Chating = ({ route }: any) => {
//   const { sellerId, chatId, productId } = useLocalSearchParams();
//   //   const { chatId, sellerId, productId } = route.params;
//   const [messages, setMessages] = useState([]);
//   const [messageText, setMessageText] = useState("");
//   const [buyerUserId, setBuyerUserId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Load logged-in user ID
//   useEffect(() => {
//     const loadUserId = async () => {
//       try {
//         const id = await AsyncStorage.getItem("userId");
//         if (id) {
//           setBuyerUserId(Number(id));
//         } else {
//           Toast.show({
//             type: "error",
//             text1: "Login Required",
//             text2: "Please login to continue chatting",
//           });
//         }
//       } catch (error) {
//         Toast.show({
//           type: "error",
//           text1: "Error",
//           text2: "Failed to load user ID",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadUserId();
//   }, []);

//   // Verify we have all required IDs
//   useEffect(() => {
//     if (!loading) {
//       if (!buyerUserId || !sellerId || !chatId) {
//         Toast.show({
//           type: "error",
//           text1: "Error",
//           text2: "Chat information is incomplete",
//         });
//         // Consider adding navigation back if critical data is missing
//       }
//     }
//   }, [loading, buyerUserId, sellerId, chatId]);

//   // Load chat messages
//   useEffect(() => {
//     console.log("Received sellerId in Chat screen:", sellerId);
//     const loadMessages = async () => {
//       try {
//         const response = await axios.get(
//           "https://backend.gamergizmo.com/chats/messages",
//           {
//             params: { chatId },
//           }
//         );
//         setMessages(response.data.data);
//       } catch (error) {
//         Toast.show({
//           type: "error",
//           text1: "Error",
//           text2: "Failed to load messages",
//         });
//       }
//     };

//     if (chatId) {
//       loadMessages();
//     }
//   }, [chatId]);

//   // Socket event listeners
//   useEffect(() => {
//     if (!socket.connected || !chatId) return;

//     const handleReceive = (newMessage: any) => {
//       if (newMessage.chatId === chatId) {
//         setMessages((prev) => [...prev, newMessage]);
//       }
//     };

//     const handleRead = (message: any) => {
//       if (message.chatId === chatId) {
//         setMessages((prev) =>
//           prev.map((msg) =>
//             msg.id === message.id ? { ...msg, isRead: true } : msg
//           )
//         );
//       }
//     };

//     socket.on("receiveMessage", handleReceive);
//     socket.on("messageRead", handleRead);

//     return () => {
//       socket.off("receiveMessage", handleReceive);
//       socket.off("messageRead", handleRead);
//     };
//   }, [chatId]);

//   const sendMessage = () => {
//     if (!messageText.trim()) {
//       Toast.show({
//         type: "warning",
//         text1: "Warning",
//         text2: "Message cannot be empty",
//       });
//       return;
//     }

//     if (!buyerUserId || !sellerId || !chatId) {
//       Toast.show({
//         type: "error",
//         text1: "Error",
//         text2: "Chat information is incomplete",
//       });
//       return;
//     }

//     socket.emit("sendMessage", {
//       chatId,
//       senderId: buyerUserId,
//       receiverId: sellerId,
//       messageText,
//       productId,
//     });

//     setMessageText("");
//   };

//   return (
//     <View className="flex-1 bg-white">
//       <FlatList
//         data={messages}
//         keyExtractor={(item) => item.id?.toString()}
//         className="flex-1"
//         contentContainerStyle={{ padding: 10 }}
//         renderItem={({ item }) => {
//           const isMe = item.senderId === buyerUserId;
//           return (
//             <View
//               className={`max-w-[75%] px-4 py-2 rounded-lg my-1 ${
//                 isMe ? "bg-blue-600 self-end" : "bg-gray-200 self-start"
//               }`}
//             >
//               <Text className={`${isMe ? "text-white" : "text-black"}`}>
//                 {item.messageText}
//               </Text>
//               <Text
//                 className={`text-xs mt-1 ${
//                   isMe ? "text-gray-200" : "text-gray-500"
//                 }`}
//               >
//                 {new Date(item.sentAt).toLocaleTimeString()}{" "}
//                 {item.isRead ? "✓✓" : "✓"}
//               </Text>
//             </View>
//           );
//         }}
//       />

//       {/* Message input */}
//       <View className="flex-row items-center p-3 border-t border-gray-300">
//         <TextInput
//           className="flex-1 border border-gray-400 rounded-full px-4 py-2 mr-2"
//           placeholder="Type a message..."
//           value={messageText}
//           onChangeText={setMessageText}
//         />
//         <TouchableOpacity
//           className="bg-blue-600 px-4 py-2 rounded-full"
//           onPress={sendMessage}
//           disabled={!messageText.trim()}
//         >
//           <Text className="text-white font-medium">Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Chating;

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
        const res = await axios.get(
          `https://backend.gamergizmo.com/chats/messages/${chatId}`
        );
        setMessages(res.data.data.reverse());
      } catch (err) {
        console.error("Failed to load messages", err);
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
      await axios.post("https://backend.gamergizmo.com/chats/send", message);
      socket.emit("sendMessage", message);
      setMessages((prev) => [...prev, { ...message, created_at: new Date() }]);
      setMessageText("");
      flatListRef.current?.scrollToEnd({ animated: true });
    } catch (err) {
      console.error("Message send failed", err);
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
