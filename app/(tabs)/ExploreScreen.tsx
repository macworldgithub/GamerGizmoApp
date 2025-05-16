import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import Swiper from "react-native-swiper";
import { API_BASE_URL } from "@/utils/config";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
type ProductImage = {
  id: number;
  product_id: number;
  image_url: string;
  created_at: string;
};

type Product = {
  id: number;
  name: string;
  price: number | string;
  description: string;
  images: ProductImage[];
};

const extractFeature = (desc: string, key: string): string | null => {
  const regex = new RegExp(`${key}\\s*[:：]\\s*(.*)`, "i");
  const match = desc.match(regex);
  return match ? match[1].trim() : null;
};

const ExploreScreen = () => {
  const { category, condition } = useLocalSearchParams();
  // console.log("Category:", category, "Condition:", condition);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const router = useRouter();

  const categoryIdMap: Record<string, number> = {
    laptops: 1,
    desktop: 2,
    components: 3,
    console: 4,
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const categoryId = categoryIdMap[String(category).toLowerCase()];
      if (!categoryId || !condition) {
        setNoResults(true);
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/products/getAll?category_id=${categoryId}&condition=${condition}`
      );
      // console.log("Response Data:", response.data);

      if (response.data?.data?.length === 0) {
        setNoResults(true);
      } else {
        setProducts(response.data?.data || []);
        setNoResults(false);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category && condition) {
      fetchProducts();
    }
  }, [category, condition]);

  const getImageUrl = (image_url: string) => {
    return image_url?.startsWith("https") ? image_url : image_url;
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#6D28D9" />
      </View>
    );
  }

  if (noResults) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-bold text-gray-700">
          No products found
        </Text>
      </View>
    );
  }

  return (
    <>
      <View className="bg-white">
        <View className="mt-5 px-4 flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.push("/home")}>
            <FontAwesome name="arrow-left" size={20} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-700">
            {products.length} Results
          </Text>
          <View style={{ width: 20 }} />
        </View>

        {/* Top Action Bar */}
        <View className="mt-4 flex-row items-center justify-center px-4 py-4 border-t border-gray-200">
          <TouchableOpacity className="flex-row items-center mx-3 mr-10 gap-3">
            <FontAwesome name="bookmark-o" size={18} color="black" />
            <Text className="ml-1 text-gray-600 font-semibold">SAVE</Text>
          </TouchableOpacity>
          <Text className="text-gray-400">|</Text>
          <TouchableOpacity className="flex-row items-center mx-3 gap-3">
            <FontAwesome5 name="sliders-h" size={18} color="black" />
            <Text className="ml-1 text-gray-600 font-semibold">FILTERS</Text>
          </TouchableOpacity>
          <Text className="text-gray-400">|</Text>
          <TouchableOpacity className="flex-row items-center mx-3 mr-5 gap-3">
            <FontAwesome5 name="sort" size={18} color="black" />
            <Text className="ml-1 text-gray-600 font-semibold">SORT</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Product List */}
      <ScrollView className="p-4 bg-gray-200 mb-2">
        {products.map((item, index) => {
          return (
            <View
              key={index}
              className="bg-white p-3 mb-4 rounded-lg shadow-md border border-gray-200"
            >
              {item.images && item.images.length > 0 ? (
                <Swiper
                  style={{ height: 200 }}
                  dotStyle={{ backgroundColor: "#ccc", width: 6, height: 6 }}
                  activeDotStyle={{
                    backgroundColor: "#6D28D9",
                    width: 8,
                    height: 8,
                  }}
                  loop
                  showsPagination
                >
                  {item.images.map((img, i) => (
                    <Image
                      key={i}
                      source={{ uri: getImageUrl(img.image_url) }}
                      className="w-full h-48 rounded-lg"
                      resizeMode="cover"
                    />
                  ))}
                </Swiper>
              ) : (
                <Image
                  source={require("../../assets/images/check.png")}
                  className="w-full h-48 rounded-lg"
                  resizeMode="cover"
                />
              )}
              <TouchableOpacity
                onPress={() => router.push(`/product/${item.id}`)}
              >
                <Text className="text-purple-600 font-bold text-lg mt-2">
                  AED {item.price}
                </Text>
              </TouchableOpacity>

              <Text
                className="text-black font-bold mt-1"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>

              {(() => {
                const lifespan = extractFeature(item.description, "Lifespan");
                const lighting = extractFeature(item.description, "Lighting");
                const color = extractFeature(item.description, "Color");

                if (lifespan || lighting || color) {
                  return (
                    <View className="flex-row flex-wrap mt-1 gap-2">
                      {lifespan && (
                        <Text className="text-gray-600 text-sm bg-gray-200 w-fit py-1 px-1 rounded-md">
                          Lifespan: {lifespan}
                        </Text>
                      )}
                      {lighting && (
                        <Text className="text-gray-600 text-sm bg-gray-200 w-fit py-1 px-1 rounded-md">
                          Lighting: {lighting}
                        </Text>
                      )}
                      {color && (
                        <Text className="text-gray-600 text-sm bg-gray-200 w-fit py-1 px-1 rounded-md">
                          Color: {color}
                        </Text>
                      )}
                    </View>
                  );
                } else {
                  return (
                    // <Text
                    //   className="text-gray-600 text-sm mt-1"
                    //   numberOfLines={1}
                    //   ellipsizeMode="tail"
                    // >
                    //   {item.description}
                    // </Text>

                    <TouchableOpacity
                      onPress={() => router.push(`/product/${item.id}`)}
                    >
                      <Text
                        className="text-gray-600 text-sm mt-1 underline"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.description}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              })()}

              <View className="flex-row justify-between mt-3">
                <TouchableOpacity className="bg-[#8fff97] flex-1 mx-1 py-2 rounded-full">
                  <Text className="text-black text-center font-semibold">
                    WhatsApp
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#e8e3fc] flex-1 mx-1 py-2 rounded-full">
                  <Text className="text-black text-center font-semibold">
                    Chat
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

export default ExploreScreen;
