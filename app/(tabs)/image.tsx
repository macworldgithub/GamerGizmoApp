import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setImageUris } from "../../store/slice/adSlice";
import { useRouter } from "expo-router";
import { Modal } from "react-native";
import { Link } from "expo-router";
import { BlurView } from 'expo-blur';


const Images = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [imageSourceModalVisible, setImageSourceModalVisible] = useState(false);


  const pickImage = () => {
    if (selectedImages.length >= 5) {
      Alert.alert("Limit Reached", "You can only upload up to 5 images.");
      return;
    }

    // 👇 Custom bottom modal visible karein
    setImageSourceModalVisible(true);
  };


  const pickFromGallery = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission Denied", "Photo library access is required.");
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

  const takePhotoWithCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera access is required.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
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

      // try {
      //   const response = await fetch("https://your-backend.com/upload", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //     body: formData,
      //   });

      //   if (!response.ok) {
      //     Alert.alert("Upload Failed", `Error uploading image: ${uri}`);
      //   }
      // } catch (error) {
      //   console.error(error);
      //   Alert.alert("Error", "Something went wrong during upload.");
      // }
      // finally {
      //   setIsUploading(false); // end loading
      // }
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

    <>

      <Modal
        visible={imageSourceModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setImageSourceModalVisible(false)}
      >
        <BlurView intensity={20} tint="dark" className="flex-1 justify-end">
          <View className="flex-1 justify-end bg-black bg-opacity-50">
            <View className="bg-white rounded-t-2xl p-6">
              <Text className="text-lg font-bold text-center mb-4">Select Image Source</Text>

              <TouchableOpacity
                className="bg-[#D53AFB]  rounded-lg py-3 mb-3 items-center"
                onPress={() => {
                  setImageSourceModalVisible(false);
                  takePhotoWithCamera();
                }}
              >
                <Text className="text-white font-semibold">Take Photo with Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-[#9341f3] rounded-lg py-3 mb-3 items-center"
                onPress={() => {
                  setImageSourceModalVisible(false);
                  pickFromGallery();
                }}
              >
                <Text className="text-white font-semibold">Choose from Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="py-3 items-center"
                onPress={() => setImageSourceModalVisible(false)}
              >
                <Text className="text-gray-500 font-semibold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>


      <ScrollView className="flex-1 bg-white px-4 py-6">
        <TouchableOpacity className={`flex-row items-center border-b border-gray-200 pb-4 mb-6 ${Platform.OS === "ios" ? "mt-16" : "mt-4"}`}
          onPress={() => router.push('/set')}
        >

          <TouchableOpacity>
            <Image source={require("../../assets/images/left.png")} />
          </TouchableOpacity>

          <Text className="text-black text-base font-semibold flex-1 text-center -ml-6">
            Upload Images
          </Text>
        </TouchableOpacity>

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
    </>
  );
};

export default Images;


