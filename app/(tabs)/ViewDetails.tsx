import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@/utils/config";

const ViewDetails: React.FC = ({ navigation }: any) => {
  const adData = useSelector((state: RootState) => state.ad);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const isComponentsCategory = adData.category?.id === 3;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const token = await AsyncStorage.getItem("token");
        if (user && token) {
          const parsedUser = JSON.parse(user);
          setUserData({
            ...parsedUser,
            id: await AsyncStorage.getItem("userId"),
            token,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUserData();
  }, []);


  const handlePostAd = async () => {
    setLoading(true);
    const formData = new FormData();

    const isComponentsCategory = adData.category?.id === 3;
    const isComponentOrAccessory = isComponentsCategory && (adData.details.itemType === "components" || adData.details.itemType === "accessories");

    if (isComponentOrAccessory) {
      //  New payload for components/accessories only
      formData.append("name", adData.details.title || "");
      formData.append("user_id", userData?.id?.toString() || "");
      formData.append("description", adData.details.description || "");
      formData.append("price", adData.price?.toString() || "");
      formData.append("stock", (adData.details as any).stock || "1");
      formData.append("brand_id", "0");
      formData.append("model_id", "0");
      formData.append("category_id", adData.category?.id?.toString() || "");
      formData.append("condition", adData.details.conditionId?.toString() || "");
      formData.append("location", adData.details.locationId?.toString() || "");
      formData.append("is_published", "true");
      if (adData.details.itemType === "components") {
        formData.append("component_type", adData.details.componentTypeId?.toString() || "");
      } else if (adData.details.itemType === "accessories") {
        formData.append("component_type", "0");
      }
      adData.imageUris.forEach((uri, index) => {
        formData.append("images", {
          uri,
          name: `image_${index}.jpg`,
          type: "image/jpeg",
        } as any);
      });
    } else {

      formData.append("name", adData.details.title || "");
      formData.append("user_id", userData?.id?.toString() || "");
      formData.append("description", adData.details.description || "");
      formData.append("price", adData.price?.toString() || "");
      formData.append("stock", "1");
      formData.append("brand_id", adData.details.brandId?.toString() || "");
      formData.append("model_id", adData.details.modelId?.toString() || "");
      formData.append("category_id", adData.category?.id?.toString() || "");
      formData.append("condition", adData.details.conditionId?.toString() || "");
      formData.append("location", adData.details.locationId?.toString() || "");
      formData.append("is_published", "true");

      adData.imageUris.forEach((uri, index) => {
        formData.append("images", {
          uri,
          name: `image_${index}.jpg`,
          type: "image/jpeg",
        } as any);
      });
    }

    // Debug
    console.log("FormData Payload:");
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });


    try {
      const response = await axios.post(`${API_BASE_URL}/products/createProduct`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Success:", response.data);
      Alert.alert("Success", "Ad posted successfully.");
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
      Alert.alert("Error", "Failed to post ad.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView className="flex-1 px-5">
      <Text className="mt-4 text-2xl font-bold mb-5 text-center">Review Your Details</Text>

      <View className="mb-4">
        <Text className="font-semibold">City:</Text>
        <TextInput className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100" value={adData.city?.name ?? "City not selected"} editable={false} />
      </View>

      <View className="mb-4">
        <Text className="font-semibold">Category:</Text>
        <TextInput className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100" value={adData.category?.name ?? "Category not selected"} editable={false} />
      </View>

      <View className="mb-4">
        <Text className="font-semibold">Title:</Text>
        <TextInput className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100" value={adData.details.title} editable={false} />
      </View>

      <View className="mb-4">
        <Text className="font-semibold">Description:</Text>
        <TextInput className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100" value={adData.details.description} editable={false} multiline />
      </View>

      {!isComponentsCategory && (
        <>
          <View className="mb-4">
            <Text className="font-semibold">Brand:</Text>
            <TextInput className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100" value={adData.details.brand || ""} editable={false} />
          </View>

          <View className="mb-4">
            <Text className="font-semibold">Model:</Text>
            <TextInput className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100" value={adData.details.model || ""} editable={false} />
          </View>
        </>
      )}

      {isComponentsCategory && (
        <>
          <View className="mb-4">
            <Text className="font-semibold">Item Type:</Text>
            <TextInput className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100" value={adData.details.itemType || ""} editable={false} />
          </View>

          {adData.details.itemType === "components" && (
            <View className="mb-4">
              <Text className="font-semibold">Component Type:</Text>
              <TextInput className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100" value={adData.details.componentType || ""} editable={false} />
            </View>
          )}

          {adData.details.itemType === "accessories" && (
            <View className="mb-4">
              <Text className="font-semibold">Accessory Type:</Text>
              <TextInput className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100" value={adData.details.accessoryType || ""} editable={false} />
            </View>
          )}
        </>
      )}

      <View className="mb-4">
        <Text className="font-semibold">Condition:</Text>
        <TextInput className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100" value={adData.details.condition || "Not specified"} editable={false} />
      </View>

      <View className="mb-4">
        <Text className="font-semibold">Location:</Text>
        <TextInput className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100" value={adData.details.location || "Not specified"} editable={false} />
      </View>

      <View className="mb-4">
        <Text className="font-semibold">Price:</Text>
        <TextInput className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100" value={adData.price || "0"} editable={false} />
      </View>

      {adData.imageUris.length > 0 && (
        <View className="mb-6">
          <Text className="font-semibold text-lg text-gray-800 mb-2">Uploaded Images</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row space-x-6 px-1"
            contentContainerStyle={{ paddingRight: 12 }}
          >
            {adData.imageUris.map((uri, idx) => (
              <Image
                key={idx}
                source={{ uri }}
                className="w-40 h-40 rounded-xl border border-gray-300 shadow-md"
              />
            ))}
          </ScrollView>
        </View>

      )}

      <View className="mt-6 mb-10 items-center">
        <TouchableOpacity className="bg-blue-600 py-3 px-10 rounded-md" onPress={handlePostAd} disabled={loading}>
          <Text className="text-white font-bold text-base">{loading ? "Posting..." : "Post an Ad"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ViewDetails;
