import { View, Text, TouchableOpacity, Modal, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ContactModalProps {
  visible: boolean;
  onClose: () => void;
}

const ContactModal = ({ visible, onClose }: ContactModalProps) => {
  const phoneNumber = "80038249953"; // Without hyphens for calling
  const displayNumber = "800-38249953";
  const email = "customersupport@dubizzle.com";

  const handleCall = async () => {
    try {
      await Linking.openURL(`tel:${phoneNumber}`);
    } catch (err) {
      console.error("Failed to open phone dialer:", err);
    }
  };

  const handleEmail = async () => {
    try {
      await Linking.openURL(`mailto:${email}`);
    } catch (err) {
      console.error("Failed to open email client:", err);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-t-3xl w-full p-6">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-lg font-bold">Contact Us</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="space-y-4">
            <View className="border-b border-gray-200 pb-4">
              <Text className="font-semibold mb-2">Call us to get in touch</Text>
              <Text className="text-gray-600">9:00 AM to 6:00 PM, Monday to Friday</Text>
            </View>

            {/* Call Button */}
            <TouchableOpacity
              onPress={handleCall}
              className="flex-row items-center justify-center py-3 bg-red-600 rounded-md"
            >
              <Ionicons name="call" size={20} color="white" className="mr-2" />
              <Text className="text-white font-medium">{displayNumber} (dubizzle)</Text>
            </TouchableOpacity>

            {/* Email Button */}
            <TouchableOpacity
              onPress={handleEmail}
              className="flex-row items-center justify-center py-3  rounded-md"
            >
              <Ionicons name="mail" size={20} color="#6D28D9" className="mr-2" />
              <Text className="text-purple-600 font-medium">Or email us at {email}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ContactModal;
