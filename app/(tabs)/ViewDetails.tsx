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

interface City {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface AdDetails {
  title: string;
  description: string;
  brand: string;
  brandId: number | null;
  model: string;
  modelId: number | null;
  condition: string;
  conditionId?: number | null; 
  location: string;
  locationId?: number | null;  
}


interface AdState {
  city: City | null;
  category: Category | null;
  details: AdDetails;
  price: string | null;
  imageUri: string | null;

}

const ViewDetails: React.FC = ({ navigation }: any) => {
  const adData: AdState = useSelector((state: RootState) => state.ad);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const token = await AsyncStorage.getItem("token");

        if (user && token) {
          const parsedUser = JSON.parse(user);
          setUserData({ ...parsedUser, id: await AsyncStorage.getItem("userId"), token });
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

  const categoryName = adData.category?.name;

  formData.append("name", adData.details.title || "");
  formData.append("user_id", userData?.id?.toString() || "");
  formData.append("description", adData.details.description || "");
  formData.append("price", adData.price?.toString() || "");
  formData.append("stock", "1");
  formData.append("brand_id", adData.details.brandId?.toString() || "");
  formData.append("otherBrandName", "");
  formData.append("model_id", adData.details.modelId?.toString() || "");
  formData.append("category_id", adData.category?.id?.toString() || "");
  formData.append("condition", adData.details.conditionId?.toString() || "");
  formData.append("location", adData.details.locationId?.toString() || "");
  formData.append("is_published", "true");

  if (categoryName === "Components and Accessories") {
    formData.append("component_type", "");
    formData.append("text", "");
  } else if (categoryName === "Gaming Consoles") {
    formData.append("accessories", "");
    formData.append("connectivity", "");
    formData.append("warranty_status", "");
    formData.append("battery_life", "");
    formData.append("color", "");
  } else {
    // Default for Laptops, Desktops, etc.
    formData.append("ram", "");
    formData.append("storage", "");
    formData.append("storageType", "");
    formData.append("graphics", "");
    formData.append("gpu", "");
    formData.append("ports", "");
    formData.append("battery_life", "");
    formData.append("warranty_status", "");
    formData.append("connectivity", "");
    formData.append("accessories", "");
    formData.append("screen_size", "");
    formData.append("weight", "");
    formData.append("screen_resolution", "");
    formData.append("color", "");
  }

  if (adData.imageUri) {
    formData.append("images", {
      uri: adData.imageUri,
      name: "photo.jpeg",
      type: "image/jpeg",
    } as any);
  }

  try {
    for (let pair of formData.entries()) {
      console.log(pair[0] + ":", pair[1]);
    }

    const response = await axios.post(
      `${API_BASE_URL}/products/createProduct`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(" Success:", response.data);
    Alert.alert("Success", "Ad posted successfully.");
  } catch (error: any) {
    console.error(" Error:", error.response?.data || error.message);
    Alert.alert("Error", "Failed to post ad.");
  } finally {
    setLoading(false);
  }
};

  return (
    <ScrollView className="flex-1 px-5">
      <Text className="text-2xl font-bold mb-5">View Details</Text>

      <View className="mb-4">
        <Text className="font-semibold">City:</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100"
          value={adData.city?.name ?? "City not selected"}
          editable={false}
        />
      </View>

      <View className="mb-4">
        <Text className="font-semibold">Category:</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100"
          value={adData.category?.name ?? "Category not selected"}
          editable={false}
        />
      </View>

      <View className="mb-4">
        <Text className="font-semibold">Title:</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100"
          value={adData.details.title}
          editable={false}
        />
      </View>

      <View className="mb-4">
        <Text className="font-semibold">Description:</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100"
          value={adData.details.description}
          editable={false}
          multiline
        />
      </View>

      <View className="mb-4">
        <Text className="font-semibold">Brand:</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100"
          value={adData.details.brand || ""}
          editable={false}
        />
      </View>

      <View className="mb-4">
        <Text className="font-semibold">Model:</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100"
          value={adData.details.model}
          editable={false}
        />
      </View>

      <View className="mb-4">
        <Text className="font-semibold">Condition:</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100"
          value={adData.details.condition || "Condition not specified"}
          editable={false}
        />
      </View>

      <View className="mb-4">
        <Text className="font-semibold">Location:</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100"
          value={adData.details.location || "Location not specified"}
          editable={false}
        />
      </View>

      <View className="mb-4">
        <Text className="font-semibold">Price:</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-100"
          value={adData.price || "0"}
          editable={false}
        />
      </View>

      {adData.imageUri && (
        <View className="mb-4">
          <Text className="font-semibold">Image:</Text>
          <Image
            source={{ uri: adData.imageUri }}
            className="w-48 h-48 rounded-lg mt-2"
          />
        </View>
      )}

      <View className="mt-6 mb-10 items-center">
        <TouchableOpacity
          className="bg-blue-600 py-3 px-10 rounded-md"
          onPress={handlePostAd}
          disabled={loading}
        >
          <Text className="text-white font-bold text-base">
            {loading ? "Posting..." : "Post an Ad"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ViewDetails;
