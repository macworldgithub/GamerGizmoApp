import React from 'react';
import { View, Text, Image } from 'react-native';

const ChatMessage = ({ item, currentUserId }) => {
  const isSender = item.sender_id === currentUserId;

  return (
    <View className={`my-2 px-3 py-2 rounded-2xl max-w-[75%] ${isSender ? 'bg-green-200 self-end' : 'bg-white self-start'}`}>
      <View className="flex-row items-center mb-1">
        <Image
          source={{ uri: `https://backend.gamergizmo.com/${item.users.profile}` }}
          className="w-6 h-6 rounded-full mr-2"
        />
        <Text className="text-xs text-gray-500">{item.users.username}</Text>
      </View>
      <Text className="text-base text-black">{item.content}</Text>
    </View>
  );
};

export default ChatMessage;
