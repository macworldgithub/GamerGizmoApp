
import { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onUpdate: (address: string) => void;
  currentAddress: string;
};

const UpdateOrderModal = ({ visible, onClose, onUpdate, currentAddress }: Props) => {
  const [address, setAddress] = useState('');

  // 🔁 Update local state when modal becomes visible or currentAddress changes
  useEffect(() => {
    if (visible) {
      setAddress(currentAddress);
    }
  }, [visible, currentAddress]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50 px-4">
        <View className="bg-white w-full p-4 rounded-md">
          <Text className="text-lg font-bold mb-2">Update Shipping Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            className="border border-gray-300 px-3 py-2 rounded mb-4"
            placeholder="Enter shipping address"
          />
          <View className="flex-row justify-end gap-2">
            <TouchableOpacity
              className="bg-gray-300 px-4 py-2 rounded"
              onPress={onClose}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#9341f3] px-4 py-2 rounded"
              onPress={() => onUpdate(address)}
            >
              <Text className="text-white">Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateOrderModal;
