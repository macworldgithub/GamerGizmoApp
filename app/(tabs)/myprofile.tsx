// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ScrollView,
// } from "react-native";
// import { RadioButton } from "react-native-paper";
// import DatePicker from "react-native-date-picker";
// import { useRouter } from "expo-router";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { InitializeUserData } from "../../store/slice/loginSlice";
// import { API_BASE_URL } from "@/utils/config";

// const MyProfile = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const user = useSelector((state) => state.login.userData);
//   const token = useSelector((state) => {
//     console.log("Redux login state:", state.login);
//     return state.login.token;
//   });

//   const [dob, setDob] = useState<Date | null>(null);
//   const [open, setOpen] = useState(false);
//   const [gender, setGender] = useState("male");
//   const [nationality, setNationality] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isDirty, setIsDirty] = useState(false);
//   // Populate fields when component loads
//   useEffect(() => {
//     if (user) {
//       setFirstName(user.first_name || "");
//       setLastName(user.last_name || "");
//       setDob(user.dob ? new Date(user.dob) : null);
//       setGender(user.gender?.toLowerCase() || "male");
//       setNationality(user.nationality || ""); // fallback if missing
//     }
//   }, [user]);

//   useEffect(() => {
//     if (!user) return;

//     const isChanged =
//       firstName !== (user.first_name || "") ||
//       lastName !== (user.last_name || "") ||
//       nationality !== (user.nationality || "") ||
//       gender !== (user.gender?.toLowerCase() || "male") ||
//       (dob?.toISOString() !== new Date(user.dob)?.toISOString());

//     setIsDirty(isChanged);
//   }, [firstName, lastName, nationality, gender, dob, user]);

//   // const handleSave = async () => {
//   //   console.log("Token being sent:", token);
//   //   setLoading(true);
//   //   try {
//   //     const updatedData = {
//   //       first_name: firstName,
//   //       last_name: lastName,
//   //       dob: dob?.toISOString(),
//   //       gender,
//   //       nationality,
//   //     };

//   //     // Send update request
//   //     const res = await axios.post(`${API_BASE_URL}/user/updateUserData`, updatedData, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //         'Content-Type': 'application/json',
//   //       },
//   //     });

//   //     if (res.status === 200) {
//   //       // ✅ Fetch updated data
//   //       const freshUser = await axios.get(`${API_BASE_URL}/user/getUserData`, {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       });
//   //       console.log("freshUser", freshUser.data);
//   //       console.error("freshUser", freshUser.data);

//   //       // ✅ Update Redux store
//   //       dispatch(InitializeUserData({ ...freshUser.data, token }));
//   //       Alert.alert("Success", "Profile updated successfully!");
//   //     }
//   //   } catch (error) {
//   //     Alert.alert("Error", "Failed to update profile.");
//   //     console.error("Update Error: ", error);
//   //     console.error(error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


//   const handleSave = async () => {
//   console.log("Token being sent:", token);
//   setLoading(true);
//   try {
//     const updatedData = {
//       first_name: "Areebaaa",
//       last_name: "Khan",
//       phone: "031928643198",
//       dob: "2025-04-04T00:00:00.000Z",
//       gender: "Female",
//       address: null,
//     };

//     const res = await axios.post(`${API_BASE_URL}/user/updateUserData`, updatedData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (res.status === 200) {
//       const freshUser = await axios.get(`${API_BASE_URL}/user/getUserData`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       dispatch(InitializeUserData({ ...freshUser.data, token }));
//       Alert.alert("Success", "Profile updated successfully!");
//     }
//   } catch (error) {
//     Alert.alert("Error", "Failed to update profile.");
//     console.error("Update Error: ", error);
//   } finally {
//     setLoading(false);
//   }
// };



//   return (
//     <ScrollView className="p-5 bg-white h-full px-6">
//       {/* Header */}
//       <View className="flex-row items-center mb-6">
//         <TouchableOpacity onPress={() => router.push("/file")}>
//           <Image source={require("../../assets/images/arrow.png")} />
//         </TouchableOpacity>
//         <Text className="text-lg font-semibold ml-24">My Profile</Text>
//       </View>

//       {/* Profile Fields */}
//       <Text className="text-gray-900 font-semibold mb-1">Profile Name</Text>
//       <Text className="text-gray-400 text-sm mb-2">This is displayed on your profile</Text>
//       <TextInput value={firstName} onChangeText={setFirstName} placeholder="First Name" className="border border-gray-300 p-3 rounded-lg mb-3" />
//       <TextInput value={lastName} onChangeText={setLastName} placeholder="Last Name" className="border border-gray-300 p-3 rounded-lg mb-4" />

//       <Text className="text-gray-900 font-semibold mb-1">Account details</Text>
//       <Text className="text-gray-400 text-sm mb-2">This is not visible to other users</Text>
//       <TouchableOpacity onPress={() => setOpen(true)} className="border border-gray-300 p-3 rounded-lg flex-row justify-between items-center mb-4">
//         <Text className="text-gray-400">{dob ? dob.toLocaleDateString() : "MM/ DD/ YYYY"}</Text>
//         <Image source={require("../../assets/images/calender.png")} className="w-5 h-5" />
//       </TouchableOpacity>

//       <DatePicker
//         modal
//         open={open}
//         date={dob || new Date()}
//         mode="date"
//         onConfirm={(date) => {
//           setOpen(false);
//           setDob(date);
//         }}
//         onCancel={() => setOpen(false)}
//       />

//       <Text className="text-gray-900 font-semibold mb-1">Nationality</Text>
//       <TextInput value={nationality} onChangeText={setNationality} placeholder="Search Country" className="border border-gray-300 p-3 rounded-lg mb-6" />

//       <Text className="text-gray-900 font-semibold mb-2">Gender</Text>
//       <View className="flex-row items-center mb-8">
//         <RadioButton value="male" status={gender === "male" ? "checked" : "unchecked"} onPress={() => setGender("male")} color="#6C63FF" />
//         <Text className="mr-5">Male</Text>
//         <RadioButton value="female" status={gender === "female" ? "checked" : "unchecked"} onPress={() => setGender("female")} color="#6C63FF" />
//         <Text>Female</Text>
//       </View>

//       <TouchableOpacity
//         onPress={handleSave}
//         className={`py-3 rounded-lg ${isDirty ? "bg-black" : "bg-gray-400"}`}
//         disabled={!isDirty || loading}
//       >
//         <Text className="text-white text-center text-base font-semibold">
//           {loading ? "Saving..." : "Save"}
//         </Text>
//       </TouchableOpacity>

//     </ScrollView>
//   );
// };

// export default MyProfile;


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { API_BASE_URL } from '@/utils/config';
import {useRouter} from 'expo-router';

const EditProfileScreen = () => {
  const token = useSelector((state: RootState) => state.user.token);
  console.log('Token:', token);
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    dob: '',
    gender: 'male',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/user/getUserData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
       console.log('API response:', res.data);
      const data = res.data.data;
      console.log('Fetched data:', data);
      setFormData({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        phone: data.phone || '',
        dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : '',
        gender: data.gender || 'male',
        address: data.address || '',
      });
      setLoading(false);
    } catch (error) {
      console.log('Error fetching profile:', error?.message);
      Toast.show({ type: 'error', text1: 'Failed to fetch data' });
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [key]: '' });
  };

  const validate = () => {
    const newErrors: any = {};
    ['first_name', 'last_name', 'phone', 'dob', 'gender'].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace('_', ' ')} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async () => {
  //   if (!validate()) return;

  //   try {
  //     const res = await axios.post(
  //       `${API_BASE_URL}/user/updateUserData`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (res.status === 201) {
  //       alert('Profile updated successfully');
  //       console.log('Profile updated successfully:', res.data);
  //       // Toast.show({ type: 'success', text1: 'Profile updated successfully' });
  //       router.push('/profile');
  //     } else {
  //       Toast.show({ type: 'error', text1: 'Update failed' });
  //     }
  //   } catch (error) {
  //     Toast.show({ type: 'error', text1: 'Error updating profile' });
  //   }
  // };


  const handleSubmit = async () => {
  if (!validate()) return;

  console.log('Submitting data:', formData); // Log the data before sending

  try {
    const res = await axios.post(
      `${API_BASE_URL}/user/updateUserData`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('API Response:', res.data); // Log the full response

    if (res.status === 201 || res.status === 200) {
      Toast.show({ type: 'success', text1: 'Profile updated successfully' });
      console.log('Profile updated successfully');
      router.push('/profile'); // navigate back
    } else {
      console.log('Unexpected response status:', res.status);
      Toast.show({ type: 'error', text1: 'Update failed, unexpected status' });
    }
  } catch (error) {
    console.log('Error updating profile:', error?.response?.data || error.message);
    Toast.show({ type: 'error', text1: 'Error updating profile' });
  }
};



  useEffect(() => {
     console.log('useEffect running');  
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#7c3aed" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold text-center mb-4">Edit Profile</Text>

      {[
        { label: 'First Name', key: 'first_name' },
        { label: 'Last Name', key: 'last_name' },
        { label: 'Phone', key: 'phone' },
        { label: 'Date of Birth', key: 'dob' },
        { label: 'Gender', key: 'gender' },
        { label: 'Address', key: 'address' },
      ].map(({ label, key }) => (
        <View key={key} className="mb-4">
          <Text className="text-gray-700 mb-1">{label}</Text>
          <TextInput
            value={formData[key]}
            onChangeText={(text) => handleChange(key, text)}
            placeholder={label}
            keyboardType={key === 'phone' ? 'phone-pad' : 'default'}
            className="border border-gray-300 rounded-md px-4 py-2 text-black"
          />
          {errors[key] && <Text className="text-red-500 text-sm">{errors[key]}</Text>}
        </View>
      ))}

      <TouchableOpacity onPress={handleSubmit} className="bg-purple-600 p-3 rounded-md mt-2">
        <Text className="text-white text-center font-semibold">Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;