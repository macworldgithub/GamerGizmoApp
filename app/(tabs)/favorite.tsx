import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

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
    <ScrollView>
      <View className="bg-white w-full h-full">
        {/* Header */}
        <View className="border-b border-gray-200 pb-4">
          <View className="px-4 py-4 flex-row items-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require("../../assets/images/left.png")} />
            </TouchableOpacity>
            <View className="flex-1 items-center -ml-48">
              <Text className="text-black font-semibold text-lg">Favorite</Text>
            </View>
          </View>
        </View>

        {/* Ads List */}
        <View className="p-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-black">
              All Favorites ({favorites.length})
            </Text>
            <Image
              source={require("../../assets/images/default.png")}
              className="mr-40"
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" />
          ) : favorites.length === 0 ? (
            <View className="items-center justify-center p-6">
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
                onPress={() => navigation.navigate("Home")}
              >
                <Text className="text-black font-semibold">
                  Continue Searching
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              horizontal
              data={favorites}
              //@ts-ignore
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                //@ts-ignore
                const product = item.product ?? item;
                const imageUrl =
                  getImageUrl(product.product_images?.[0]?.image_url) ||
                  "https://via.placeholder.com/150";

                return (
                  <TouchableOpacity
                    className="bg-white rounded-lg shadow-md mr-4"
                    style={{ width: 200 }}
                  >
                    <View style={{ position: "relative" }}>
                      <Image
                        source={{ uri: imageUrl }}
                        className="w-full h-32 rounded-t-lg"
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        onPress={() => removeFavorite(product.id)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1"
                      >
                        <FontAwesome name="heart" size={20} color="red" />
                      </TouchableOpacity>
                    </View>
                    <View className="p-2">
                      <Text
                        className="text-black font-semibold text-sm"
                        numberOfLines={1}
                      >
                        {product.name}
                      </Text>
                      <Text className="text-gray-600 text-sm mt-1">
                        AED {product.price}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>

        {/* Personalized List Section */}
        <View className="flex items-center justify-center w-screen h-96 bg-purple-100 mt-6 p-4">
          <View className="bg-white p-4 rounded-xl shadow-lg w-72">
            <Text className="text-sm font-bold text-center text-black">
              Create Your First Personalized List
            </Text>
            <Text className="text-gray-500 text-center mt-2">
              Organize Your Favorites
            </Text>
            <Text className="text-gray-500 text-center mt-1">
              Invite friends to view or collaborate on your list
            </Text>
            <TouchableOpacity className="mt-4 ml-16">
              <Image source={require("../../assets/images/list.png")} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Favorite;
