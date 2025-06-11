import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import StoreCategoryProducts from './StoreCategoryProducts';

const Store = () => {
  return (
    <ScrollView className="bg-[#F5F0FA]">
      <View className=" py-6 px-4 bg-[#A93EF6]">
        <Text className="text-white text-2xl font-bold text-center">
          Gamer Gizmo Store
        </Text>
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
