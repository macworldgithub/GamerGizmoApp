import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, ActivityIndicator, Dimensions, TouchableOpacity} from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import Swiper from "react-native-swiper";
import { API_BASE_URL } from "@/utils/config";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

// const { width } = Dimensions.get("window");

type ProductImage = {
  id: number;
  product_id: number;
  image_url: string;
  created_at: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  images: ProductImage[];
};

const ExploreScreen = () => {
  const { category, condition } = useLocalSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
      const response = await axios.get(
        `${API_BASE_URL}/products/getAll?category_id=${categoryId}&condition=${condition}`
      );
      setProducts(response.data?.data || []);
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
    return image_url?.startsWith("https")
      ? image_url
      : `${API_BASE_URL}/${image_url}`;
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#6D28D9" />
      </View>
    );
  }

  return (
  <>
<View className="bg-white ">
<View className="mt-5 px-4 flex-row items-center justify-between">
    <TouchableOpacity>
      <FontAwesome name="arrow-left" size={20} color="black" />
    </TouchableOpacity>
    <Text className="text-xl font-bold  text-gray-700">
      {products.length} Results
    </Text>
    <View style={{ width: 20 }} /> 
  </View>
  

      {/* Top Action Bar */}
      <View className="mt-4 flex-row items-center justify-center px-4 py-4  border-t border-gray-200 ">
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
        {products.map((item, index) => (
          <View
            key={index}
            className="bg-white p-3 mb-4 rounded-lg shadow-md border border-gray-200"
          >
            {item.images && item.images.length > 0 ? (
              <Swiper
                style={{ height: 200 }}
                dotStyle={{ backgroundColor: "#ccc", width: 6, height: 6 }}
                activeDotStyle={{ backgroundColor: "#6D28D9", width: 8, height: 8 }}
                loop
                showsPagination
              >
                {item.images.map((img, i) => (
                  <Image
                    key={i}
                    source={{ uri: getImageUrl(img.image_url) }}
                    className="w-full h-48 rounded-lg object-fill"
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

            <Text className="text-purple-600 font-bold text-lg mt-2">
              AED {item.price}
            </Text>
            <Text className="text-black font-bold mt-1">{item.name}</Text>
            <Text className="text-gray-600 text-sm mt-1">{item.description}</Text>
          </View>
        ))}
      </ScrollView>
    </>
     
  );
};

export default ExploreScreen;
