import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import NicUploadModal from "../components/NicUploadModal";

const GetStartedBadge = () => {
  const [openNicModal, setOpenNicModal] = useState(false);

  return (
    <View className="p-4">
      <View className="bg-purple-100 p-5 rounded-xl items-center">
        <Text className="text-purple-600 text-base font-semibold mb-1">
          Got a verified badge yet?
        </Text>
        <Text className="text-gray-800 text-sm mb-4">
          Get more visibility & credibility.
        </Text>
        <TouchableOpacity
          onPress={() => setOpenNicModal(true)}
          className="bg-purple-600 px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-medium">Get Started</Text>
        </TouchableOpacity>
      </View>

      <NicUploadModal open={openNicModal} setOpen={setOpenNicModal} />
    </View>
  );
};

export default GetStartedBadge;
