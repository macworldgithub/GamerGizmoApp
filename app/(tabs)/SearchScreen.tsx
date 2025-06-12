import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";
import { Ionicons } from "@expo/vector-icons";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products/searchProducts`,
        {
          params: {
            query: searchQuery,
            limit: 20 // Limit results to 20 items
          }
        }
      );
      setSearchResults(response.data.data || []);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      {/* Search Header */}
      <View className="flex-row items-center mb-4">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="mr-2"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2">
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search Results */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#6D28D9" />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/product/${item.id}`)}
              className="flex-row items-center p-4 border-b border-gray-100"
            >
              <View className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden mr-4">
                {item.product_images?.[0]?.image_url ? (
                  <Image
                    source={{
                      uri: item.product_images[0].image_url.startsWith("http")
                        ? item.product_images[0].image_url
                        : `${API_BASE_URL}${item.product_images[0].image_url}`,
                    }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-full h-full items-center justify-center bg-gray-200">
                    <Ionicons name="image-outline" size={24} color="gray" />
                  </View>
                )}
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-800" numberOfLines={1}>
                  {item.name}
                </Text>
                <Text className="text-purple-600 font-bold mt-1">
                  AED {item.price}
                </Text>
                <Text className="text-gray-500 text-sm mt-1" numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            searchQuery.length > 0 ? (
              <View className="flex-1 justify-center items-center mt-10">
                <Ionicons name="search-outline" size={48} color="gray" />
                <Text className="text-gray-500 mt-4 text-center">
                  No products found for "{searchQuery}"
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

export default SearchScreen; 