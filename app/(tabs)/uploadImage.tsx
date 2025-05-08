import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function UploadImageScreen() {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need permission to access your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Upload Image</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Upload Box */}
      <View className="flex items-center justify-start px-4 mt-10">
        <TouchableOpacity
          onPress={handleImagePick}
          className="w-64 h-64 border border-gray-300 bg-gray-200 rounded-lg items-center justify-center"
        >
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          ) : (
            <>
              <Image
                source={require('../../assets/images/uploadimg.png')}
                className="w-10 h-10 mb-2"
              />
              <Text className="text-gray-500">Upload Image</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Next Button */}
        <TouchableOpacity className="items-center mt-8">
          <Image
            source={require('../../assets/images/next1.png')}
            className=""
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}