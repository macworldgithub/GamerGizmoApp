import React from 'react';
import { Modal, TouchableOpacity, Text, View, Alert, ImageURISource } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { API_BASE_URL } from '@/utils/config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from 'react-redux';
import { UpdateUserField } from '../../store/slice/loginSlice';

interface EditProfilePhotoModalProps {
  visible: boolean;
  onClose: () => void;
  setProfileImage: (image: { uri: string } | null) => void;
}

const EditProfilePhotoModal: React.FC<EditProfilePhotoModalProps> = ({
  visible,
  onClose,
  setProfileImage,
}) => {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();

  const uploadImageToServer = async (image: ImagePicker.ImagePickerAsset) => {
  try {
    if (!token) {
      Alert.alert('Not Logged In', 'Please log in to update your profile picture.');
      setProfileImage(null);
      // setProfileImage(require('../../assets/images/profile1.png'));
      return;
    }

    const formData = new FormData();
    formData.append('profile', {
      uri: image.uri,
      name: 'profile.jpg',
      type: 'image/jpeg',
    } as any);

    const response = await axios.post(
      `${API_BASE_URL}/user/updateProfilePicture`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      const imageUrl = image.uri; // or `response.data.imageUrl` if backend gives you the hosted URL
      setProfileImage({ uri: imageUrl });
       dispatch(UpdateUserField({ key: 'profile', value: imageUrl }));


      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        user.profile = imageUrl;
        await AsyncStorage.setItem("user", JSON.stringify(user));
      }

      Alert.alert('Success', 'Profile picture updated!');
    } else {
      Alert.alert('Upload Failed', 'Unexpected server response.');
    }
  } catch (error) {
    console.error('Upload error:', error);
    Alert.alert('Error', 'Something went wrong while uploading the image.');
  }
};
  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled) {
        await uploadImageToServer(result.assets[0]);
        onClose();
      }
    }
  };

  const handleChooseFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      await uploadImageToServer(result.assets[0]);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-2xl px-6 pt-6 pb-8">
          <TouchableOpacity className="absolute top-4 right-4 z-10" onPress={onClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>

          <Text className=" text-xl font-semibold mb-6 border-b border-gray-200 py-2">Edit Profile Photo</Text>

          <TouchableOpacity className="py-3 border-b border-gray-200" onPress={handleTakePhoto}>
            <Text className=" text-base ">Take a New Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-3 mt-1" onPress={handleChooseFromLibrary}>
            <Text className="text-base ">Choose from Your Photo Library</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditProfilePhotoModal;
