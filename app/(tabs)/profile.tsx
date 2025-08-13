import { RootState } from "@/store/store";
import { API_BASE_URL } from "@/utils/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { Pencil } from "lucide-react-native";
import { Feather } from "@expo/vector-icons";
import NicUploadModal from "../../components/NicUploadModal";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import CitySelectorModal from "../(tabs)/CityModal";
import ContactModal from "../(tabs)/ContactModal";
import LanguageModal from "../(tabs)/LanguageModal";
import TermsModal from "../(tabs)/TermsModal";
import { LogoutUser } from "../../store/slice/loginSlice";
import EditProfilePhotoModal from "./EditProfilePhotoModal";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import GetStartedBadge from "@/components/GetStartedBadge";

const Profile = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(
    user?.profile ? { uri: user.profile } : null
  );
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState("All UAE");
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [openNicModal, setOpenNicModal] = useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user?.profile) {
      setProfileImage({ uri: user.profile });
    }
  }, [user?.profile]);

  return (
    <ScrollView className="bg-white">
      <View className={`bg-white rounded-2xl mx-4 mt-4 py-4 px-4 border border-gray-200 ${Platform.OS === "ios" ? "mt-24" : "mt-4"}`}>
        <View className="flex-row items-center space-x-4 gap-4">
          <View className="items-center ">
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View className="relative">
                {profileImage ? (
                  <>
                    <Image
                      source={{ uri: profileImage.uri }}
                      style={{ width: 70, height: 70, borderRadius: 50 }}
                    />
                  </>
                ) : (
                  <View
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 50,
                      backgroundColor: "#f0f0f0",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome name="user-circle" size={70} color="#999" />
                  </View>
                )}

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
            <TouchableOpacity
              onPress={() => setOpenNicModal(true)}
              className=" px-4 py-2 rounded-lg"
            >
              <View className={`border border-gray-200 px-4 py-2 rounded-lg flex-row gap-2 ${Platform.OS === "ios" ? "-ml-6" : "ml-0"}`}>
                <Text className="text-black text-xs">Get Verified</Text>

                <FontAwesome name="check-circle" size={14} color="purple" />
              </View>
            </TouchableOpacity>

            <NicUploadModal open={openNicModal} setOpen={setOpenNicModal} />
            <Text className="text-xs text-gray-500 mt-3">
              Joined on {user?.created_at?.slice(0, 10) || "Unknown"}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row justify-center space-x-4 mt-6 mx-4">
        <TouchableOpacity
          onPress={() => router.push("/adds")}
          className="border border-gray-200 px-6 py-3 rounded-xl w-40 flex-column items-center justify-center mr-7 "
        >
          <FontAwesome name="th-list" size={18} color="purple" />
          <Text className="text-black font-bold ml-2 mt-3">My Ads</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border border-gray-200 px-6 py-3 rounded-xl w-40 flex-column items-center justify-center mr-7 "
          onPress={() => router.push("/store")}
        >
          <FontAwesome5 name="store" size={18} color="purple" />
          {/* <FontAwesome name="fa-solid fa-store" size={18} color="purple" /> */}
          <Text className="text-black font-bold ml-2 mt-3">Store</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-6 px-6 gap-3">
        <TouchableOpacity
          onPress={() => router.push("/UserInfo")}
          className="flex-row items-center justify-between py-4 "
        >
          <View className="flex-row items-center space-x-3">
            <FontAwesome5 name="user" size={22} color="#9341f3" />
            <Text className="text-black ml-3">Profile</Text>
          </View>
          <Image
            source={require("../../assets/images/next.png")}
            className="w-4 h-4"
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-between py-4"
          onPress={() => router.push("/AddToCart")}
        >
          <View className="flex-row items-center space-x-3">
            <FontAwesome5 name="cart-plus" size={22} color="#9341f3" />
            <Text className="text-black ml-3">My Cart Items</Text>
          </View>
          <Image
            source={require("../../assets/images/next.png")}
            className="w-4 h-4"
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-between py-4 border-b border-gray-200"
          onPress={() => router.push("/Orders")}
        >
          <View className="flex-row items-center space-x-3">
            <FontAwesome5 name="shopping-bag" size={22} color="#9341f3" />
            <Text className="text-black ml-3">My Orders</Text>
          </View>
          <Image
            source={require("../../assets/images/next.png")}
            className="w-4 h-4"
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-between py-4"
          onPress={() => setCityModalVisible(true)}
        >
          <View className="flex-row items-center space-x-3">
            <MaterialIcons name="location-city" size={22} color="#9341f3" />
            <Text className="text-black ml-3">City</Text>
          </View>
          <Text className="text-gray-500">{selectedCity}</Text>
        </TouchableOpacity>

        {/* City Selector Modal */}
        <CitySelectorModal
          //@ts-ignore
          visible={cityModalVisible}
          //@ts-ignore
          onClose={() => setCityModalVisible(false)}
          selectedCity={selectedCity}
          onSelect={(city: any) => setSelectedCity(city)}
        />

        <TouchableOpacity
          className="flex-row items-center justify-between py-4 border-b border-gray-200"
          onPress={() => setLanguageModalVisible(true)}
        >
          <View className="flex-row items-center space-x-3">
            <Feather name="globe" size={22} color="#9341f3" />

            <Text className="text-black ml-3">Language</Text>
          </View>
          <Text className="text-gray-500">{selectedLanguage}</Text>
        </TouchableOpacity>

        <LanguageModal
          visible={languageModalVisible}
          selected={selectedLanguage}
          onClose={() => setLanguageModalVisible(false)}
          onSelect={(lang: any) => setSelectedLanguage(lang)}
        />

        <TouchableOpacity
          className="flex-row items-center justify-between py-4 "
          onPress={() => router.push("/blog")}
        >
          <View className="flex-row items-center space-x-3">
            <MaterialIcons name="article" size={22} color="#9341f3" />

            <Text className="text-black ml-3">Blogs</Text>
          </View>
          <Image
            source={require("../../assets/images/next.png")}
            className="w-4 h-4"
          />
        </TouchableOpacity>

        <View className="">
          {/* Your Call Us button */}
          <TouchableOpacity
            className="flex-row items-center space-x-3"
            onPress={() => setContactModalVisible(true)}
          >
            <Ionicons name="call" size={22} color="#9341f3" />

            <Text className="text-black  ">Call Us</Text>
          </TouchableOpacity>

          {/* Contact Modal */}
          <ContactModal
            visible={contactModalVisible}
            onClose={() => setContactModalVisible(false)}
          />
        </View>
        <TouchableOpacity
          className="flex-row items-center justify-between py-4"
          onPress={() => setTermsModalVisible(true)}
        >
          <View className="flex-row items-center space-x-3">
            <Entypo name="text-document" size={22} color="#9341f3" />

            <Text className="text-black ml-3">Terms & Condition</Text>
          </View>
          <Image
            source={require("../../assets/images/next.png")}
            className="w-4 h-4"
          />
        </TouchableOpacity>

        <TermsModal
          visible={termsModalVisible}
          onClose={() => setTermsModalVisible(false)}
        />

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
                `${API_BASE_URL}/auth/logoutUser`,
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
                dispatch(LogoutUser());
                router.replace("/login");
              } else {
                console.warn(
                  "Logout non-200 response:",
                  response.status,
                  response.data
                );
                Alert.alert("Logout Failed", "Unexpected server response.");
              }
            } catch (error: any) {
              console.error(
                "Logout error",
                error.response?.data || error.message
              );
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
