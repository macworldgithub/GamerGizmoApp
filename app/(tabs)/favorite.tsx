import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";

const ITEMS_PER_PAGE = 5;

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigation = useNavigation();

  // Calculate pagination values
  const totalPages = Math.ceil(favorites.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = favorites.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        Alert.alert("Error", "User ID not found.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `https://backend.gamergizmo.com/product/favourite/getAll?userId=${userId}`
      );

      console.log("Favorites API response:", response.data);

      if (response.data?.data) {
        setFavorites(response.data.data);
      } else {
        setFavorites([]);
      }
    } catch (err) {
      console.error("Error fetching favorites:", err);
      Alert.alert("Error", "Failed to load favorites.");
    } finally {
      setLoading(false);
    }
  };
  //@ts-ignore
  const removeFavorite = async (productId) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token"); // optional, if you store token

      const response = await axios.delete(
        `https://backend.gamergizmo.com/product/favourite/removeFavourite?userId=${userId}&productId=${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Removed from favorites:", response.data);
      Alert.alert("Success", "Successfully removed from favorites!");
      fetchFavorites(); // refresh list
    } catch (err) {
      console.error("Failed to remove favorite:", err);
      Alert.alert("Error", "Failed to remove from favorites.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );
  //@ts-ignore
  const getImageUrl = (image_url) => {
    return image_url?.startsWith("https")
      ? image_url
      : `https://backend.gamergizmo.com/${image_url}`;
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className={`border-b border-gray-200 pb-4 ${Platform.OS === "ios" ? "mt-14" : "mt-4"}`}>
        <View className="px-4 py-4 flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require("../../assets/images/left.png")} />
          </TouchableOpacity>
          <View className={`flex-1 items-center -ml-48 ${Platform.OS === "ios" ? "-ml-64" : "-ml-48"}`}>
            <Text className="text-black font-semibold text-lg">Favorite</Text>
          </View>
        </View>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      ) : favorites.length === 0 ? (
        <View className="flex-1 items-center justify-center p-6">
          <Image source={require("../../assets/images/favorite.png")} />
          <Text className="text-lg font-bold text-black text-center mt-12">
            You have no favorites saved on this list
          </Text>
          <Text className="text-gray-500 text-center mt-2 px-6">
            Use the favorite icon to save ads that you want to check later
          </Text>
          <TouchableOpacity
            className="bg-white border border-gray-400 px-6 py-3 rounded-md mt-6"
            //@ts-ignore
            onPress={() => router.push('/home')}
          >
            <Text className="text-black font-semibold">
              Continue Searching
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={currentItems}
            //@ts-ignore
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            contentContainerStyle={{ padding: 16 }}
            ListHeaderComponent={() => (
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-xl font-bold text-black">
                  All Favorites ({favorites.length})
                </Text>
                <Image
                  source={require("../../assets/images/default.png")}
                  className="mr-40"
                />
              </View>
            )}
            renderItem={({ item }) => {
              //@ts-ignore
              const product = item.product ?? item;
              const imageUrl =
                getImageUrl(product.product_images?.[0]?.image_url) ||
                "https://via.placeholder.com/150";

              return (
                <TouchableOpacity
                  onPress={() => router.push(`/product/${product.id}`)}
                  className="bg-white rounded-xl shadow-lg mb-4 overflow-hidden"
                  style={{ width: "100%" }}

                >
                  <View className="flex-row">
                    <Image
                      source={{ uri: imageUrl }}
                      className="w-32 h-32"
                      resizeMode="cover"
                    />
                    <View className="flex-1 p-3 justify-between">
                      <View>
                        <Text
                          className="text-black font-bold text-lg"
                          numberOfLines={2}
                        >
                          {product.name}
                        </Text>
                        <Text className="text-purple-600 text-lg font-bold mt-1">
                          AED {product.price}
                        </Text>
                      </View>
                      <View className="flex-row justify-end items-center mt-2">
                        <TouchableOpacity
                          onPress={() => removeFavorite(product.id)}
                          className="bg-gray-100 rounded-full p-2"
                        >
                          <FontAwesome name="heart" size={20} color="red" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={() => (
              <View className="flex-row justify-between items-center mt-4 px-4">
                <TouchableOpacity
                  onPress={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300' : 'bg-purple-600'}`}
                >
                  <Text className="text-white font-semibold">Previous</Text>
                </TouchableOpacity>
                <Text className="text-black font-semibold">
                  Page {currentPage} of {totalPages}
                </Text>
                <TouchableOpacity
                  onPress={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300' : 'bg-purple-600'}`}
                >
                  <Text className="text-white font-semibold">Next</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

export default Favorite;