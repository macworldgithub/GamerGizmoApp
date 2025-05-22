import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useSelector } from "react-redux";

const NicUploadModal = ({ open, setOpen }: any) => {
  const [nicFront, setNicFront] = useState<any>(null);
  const [nicBack, setNicBack] = useState<any>(null);
  const token = useSelector((state: any) => state.user.token);
  console.log(token,"any")

  const pickImage = async (setImage: (img: any) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

//   const handleUpload = async () => {
//     if (!nicFront || !nicBack) {
//       Alert.alert("Error", "Please upload both images.");
//       return;
//     }

//     const formData = new FormData();
//     // formData.append("nic_front_image", {
//     //   uri: nicFront.uri,
//     //   type: "image/jpeg",
//     //   name: "front.jpg",
//     // });
//     // formData.append("nic_back_image", {
//     //   uri: nicBack.uri,
//     //   type: "image/jpeg",
//     //   name: "back.jpg",
//     // });

// formData.append("nic_front_image", {
//   uri: nicFront.uri,
//   type: "image/jpeg",
//   name: "front.jpg",
// } as any); 

// formData.append("nic_back_image", {
//   uri: nicBack.uri,
//   type: "image/jpeg",
//   name: "back.jpg",
// } as any); 



//     try {
//       await axios.post(
//         `https://backend.gamergizmo.com/user/applyForVerification`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       Alert.alert("Success", "Images uploaded successfully!");
//       setOpen(false);
//     } catch (error: any) {
//       Alert.alert("Error", "Upload failed. Please try again.");
//     }
//   };

const handleUpload = async () => {
  if (!nicFront || !nicBack) {
    Alert.alert("Error", "Please upload both images.");
    return;
  }

  const formData = new FormData();

  formData.append("nic_front_image", {
    uri: nicFront.uri,
    name: "front.jpg",
    type: "image/jpeg",
  } as any);

  formData.append("nic_back_image", {
    uri: nicBack.uri,
    name: "back.jpg",
    type: "image/jpeg",
  } as any);

  try {
    const response = await fetch("https://backend.gamergizmo.com/user/applyForVerification", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();
    console.log("Upload result:", result);

    if (response.ok) {
      Alert.alert("Success", "Images uploaded successfully!");
      setOpen(false);
    } else {
      Alert.alert("Upload Failed", result.message || "Something went wrong.");
    }
  } catch (err) {
    console.error("Upload error:", err);
    Alert.alert("Error", "Upload failed. Please try again.");
  }
};




  return (
    <Modal visible={open} transparent animationType="slide">
      <View className="flex-1 bg-black/60 justify-center items-center">
        <View className="bg-white w-[90%] rounded-xl p-5">
          <Text className="text-xl font-bold text-center mb-4">
            Upload Emirates ID
          </Text>

          <TouchableOpacity
            className="border border-gray-300 p-3 rounded-lg mb-3"
            onPress={() => pickImage(setNicFront)}
          >
            <Text className="text-purple-600 text-center">
              {nicFront ? "Front Image Selected" : "Pick Front Image"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="border border-gray-300 p-3 rounded-lg mb-3"
            onPress={() => pickImage(setNicBack)}
          >
            <Text className="text-purple-600 text-center">
              {nicBack ? "Back Image Selected" : "Pick Back Image"}
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-end space-x-4 mt-4">
            <TouchableOpacity
              onPress={() => setOpen(false)}
              className="px-4 py-2 rounded-md bg-gray-300"
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUpload}
              className="px-4 py-2 rounded-md bg-purple-600"
            >
              <Text className="text-white">Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NicUploadModal;
