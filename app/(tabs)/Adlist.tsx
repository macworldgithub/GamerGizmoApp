import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
type AdType = {
  id: string | number;
  active: boolean;
  // Add more fields here if needed
};

export default function AdList() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAd, setSelectedAd] = useState<AdType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const itemsPerPage = 8;

  const fetchAds = async () => {
    const token = await AsyncStorage.getItem("token");
    const userId = await AsyncStorage.getItem("userId");

    try {
      setLoading(true);
      const response = await axios.get(
        `https://backend.gamergizmo.com/products/getUserProducts?userId=${userId}&pageNo=${currentPage}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAds(response.data.data);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to fetch ads");
    }
  };

  useEffect(() => {
    fetchAds();
  }, [currentPage]);

  const deleteProduct = async (id: string) => {
    const token = await AsyncStorage.getItem("token");
    const userId = await AsyncStorage.getItem("userId");

    try {
      setLoading(true);
      await axios.delete(
        `https://backend.gamergizmo.com/products/deleteProductById?product_id=${id}&user_id=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);
      Alert.alert("Success", "Ad deleted");
      if (ads.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        fetchAds();
      }
    } catch (err) {
      setLoading(false);
      Alert.alert("Error", "Failed to delete the ad");
    }
  };
  const updateStatus = async () => {
    if (!selectedAd) return;

    const token = await AsyncStorage.getItem("token");
    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      // Use react-native-toast-message for error
      Toast.show({
        type: "error", // 'error' type for error messages
        text1: "User not found!",
        text2: "Please log in again.",
        visibilityTime: 3000, // Duration the toast will be visible
        autoHide: true,
      });
      return;
    }

    try {
      setLoading(true);
      //@ts-ignore
      const newStatus = !selectedAd.active;
      await axios.put(
        `https://backend.gamergizmo.com/products/invertStatus`,
        {
          product_id: selectedAd.id.toString(),
          user_id: userId.toString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);
      // Success message using react-native-toast-message
      Toast.show({
        type: "success",
        text1: "Status updated successfully!",
        text2: `Status changed to ${newStatus ? "Active" : "Draft"}`,
        visibilityTime: 3000,
        autoHide: true,
      });
      // setFetch(!fetcher);
      setModalOpen(false);
    } catch (err) {
      setLoading(false);
      // Show error toast if the request fails
      Toast.show({
        type: "error",
        text1: "Failed to update status",
        text2: "There was an issue updating the ad status.",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  const totalPages = Math.ceil(total / itemsPerPage);

  const renderItem = ({ item: ad }: any) => (
    <View className="flex flex-col items-center rounded-lg p-4 mb-4 bg-white shadow">
      <Image
        source={{ uri: ad.images?.[0]?.image_url }}
        className="w-28 h-28 mb-2"
        resizeMode="cover"
      />
      <Text className="text-purple-700 font-bold">{ad.category}</Text>
      <Text className="text-lg font-bold text-black">{ad.name}</Text>
      <Text className="text-sm text-gray-700">
        {ad.description?.slice(0, 120)}...
      </Text>

      <Text className="text-purple-600 mt-2 font-bold">
        AED <Text className="text-2xl">{ad.price}</Text>
      </Text>

      <View className="flex-row gap-4 mt-4">
        <TouchableOpacity
          className={`px-4 py-1 rounded-full ${
            ad.active ? "bg-blue-500" : "bg-black"
          }`}
          onPress={() => {
            setSelectedAd(ad);
            setModalOpen(true);
          }}
        >
          <Text className="text-white text-sm font-medium">
            {ad.active ? "Active" : "Draft"}
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          className="border border-black rounded-full px-4 py-1"
          onPress={() => router.push(`/my-adds/edit/${ad.id}`)}
        >
          <Text className="font-bold text-black">Edit</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          className="border border-red-500 rounded-full px-4 py-1"
          onPress={() => deleteProduct(ad.id)}
        >
          <Text className="text-red-500 font-bold">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="p-4">
      <Text className="bg-black text-white w-fit px-4 py-1 rounded-full mb-4">
        All Ads ({total})
      </Text>

      {loading ? (
        <ActivityIndicator size="large" className="mt-10" />
      ) : (
        <FlatList
          data={ads}
          //@ts-ignore
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}

      <View className="flex-row justify-center items-center space-x-4 mt-4">
        <TouchableOpacity
          disabled={currentPage === 1}
          onPress={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 border rounded-lg"
        >
          <Text className="text-black">Previous</Text>
        </TouchableOpacity>
        <Text className="px-4 py-2 border rounded-lg text-black">
          Page {currentPage} of {totalPages}
        </Text>
        <TouchableOpacity
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 border rounded-lg"
        >
          <Text className="text-black">Next</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      {modalOpen && selectedAd && (
        <View className="absolute inset-0 bg-black/50 justify-center items-center">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-xl font-bold mb-4">Change Status</Text>
            <Text>
              Are you sure you want to change the status to{" "}
              <Text className="font-bold">
                {selectedAd.active ? "Draft" : "Active"}
              </Text>
              ?
            </Text>
            <View className="flex-row justify-end gap-4 mt-4">
              <TouchableOpacity
                className="px-4 py-2 border rounded-lg"
                onPress={() => setModalOpen(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-4 py-2 bg-blue-500 rounded-lg"
                onPress={updateStatus}
              >
                <Text className="text-white">Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
