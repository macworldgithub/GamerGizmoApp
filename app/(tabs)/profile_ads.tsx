import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'lucide-react-native';

const PublicProfileScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'ads' | 'ratings'>('ads');

  const handleEdit = () => Alert.alert('Edit', 'Edit button pressed.');
  const handleDelete = () => Alert.alert('Delete', 'Ad deleted.');

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={20} color="black" />
        </TouchableOpacity>
        <Text className="text-base font-semibold">My Public Profile</Text>
        <View className="w-5" />
      </View>

      {/* Profile Info */}
      <View className="flex-row items-center p-4">
        <Image
          source={require('../../assets/images/profile.png')}
          className="w-12 h-12 rounded-full mr-3"
        />
        <Text className="font-bold text-black text-base">Michel Smith</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row border-b border-gray-200">
        <TouchableOpacity
          className={`flex-1 items-center py-2 ${activeTab === 'ads' ? 'border-b-2 border-purple-600' : ''}`}
          onPress={() => setActiveTab('ads')}
        >
          <Text className={`text-sm ${activeTab === 'ads' ? 'text-purple-600 font-semibold' : 'text-gray-400'}`}>
            Ads
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 items-center py-2 ${activeTab === 'ratings' ? 'border-b-2 border-purple-600' : ''}`}
          onPress={() => setActiveTab('ratings')}
        >
          <Text className={`text-sm ${activeTab === 'ratings' ? 'text-purple-600 font-semibold' : 'text-gray-400'}`}>
            Ratings
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'ads' ? (
        <ScrollView className="p-4">
          <View className="flex-row">
            {/* GPU Image */}
            <Image
              source={require('../../assets/images/gpu.png')}
              className="w-20 h-20 rounded mr-3"
              resizeMode="contain"
            />

            {/* Ad Info */}
            <View className="flex-1">
              <Text className="text-sm text-black font-semibold">
                AMD Radeon RX 580 GTS XXX Edition Graphics Card, S Version, 8GB DDR5 256 Bit Memory, Dual Bios, 2304 Stream Processor, 1386MHz OC+, PCI-E, HDMI, DisplayPort | RX-5808SBD6
              </Text>

              {/* Stats */}
              <View className="flex-row mt-2">
                <Text className="text-[11px] text-gray-400 mr-4">Views: (0)</Text>
                <Text className="text-[11px] text-gray-400 mr-4">Calls: (0)</Text>
                <Text className="text-[11px] text-gray-400 mr-4">Chats: (0)</Text>
                <Text className="text-[11px] text-gray-400">Likes: (0)</Text>
              </View>

              {/* Buttons */}
              <View className="flex-row mt-3 space-x-3 gap-2">
                <TouchableOpacity onPress={handleEdit} className="border border-red-500 px-4 py-1 rounded-xl">
                  <Text className="text-red-500 text-xs font-semibold ">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} className="border border-red-500 px-4 py-1 rounded-xl">
                  <Text className="text-red-500 text-xs font-semibold">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-400">No ratings available.</Text>
        </View>
      )}
    </View>
  );
};

export default PublicProfileScreen;
