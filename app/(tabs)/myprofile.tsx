import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Picker } from '@react-native-picker/picker';
import { API_BASE_URL } from '@/utils/config';
import { InitializeUserData } from '@/store/slice/loginSlice';
import { useRouter } from 'expo-router';
type GenderType = 'male' | 'female' | 'other';

type FormDataType = {
  first_name: string;
  last_name: string;
  phone: string;
  dob: string;
  gender: GenderType;
  address: string;
};

const EditProfileScreen = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormDataType>({
    first_name: '',
    last_name: '',
    phone: '',
    dob: '2004-05-24',
    gender: 'male',
    address: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormDataType, string>>>({});
  const router = useRouter();
  const handleChange = (name: keyof FormDataType, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const fetchProfileData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/user/getUserData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data.data;
      setFormData({
        first_name: data?.first_name || '',
        last_name: data?.last_name || '',
        phone: data?.phone || '',
        dob: data?.dob?.slice(0, 10) || '2004-05-24',
        gender: data?.gender || 'male',
        address: data?.address ?? '',
      });
      dispatch(InitializeUserData(data));

    } catch (error) {
      console.log('Fetch Error:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleSave = async () => {
    const newErrors: any = {};
    ['first_name', 'last_name', 'phone', 'dob', 'gender'].forEach((key) => {
      const field = key as keyof FormDataType;
      if (!formData[field]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payloadToSend = {
      ...formData,
      dob: new Date(formData.dob).toISOString(),
      address: formData.address?.trim() === '' ? null : formData.address,
    };

    console.log('Payload to send:', payloadToSend);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/user/updateUserData`,
        payloadToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        Alert.alert('Success', 'Profile updated successfully');
        // No setRefetch needed
        dispatch(InitializeUserData(payloadToSend));
      } else {
        Alert.alert('Error', 'Update failed. Try again.');
      }
    } catch (error: any) {
      console.log('Update error:', error?.response || error.message);
      Alert.alert('Update error', error?.response?.data?.message || error.message);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <View className="flex-row items-center p-4 border-b border-gray-200 mt-1 mb-2">
        <TouchableOpacity onPress={() => router.push('/file')}>
          <Image source={require("../../assets/images/arrow.png")} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold ml-32">Edit Profile</Text>
      </View>
      <InputField
        label="First Name"
        value={formData.first_name}
        onChangeText={(text) => handleChange('first_name', text)}
        error={errors.first_name}
      />
      <InputField
        label="Last Name"
        value={formData.last_name}
        onChangeText={(text) => handleChange('last_name', text)}
        error={errors.last_name}
      />
      <InputField
        label="Phone"
        value={formData.phone}
        onChangeText={(text) => handleChange('phone', text)}
        error={errors.phone}
      />
      <InputField
        label="Date of Birth"
        value={formData.dob}
        onChangeText={(text) => handleChange('dob', text)}
        error={errors.dob}
      />

      <Text className="text-sm text-gray-700 mb-1">Gender</Text>
      <View className="border border-gray-300 rounded mb-2">
        <Picker
          selectedValue={formData.gender}
          onValueChange={(value: GenderType) => handleChange('gender', value)}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>
      {errors.gender && <Text className="text-red-500 text-xs mb-2">{errors.gender}</Text>}

      <InputField
        label="Address"
        value={formData.address}
        onChangeText={(text) => handleChange('address', text)}
        error={errors.address}
      />

      <View className="flex-row justify-end mt-4">
        <TouchableOpacity onPress={handleSave} className="bg-purple-800 px-4 py-2 rounded">
          <Text className="text-white font-bold">Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
};

const InputField = ({ label, value, onChangeText, error }: InputFieldProps) => (
  <View className="mb-3">
    <Text className="text-sm text-gray-700 mb-1">{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      className="border border-gray-300 rounded px-3 py-2 text-base"
    />
    {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
  </View>
);

export default EditProfileScreen;
