import React, { useState } from "react";
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
import Toast from "react-native-toast-message";

type AdListProps = {
  ads: any[];
  setAds: React.Dispatch<React.SetStateAction<any[]>>;
  fetchAds: () => void;
  total: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

type AdType = {
  id: string | number;
  active: boolean;
};

export default function AdList({
  ads,
  setAds,
  fetchAds,
  total,
  currentPage,
  setCurrentPage,
}: AdListProps) {
  const [loading, setLoading] = useState(false);
  const [selectedAd, setSelectedAd] = useState<AdType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(total / itemsPerPage);

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
      fetchAds();
    } catch (err) {
      setLoading(false);
      Alert.alert("Error", "Failed to delete the ad");
    }
  };

  const updateStatus = async () => {
    if (!selectedAd) return;

    const token = await AsyncStorage.getItem("token");
    const userId = await AsyncStorage.getItem("userId");

    try {
      setLoading(true);
      const newStatus = !selectedAd.active;
      await axios.put(
        `https://backend.gamergizmo.com/products/invertStatus`,
        {
          product_id: selectedAd.id.toString(),
          //@ts-ignore
          user_id: userId.toString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);
      Toast.show({
        type: "success",
        text1: "Status updated successfully!",
        text2: `Status changed to ${newStatus ? "Active" : "Draft"}`,
      });
      setModalOpen(false);
      fetchAds();
    } catch (err) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Failed to update status",
      });
    }
  };

  const renderItem = ({ item: ad }: any) => (
    <View className="flex-row items-center bg-white rounded-lg p-4 mb-4 shadow">
      <Image
        source={{ uri: ad.images?.[0]?.image_url || "https://via.placeholder.com/100" }}
        className="w-24 h-24 rounded mr-4"
        resizeMode="cover"
      />
      <View className="flex-1">
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

          <TouchableOpacity
            className="border border-red-500 rounded-full px-4 py-1"
            onPress={() => deleteProduct(ad.id)}
          >
            <Text className="text-red-500 font-bold">Delete</Text>
          </TouchableOpacity>
        </View>
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
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}       
                                 
      {/* Pagination Controls */}
      <View className="flex-row justify-center items-center gap-x-6 mt-4 mb-10">
        <TouchableOpacity
          disabled={currentPage === 1}
          onPress={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 border rounded-lg"
        >
          <Text className="text-black">Previous</Text>
        </TouchableOpacity>
        <Text className="px-4 py-2 border rounded-lg text-black">
          Page {currentPage} of {totalPages}
        </Text>
        <TouchableOpacity
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage(currentPage + 1)}
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
