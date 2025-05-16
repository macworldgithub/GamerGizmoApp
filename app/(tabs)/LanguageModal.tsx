import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const languages = ["English", "عربي"];
//@ts-ignore

const LanguageModal = ({ visible, onClose, selected, onSelect }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-2xl p-4 max-h-[60%]">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Select Language</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Language List */}
          <FlatList
            data={languages}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
                className="flex-row justify-between items-center py-4 border-b border-gray-200"
              >
                <Text
                  className={`text-base ${
                    item === selected
                      ? "text-black font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {item}
                </Text>
                {item === selected && (
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

export default LanguageModal;
