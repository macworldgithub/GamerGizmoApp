import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import StoreCategoryProducts from './StoreCategoryProducts';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const Store = () => {
  return (
    <ScrollView className="bg-[#F5F0FA]">
      <View className="py-6 px-4 bg-[#A93EF6]">
        <View className="relative items-center justify-center">
          <TouchableOpacity
            onPress={() => router.push('/profile')}
            className="absolute left-0"
          >
            <AntDesign name="arrowleft" size={28} color="white" />
          </TouchableOpacity>

          <Text className="text-2xl font-bold text-white">Gamer Gizmo Store</Text>
        </View>
      </View>


      <View className="py-4">
        <StoreCategoryProducts categoryId={1} categoryName="Laptops" />
        <StoreCategoryProducts categoryId={2} categoryName="Gaming PCs" />
        <StoreCategoryProducts categoryId={3} categoryName="Components" />
        <StoreCategoryProducts categoryId={4} categoryName="Gaming Consoles" />
      </View>
    </ScrollView>
  );
};

export default Store;
