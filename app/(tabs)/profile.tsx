import axios from "axios";
import { Alert, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import EditProfilePhotoModal from './EditProfilePhotoModal';
import { Pencil } from "lucide-react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Profile = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  // const [user, setUser] = useState<any>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(
    user?.profile ? { uri: user.profile } : null
  );

   React.useEffect(() => {
    if (user?.profile) {
      setProfileImage({ uri: user.profile });
    }
  }, [user?.profile]);

 

  return (
    <ScrollView className="bg-white">
      <View className="bg-white rounded-2xl mx-4 mt-4 py-4 px-4 border border-gray-200 ">
        <View className="flex-row items-center space-x-4 gap-4">
          <View className="items-center ">
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View className="relative">
                <Image
                  source={
                    profileImage
                      ? { uri: profileImage.uri }
                      : require('../../assets/images/profile.png')
                  }
                  style={{ width: 70, height: 70, borderRadius: 50 }}
                />
                <View className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
                  <Pencil size={16} color="#000" />
                </View>
              </View>
            </TouchableOpacity>

            <EditProfilePhotoModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              setProfileImage={setProfileImage}   
            />
          </View>

          <View>
          <Text className="text-lg font-bold text-black">
              {user?.first_name && user?.last_name
                ? `${user.first_name} ${user.last_name}`
                : "Not Logged In"}
            </Text>
            <View className="flex-row items-center space-x-2 mt-1 border border-gray-300 ">
              <Text className="text-xs text-gray-600   px-2 py-1 ml-2">
                Get Verified
              </Text>
              <FontAwesome name="check-circle" size={14} color="purple" />
            </View>
          <Text className="text-xs text-gray-500 mt-3">
              Joined on {user?.created_at?.slice(0, 10) || "Unknown"}
            </Text>
          </View>
        </View>
        
      </View>

      <View className="flex-row justify-center space-x-4 mt-6 mx-4">
        <TouchableOpacity className="border border-gray-200 px-6 py-3 rounded-xl w-40 flex-column items-center justify-center mr-7 ">
          <FontAwesome name="th-list" size={18} color="purple" />
          <Text className="text-black font-bold ml-2 mt-3">My Ads</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-200 px-6 py-3 rounded-xl w-1/2 flex-column items-center justify-center ">
          <FontAwesome name="bookmark" size={18} color="purple" />
          <Text className="text-black font-bold ml-2 mt-3">My Search</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-6 px-6 gap-3">
        <TouchableOpacity
          onPress={() => router.push("/file")}
          className="flex-row items-center justify-between py-4 "
        >
          <View className="flex-row items-center space-x-3">
            <Image source={require("../../assets/images/profile1.png")} />
            <Text className="text-black ml-3">Profile</Text>
          </View>
          <Image
            source={require("../../assets/images/next.png")}
            className="w-4 h-4"
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between py-4">
          <View className="flex-row items-center space-x-3">
            <Image
              source={require("../../assets/images/account.png")}
              className="w-6 h-6"
            />
            <Text className="text-black ml-3">Settings</Text>
          </View>
          <Image
            source={require("../../assets/images/next.png")}
            className="w-4 h-4"
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between py-4">
          <View className="flex-row items-center space-x-3">
            <Image
              source={require("../../assets/images/notification.png")}
              className="w-6 h-6"
            />
            <Text className="text-black ml-3">Notification Setting</Text>
          </View>
          <Image
            source={require("../../assets/images/next.png")}
            className="w-4 h-4"
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-200">
          <View className="flex-row items-center space-x-3">
            <Image
              source={require("../../assets/images/lock.png")}
              className="w-6 h-6"
            />
            <Text className="text-black ml-3">Security</Text>
          </View>
          <Image
            source={require("../../assets/images/next.png")}
            className="w-4 h-4"
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between py-4 ">
          <View className="flex-row items-center space-x-3">
            <Image
              source={require("../../assets/images/city.png")}
              className="w-6 h-6"
            />
            <Text className="text-black ml-3 ">City</Text>
          </View>
          {/* <Text className="text-gray-500  ">All UAE</Text> */}
          <Image
            source={require("../../assets/images/next.png")}
            className="w-4 h-4"
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-200 ">
          <View className="flex-row items-center space-x-3">
            <Image
              source={require("../../assets/images/lock.png")}
              className="w-6 h-6"
            />
            <Text className="text-black ml-3">Language</Text>
          </View>
          {/* <Text className="text-gray-500 ">English</Text> */}
          <Image
            source={require("../../assets/images/next.png")}
            className="w-4 h-4"
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between py-4  ">
          <View className="flex-row items-center space-x-3">
            <Image
              source={require("../../assets/images/lock.png")}
              className="w-6 h-6"
            />
            <Text className="text-black ml-3">Blogs</Text>
          </View>
          <Image
            source={require("../../assets/images/next.png")}
            className="w-4 h-4"
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between py-4 ">
          <View className="flex-row items-center space-x-3">
            <Image
              source={require("../../assets/images/support.png")}
              className="w-6 h-6"
            />
            <Text className="text-black ml-3">Support</Text>
          </View>
          <Image
            source={require("../../assets/images/next.png")}
            className=""
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between py-4 ">
          <View className="flex-row items-center space-x-3">
            <Image
              source={require("../../assets/images/call.png")}
              className="w-6 h-6"
            />
            <Text className="text-black ml-3">Call Us</Text>
          </View>
          <Image
            source={require("../../assets/images/next.png")}
            className="w-4 h-4"
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-between py-4 ">
          <View className="flex-row items-center space-x-3">
            <Image
              source={require("../../assets/images/term.png")}
              className="w-6 h-6"
            />
            <Text className="text-black ml-3">Terms & Condition</Text>
          </View>
          <Image
            source={require("../../assets/images/next.png")}
            className="w-4 h-4"
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-between py-4"
         

          onPress={async () => {
            try {
              const token = await AsyncStorage.getItem("token");

              console.log("Stored token value:", token);

              if (!token || typeof token !== "string") {
                Alert.alert("Error", "Invalid token. Please log in again.");
                return;
              }

              const response = await axios.post(
                "https://backend.gamergizmo.com/auth/logoutUser",
                JSON.stringify({ token: token.trim() }),
                {
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                  },
                }
              );

              if (response.status === 200 || response.status === 201) {

                Alert.alert("Success", "You have been logged out.");
                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("user");
                router.replace("/auth/login");
              } else {
                console.warn("Logout non-200 response:", response.status, response.data);
                Alert.alert("Logout Failed", "Unexpected server response.");
              }
            } catch (error: any) {
              console.error("Logout error", error.response?.data || error.message);
              Alert.alert("Error", "Failed to log out. Please try again.");
            }
          }}


        >
          <View className="flex-row items-center space-x-3">
            <Image
              source={require("../../assets/images/logout.png")}
              className="w-6 h-6"
            />
            <Text className="text-black ml-3">Logout</Text>
          </View>
          <Image
            source={require("../../assets/images/next.png")}
            className="w-4 h-4"
          />
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

export default Profile;
