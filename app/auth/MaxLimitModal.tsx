import React from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";

type Session = {
  location: string;
  platform: string;
  timestamp: string;
  token: string;
};

type Props = {
visible: boolean;
onClose: () => void;
sessions: Session[];
handleLogoutSession: (index: number) => void;
};

const MaxLimitModal = ({ visible, onClose, sessions, handleLogoutSession }: Props) => {
return (
    <Modal visible={visible} transparent animationType="fade">
    <View className="flex-1 justify-center items-center bg-black/50 px-6">
        <View className="bg-white rounded-xl p-5 w-full max-w-md">
        <Text className="text-center text-lg font-bold mb-2">
            Max Account Login Reached
        </Text>
        <Text className="text-center mb-4">
            Following Accounts are logged in currently
        </Text>

        <ScrollView className="max-h-80">
            {sessions.map((session, index) => (
            <View key={index} className="flex-row jxustify-between items-center mb-2">
                <Text className="flex-1">
                {session.location},{session.platform}{"\n"}
                <Text className="text-xs text-gray-600">{session.timestamp}</Text>
                </Text>
                <TouchableOpacity
                className="bg-red-500 px-2 py-1 rounded"
                onPress={() => handleLogoutSession(index)}
                >
                <Text className="text-white">Logout</Text>
                </TouchableOpacity>
            </View>
            ))}
        </ScrollView>

        <TouchableOpacity
            className="bg-red-500 mt-4 py-2 rounded"
            onPress={onClose}
        >
            <Text className="text-white text-center">Close</Text>
        </TouchableOpacity>
        </View>
    </View>
    </Modal>
);
};

export default MaxLimitModal;
