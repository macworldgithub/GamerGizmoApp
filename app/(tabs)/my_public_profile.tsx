import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const PublicProfileScreen = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState<'ads' | 'ratings'>('ads');

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
            <View className="flex-row items-center p-4 ">
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
                    className={`flex-1 items-center py-2 ${activeTab === 'ratings' ? 'border-b-2 border-red-500' : ''}`}
                    onPress={() => setActiveTab('ratings')}
                >
                    <Text className={`text-sm ${activeTab === 'ratings' ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
                        Ratings
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Tab Content */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 pt-10">
                {activeTab === 'ads' ? (
                    <View className="items-center justify-center flex-1">
                        <Text className="text-base font-semibold text-black mb-4">You don't have any ads that are live</Text>
                        <TouchableOpacity className="bg-purple-600 px-4 py-3  mt-4">
                            <Text className="text-white font-semibold">Post Ad Now</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View className="items-center justify-center flex-1">
                        {/* <Image
              source={require('../../assets/images/ads-placeholder.png')}
              className="w-32 h-32 mb-4"
              resizeMode="contain"
            /> */}
                        <Text className="text-center text-black font-semibold text-base">
                            You don't have any ratings
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default PublicProfileScreen;
