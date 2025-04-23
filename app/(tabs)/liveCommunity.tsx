import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Message = {
  id: number;
  sender: string;
  avatar: any;
  text: string;
  time: string;
  isCurrentUser: boolean;
  replyTo?: number;
  status?: 'sent' | 'delivered' | 'read';
  images?: any[];
};

export default function LiveChatScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const initialMessages: Message[] = [
    {
      id: 1,
      sender: 'Joss',
      avatar: require('../../assets/images/avatar.png'),
      text: 'In maximus hendrerit efficitur Joss. Praesent tellus elit.',
      time: 'Today, 02:00 pm',
      isCurrentUser: false,
    },
    {
      id: 2,
      sender: 'You',
      avatar: require('../../assets/images/avatar.png'),
      text: 'Mauris sodales sagittis and rhoncus.',
      replyTo: 1,
      time: 'Today, 01:48 pm',
      status: 'read',
      images: [],
      isCurrentUser: true,
    },
    {
      id: 3,
      sender: 'Lina',
      avatar: require('../../assets/images/avatar.png'),
      text: 'Mauris tristique blandit mi?',
      time: 'Today, 11:30 am',
      isCurrentUser: false,
    },
  ];

  const [messagesState, setMessagesState] = useState<Message[]>(initialMessages);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [likedMessages, setLikedMessages] = useState<number[]>([]);
  const [loadingImages, setLoadingImages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState<string>('');
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const toggleLike = (id: number) => {
    setLikedMessages((prev) =>
      prev.includes(id) ? prev.filter((msgId) => msgId !== id) : [...prev, id]
    );
  };

  const cancelReply = () => setReplyingTo(null);

  const sendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: messagesState.length + 1,
      sender: 'You',
      avatar: require('../../assets/images/avatar.png'),
      text: messageText,
      time: 'Just now',
      replyTo: replyingTo?.id,
      isCurrentUser: true,
      status: 'sent',
    };

    setMessagesState((prev) => [...prev, newMessage]);
    setMessageText('');
    cancelReply();
    scrollViewRef.current?.scrollToEnd?.({ animated: true });

    setTimeout(() => {
      setMessagesState((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessagesState((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        )
      );
    }, 2000);
  };

  const handleVoiceRecording = () => {
    Alert.alert('Voice recording feature not implemented yet.');
  };

  const handleEmojiInsert = (emoji: string) => {
    setMessageText((prev) => prev + emoji);
  };

  const getReplyText = (id: number): string => {
    const msg = messagesState.find((m) => m.id === id);
    return msg ? `${msg.sender}: ${msg.text.slice(0, 40)}...` : '';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Ionicons name="checkmark" size={16} color="gray" style={{ marginLeft: 4 }} />;
      case 'delivered':
        return <Ionicons name="checkmark-done" size={16} color="gray" style={{ marginLeft: 4 }} />;
      case 'read':
        return <Ionicons name="checkmark-done" size={16} color="#4F46E5" style={{ marginLeft: 4 }} />;
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Live Chat</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView ref={scrollViewRef} className="flex-1 p-4 space-y-4">
        {messagesState.map((msg) => (
          <View key={msg.id} className={`flex ${msg.isCurrentUser ? 'items-end' : 'items-start'}`}>
            <View className="flex-row items-start">
              {!msg.isCurrentUser && (
                <Image source={msg.avatar} className="w-8 h-8 rounded-full mr-2 mt-1" />
              )}
              <View className="max-w-[80%]">
                <Text className="text-base font-bold text-gray-800 mb-1 text-[16px]">{msg.sender}</Text>

                <View className={`rounded-xl p-3 ${msg.isCurrentUser ? 'bg-indigo-500' : 'bg-gray-100'} relative`}>
                  {msg.replyTo && (
                    <View className="border-l-2 border-gray-300 pl-2 mb-1">
                      <Text className="text-xs text-gray-200 italic">{getReplyText(msg.replyTo)}</Text>
                    </View>
                  )}
                  <View className="relative">
                    <Text className={`text-sm pr-6 ${msg.isCurrentUser ? 'text-white' : 'text-gray-800'}`}>
                      {msg.text}
                    </Text>
                    {msg.isCurrentUser && (
                      <View className="absolute bottom-0 right-0">
                        {getStatusIcon(msg.status || '')}
                      </View>
                    )}
                  </View>
                </View>
                <View className="flex-row justify-between items-center mt-1">
                  <Text className="text-xs text-gray-400">{msg.time}</Text>
                  <View className="flex-row items-center space-x-4">
                    <TouchableOpacity onPress={() => setReplyingTo(msg)} className="flex-row items-center">
                      <Ionicons name="return-up-back" size={16} color="gray" />
                      <Text className="ml-1 text-xs text-gray-500">Reply</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleLike(msg.id)} className="flex-row items-center">
                      <Ionicons
                        name={likedMessages.includes(msg.id) ? 'heart' : 'heart-outline'}
                        size={16}
                        color={likedMessages.includes(msg.id) ? 'red' : 'gray'}
                      />
                      <Text className="ml-1 text-xs text-gray-500">Like</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {msg.isCurrentUser && (
                <Image source={msg.avatar} className="w-8 h-8 rounded-full ml-2 mt-1" />
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {replyingTo && (
        <View className="px-4 py-2 border-t border-gray-200 bg-gray-50 flex-row items-center justify-between">
          <Text className="text-xs text-gray-500">Replying to {replyingTo.sender}: "{replyingTo.text.slice(0, 40)}..."</Text>
          <TouchableOpacity onPress={cancelReply}>
            <Ionicons name="close-circle" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      )}

      <View className="flex-row items-center border-t border-gray-200 px-2 py-1">
        <TouchableOpacity onPress={() => setShowEmojiPicker(!showEmojiPicker)} className="p-2">
          <Ionicons name="happy-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TextInput
          placeholder="Type something..."
          value={messageText}
          onChangeText={setMessageText}
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm"
        />
        <TouchableOpacity onPress={handleVoiceRecording} className="p-2">
          <Ionicons name="mic" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={sendMessage} className="p-2">
          <Ionicons name="send" size={24} color="#6366F1" />
        </TouchableOpacity>
      </View>

      {showEmojiPicker && (
        <View className="p-2 bg-gray-100 border-t border-gray-300 flex-row flex-wrap">
          {['😊', '😂', '❤️', '🔥', '👍', '🙌', '😭', '😎'].map((emoji, index) => (
            <TouchableOpacity key={index} onPress={() => handleEmojiInsert(emoji)} className="p-2">
              <Text className="text-2xl">{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
