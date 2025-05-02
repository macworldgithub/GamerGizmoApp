
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const Images = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      //@ts-ignore
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <View className="flex-row items-center border-b border-gray-200 pb-4 mb-6">
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-black text-base font-semibold flex-1 text-center -ml-6">
          Upload Image
        </Text>
      </View>

      <TouchableOpacity
        className="bg-gray-100 rounded-lg h-60 justify-center items-center mb-10"
        onPress={pickImage}
      >
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: "100%", height: "100%", borderRadius: 12 }}
            resizeMode="cover"
          />
        ) : (
          <>
            <Ionicons name="cloud-upload-outline" size={40} color="gray" />
            <Text className="text-gray-500 mt-2">Upload Image</Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity className="items-center -mt-15 mb-10">
        <Image
          source={require("../../assets/images/next1.png")}
          className=" "
          resizeMode="contain"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Images;


