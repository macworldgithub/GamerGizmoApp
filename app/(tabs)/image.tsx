import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setImageUri } from "../../store/slice/adSlice";
import { useRouter } from "expo-router";
import { Link } from "expo-router";

const Images = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = result.assets[0].uri;
      setSelectedImage(newImage);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      Alert.alert("No Image", "Please select an image.");
      return;
    }

    // Save the selected image to Redux
    dispatch(setImageUri(selectedImage));

    const formData = new FormData();
    formData.append("file", {
      uri: selectedImage,
      name: "photo.jpg",
      type: "image/jpeg",
    } as any);

    try {
      const response = await fetch("https://your-backend.com/upload", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (!response.ok) {
        Alert.alert("Upload Failed", "Error uploading the image.");
        return;
      }

      Alert.alert("Success", "Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong during upload.");
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    dispatch(setImageUri(null));
  };

  const goToViewDetails = () => {
    if (!selectedImage) {
      Alert.alert("Image Required", "Please select an image.");
      return;
    }

    router.push("/(tabs)/ViewDetails");
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <View className="flex-row items-center border-b border-gray-200 pb-4 mb-6">
        <Link href="/set" asChild>
          <TouchableOpacity>
            <Image source={require("../../assets/images/left.png")} />
          </TouchableOpacity>
        </Link>
        <Text className="text-black text-base font-semibold flex-1 text-center -ml-6">
          Upload Image
        </Text>
      </View>

      <TouchableOpacity
        className="bg-gray-100 rounded-lg h-60 justify-center items-center mb-6"
        onPress={pickImage}
      >
        <Ionicons name="cloud-upload-outline" size={40} color="gray" />
        <Text className="text-gray-500 mt-2">Upload Image</Text>
      </TouchableOpacity>

      {selectedImage && (
        <View className="mb-6">
          <Image
            source={{ uri: selectedImage }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
        </View>
      )}

      {selectedImage && (
        <View className="flex-row justify-between mb-10 space-x-4">
          <TouchableOpacity
            onPress={handleUpload}
            className="flex-1 bg-blue-500 py-3 rounded-lg items-center"
          >
            <Text className="text-white font-semibold">Upload</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleReset}
            className="flex-1 bg-red-500 py-3 rounded-lg items-center"
          >
            <Text className="text-white font-semibold">Reset</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={goToViewDetails}
        className="items-center mb-10"
      >
        <Image
          source={require("../../assets/images/next1.png")}
          style={{ width: 120, height: 40 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Images;
