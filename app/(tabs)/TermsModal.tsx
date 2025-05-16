// components/TermsModal.tsx
import React from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";

const TermsModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-11/12 bg-white rounded-2xl p-5 shadow-lg">
          <Text className="text-xl font-bold text-center mb-4">
            Terms And Condition
          </Text>

          <ScrollView className="max-h-60 mb-4">
            <Text className="text-sm text-gray-700 mb-2">
              By signing up, you agree to abide by our terms and conditions.
              Please read the following carefully:
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              • You must be at least 18 years old to use our services.
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              • All personal information provided must be accurate and up to
              date.
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              • Users are responsible for maintaining the confidentiality of
              their account details.
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              • Any misuse, fraud, or violation of our policies may result in
              termination of your account.
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              • We reserve the right to update these terms at any time without
              prior notice.
            </Text>
          </ScrollView>

          <TouchableOpacity
            className="bg-gray-200 p-3 rounded-xl items-center"
            onPress={onClose}
          >
            <Text className="text-gray-800 font-semibold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TermsModal;
