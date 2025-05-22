import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";

const SORT_OPTIONS = [

  "Newest to Oldest",
  "Oldest to Newest",
  "Price Highest to Lowest",
  "Price Lowest to Highest",
 
];

const SortModal = ({ isVisible, onClose, selected, onSelect }:any) =>{
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      swipeDirection={["down"]}
      onSwipeComplete={onClose}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View className="bg-white rounded-t-2xl p-4">
        {/* Handle Bar */}
        <View className="items-center mb-4">
          <View className="w-10 h-1.5 rounded-full bg-gray-300" />
        </View>

        <Text className="text-xl font-semibold mb-4">Sort</Text>

        {SORT_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => onSelect(option)}
            className="flex-row items-center justify-between py-3 border-b border-gray-100"
          >
            <Text className="text-base text-gray-800">{option}</Text>
            {selected === option && (
              <MaterialIcons name="check" size={20} color="#ef4444" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
}
export default SortModal;