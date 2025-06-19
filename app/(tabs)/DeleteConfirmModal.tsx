import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

type Props = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteConfirmModal = ({ visible, onCancel, onConfirm }: Props) => (
  <Modal visible={visible} transparent animationType="fade">
    <View className="flex-1 justify-center items-center bg-black/50 px-4">
      <View className="bg-white w-full p-4 rounded-md">
        <Text className="text-lg font-bold mb-4">Are you sure you want to delete this order?</Text>
        <View className="flex-row justify-end gap-2">
          <TouchableOpacity className="bg-gray-300 px-4 py-2 rounded" onPress={onCancel}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-red-600 px-4 py-2 rounded" onPress={onConfirm}>
            <Text className="text-white">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default DeleteConfirmModal;
