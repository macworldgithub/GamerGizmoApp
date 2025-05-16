import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const cities = [
  "All UAE",
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ras al Khaimah",
  "Ajman",
  "Fujairah",
  "Umm al Quwain",
 
];
//@ts-ignore
const CitySelectorModal = ({ visible, onClose, onSelect, selectedCity }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-2xl p-4 max-h-[80%]">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Select City</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* City List */}
          <FlatList
            data={cities}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
                className="py-3 flex-row justify-between items-center border-b border-gray-100"
              >
                <Text
                  className={`text-base ${
                    item === selectedCity
                      ? "text-black font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {item}
                </Text>
                {item === selectedCity && (
                  <Ionicons name="checkmark" size={20} color="red" />
                )}
              </Pressable>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CitySelectorModal;
