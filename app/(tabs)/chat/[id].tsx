// import { useLocalSearchParams } from "expo-router";
// import { useEffect, useState } from "react";
// import { View, TextInput, FlatList, Text, Button, KeyboardAvoidingView, Platform } from "react-native";
// import { io } from "socket.io-client";

// interface Message {
//   chat_id: string;
//   sender_id: string;
//   receiver_id: string;
//   content: string;
// }

// const socket = io("https://backend.gamergizmo.com");

// export default function ChatScreen() {
//   const { id, senderId, receiverId, sellerName } = useLocalSearchParams<{
//     id: string;
//     senderId: string;
//     receiverId: string;
//     sellerName: string;
//   }>();

//   const chatId = id;

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [text, setText] = useState("");

//   useEffect(() => {
//     if (!chatId) return;

//     socket.emit("join", chatId);

//     socket.on("receiveMessage", (msg: Message) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.emit("leave", chatId);
//       socket.off("receiveMessage");
//     };
//   }, [chatId]);

//   const sendMessage = () => {
//     if (text.trim()) {
//       const message: Message = {
//         chat_id: chatId!,
//         sender_id: senderId!,
//         receiver_id: receiverId!,
//         content: text,
//       };

//       socket.emit("sendMessage", message);
//       setMessages((prev) => [...prev, message]);
//       setText("");
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       className="flex-1 bg-white"
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <View className="flex-1 p-4">
//         <Text className="text-lg font-bold mb-2">Chat with {sellerName}</Text>

//         <FlatList
//           data={messages}
//           keyExtractor={(_, i) => i.toString()}
//           renderItem={({ item }) => (
//             <Text
//               className={`mb-2 ${
//                 item.sender_id === senderId
//                   ? "text-right text-blue-600"
//                   : "text-left text-gray-700"
//               }`}
//             >
//               {item.content}
//             </Text>
//           )}
//         />

//         <TextInput
//           value={text}
//           onChangeText={setText}
//           placeholder="Type a message"
//           className="border p-2 mb-2 rounded-md"
//         />
//         <Button title="Send" onPress={sendMessage} />
//       </View>
//     </KeyboardAvoidingView>
//   );
// }



// import { useLocalSearchParams } from "expo-router";
// import { useEffect, useState, useRef } from "react";
// import {
//   View,
//   TextInput,
//   FlatList,
//   Text,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import { io, Socket } from "socket.io-client";

// interface Message {
//   chat_id: string;
//   sender_id: string;
//   receiver_id: string;
//   content: string;
// }

// const socket: Socket = io("https://backend.gamergizmo.com");

// export default function ChatScreen() {
//   const { id, senderId, receiverId, sellerName } = useLocalSearchParams<{
//     id: string;
//     senderId: string;
//     receiverId: string;
//     sellerName: string;
//   }>();

//   const chatId = id;

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [text, setText] = useState("");

//   const flatListRef = useRef<FlatList>(null);

//   useEffect(() => {
//     if (!chatId) return;

//     // Join chat room
//     socket.emit("join", chatId);

//     // Listen for incoming messages
//     socket.on("receiveMessage", (msg: Message) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       // Leave chat room & cleanup listeners
//       socket.emit("leave", chatId);
//       socket.off("receiveMessage");
//     };
//   }, [chatId]);

//   const sendMessage = () => {
//     if (text.trim()) {
//       const message: Message = {
//         chat_id: chatId!,
//         sender_id: senderId!,
//         receiver_id: receiverId!,
//         content: text.trim(),
//       };

//       // Emit message to server
//       socket.emit("sendMessage", message);

//       // Optimistically add message to UI
//       setMessages((prev) => [...prev, message]);
//       setText("");

//       // Scroll to bottom after a tiny delay
//       setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
//     }
//   };

//   const renderItem = ({ item }: { item: Message }) => {
//     const isSender = item.sender_id === senderId;
//     return (
//       <View
//         style={[
//           styles.messageContainer,
//           isSender ? styles.sender : styles.receiver,
//         ]}
//       >
//         <Text style={{ color: isSender ? "white" : "black" }}>{item.content}</Text>
//       </View>
//     );
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//       keyboardVerticalOffset={90}
//     >
//       <View style={{ flex: 1, padding: 10 }}>
//         <Text style={styles.header}>Chat with {sellerName}</Text>

//         <FlatList
//           ref={flatListRef}
//           data={messages}
//           keyExtractor={(_, i) => i.toString()}
//           renderItem={renderItem}
//           contentContainerStyle={{ paddingBottom: 20 }}
//           onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
//         />

//         <View style={styles.inputRow}>
//           <TextInput
//             style={styles.input}
//             placeholder="Type a message"
//             value={text}
//             onChangeText={setText}
//             multiline
//           />
//           <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
//             <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     fontWeight: "bold",
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   messageContainer: {
//     maxWidth: "70%",
//     borderRadius: 12,
//     padding: 10,
//     marginVertical: 5,
//   },
//   sender: {
//     backgroundColor: "#6D28D9", // purple
//     alignSelf: "flex-end",
//   },
//   receiver: {
//     backgroundColor: "#E5E7EB", // light gray
//     alignSelf: "flex-start",
//   },
//   inputRow: {
//     flexDirection: "row",
//     paddingTop: 10,
//     borderTopWidth: 1,
//     borderColor: "#ddd",
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     maxHeight: 100,
//   },
//   sendBtn: {
//     backgroundColor: "#6D28D9",
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 15,
//     marginLeft: 10,
//     height: 40,
//   },
// });




import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useRef } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { io, Socket } from "socket.io-client";

interface Message {
  chat_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
}

export default function ChatScreen() {
  const { id, senderId, receiverId, sellerName } = useLocalSearchParams<{
    id: string;
    senderId: string;
    receiverId: string;
    sellerName: string;
  }>();

  // Convert IDs to numbers right away
  const numericSenderId = Number(senderId);
  const numericReceiverId = Number(receiverId);
  const chatId = id;

  // Validate IDs on component mount
  useEffect(() => {
    if (isNaN(numericSenderId) || isNaN(numericReceiverId)) {
      Alert.alert("Error", "Invalid user IDs provided");
      return;
    }

    if (numericSenderId === numericReceiverId) {
      Alert.alert("Error", "Cannot chat with yourself");
    }
  }, []);

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const flatListRef = useRef<FlatList>(null);

  // Initialize socket with proper typing
  const socketRef = useRef<Socket>();
  
  useEffect(() => {
    if (!chatId || isNaN(numericSenderId)) return;

    // Initialize socket connection with user ID
    socketRef.current = io("https://backend.gamergizmo.com", {
      query: {
        userId: numericSenderId.toString()
      },
      transports: ["websocket"],
      forceNew: true
    });

    const socket = socketRef.current;

    // Join chat room
    socket.emit("join", chatId);

    // Listen for incoming messages
    socket.on("receiveMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Error handling
    socket.on("connect_error", (err) => {
      console.log("Socket connection error:", err.message);
    });

    return () => {
      if (socket.connected) {
        socket.emit("leave", chatId);
        socket.off("receiveMessage");
        socket.disconnect();
      }
    };
  }, [chatId, numericSenderId]);

  const sendMessage = () => {
    if (!socketRef.current?.connected) {
      Alert.alert("Error", "Not connected to chat server");
      return;
    }

    if (numericSenderId === numericReceiverId) {
      Alert.alert("Error", "Cannot send message to yourself");
      return;
    }

    if (text.trim()) {
      const message: Message = {
        chat_id: chatId!,
        sender_id: numericSenderId.toString(),
        receiver_id: numericReceiverId.toString(),
        content: text.trim(),
      };

      try {
        // Emit message to server
        socketRef.current.emit("sendMessage", message);

        // Optimistically add message to UI
        setMessages((prev) => [...prev, message]);
        setText("");

        // Scroll to bottom
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      } catch (error) {
        console.error("Failed to send message:", error);
        Alert.alert("Error", "Failed to send message");
      }
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isSender = item.sender_id === numericSenderId.toString();
    return (
      <View
        style={[
          styles.messageContainer,
          isSender ? styles.sender : styles.receiver,
        ]}
      >
        <Text style={{ color: isSender ? "white" : "black" }}>
          {item.content}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={styles.header}>Chat with {sellerName}</Text>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={text}
            onChangeText={setText}
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  messageContainer: {
    maxWidth: "70%",
    borderRadius: 12,
    padding: 10,
    marginVertical: 5,
  },
  sender: {
    backgroundColor: "#6D28D9",
    alignSelf: "flex-end",
  },
  receiver: {
    backgroundColor: "#E5E7EB",
    alignSelf: "flex-start",
  },
  inputRow: {
    flexDirection: "row",
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
  },
  sendBtn: {
    backgroundColor: "#6D28D9",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    marginLeft: 10,
    height: 40,
  },
});