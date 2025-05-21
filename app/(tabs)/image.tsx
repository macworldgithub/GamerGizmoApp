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
import { setImageUris } from "../../store/slice/adSlice";
import { useRouter } from "expo-router";
import { Link } from "expo-router";

const Images = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async () => {
    if (selectedImages.length >= 5) {
      Alert.alert("Limit Reached", "You can only upload up to 5 images.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = result.assets[0].uri;
      setSelectedImages((prev) => [...prev, newImage]);
    }
  };

  const handleUpload = async () => {
    if (selectedImages.length < 3) {
      Alert.alert("Minimum Images", "Please select at least 3 images.");
      return;
    }

    setIsUploading(true);

    for (const uri of selectedImages) {
      const formData = new FormData();
      formData.append("file", {
        uri,
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
          Alert.alert("Upload Failed", `Error uploading image: ${uri}`);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Something went wrong during upload.");
      }
      finally {
        setIsUploading(false); // end loading
      }
    }

    Alert.alert("Success", "All images uploaded successfully!");
    dispatch(setImageUris(selectedImages));
  };

  const handleReset = () => {
    setSelectedImages([]);
    //@ts-ignore
    dispatch(setImageUris(null));
  };

  const goToViewDetails = () => {
    if (selectedImages.length < 3) {
      Alert.alert("Image Requirement", "Please upload at least 3 images.");
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
          Upload Images
        </Text>
      </View>

      <TouchableOpacity
        className="bg-gray-100 rounded-lg h-60 justify-center items-center mb-6"
        onPress={pickImage}
      >
        <Ionicons name="cloud-upload-outline" size={40} color="gray" />
        <Text className="text-gray-500 mt-2">Select Images (min 3, max 5)</Text>
      </TouchableOpacity>

      {selectedImages.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          {selectedImages.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 8,
                marginRight: 10,
              }}
              resizeMode="cover"
            />   
          ))}
        </ScrollView>
      )}

      {selectedImages.length > 0 && (
        <View className="flex-row justify-between mb-10 space-x-4">
          <TouchableOpacity
            onPress={handleUpload}
            className={`flex-1 ${selectedImages.length > 5 || isUploading ? "bg-gray-300" : "bg-blue-500"} py-3 rounded-lg items-center`}
            disabled={selectedImages.length > 5 || isUploading}
          >
            <Text className="text-white font-semibold">
              {isUploading ? "Uploading..." : "Upload"}
            </Text>
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


