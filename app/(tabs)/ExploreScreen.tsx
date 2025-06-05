import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import Swiper from "react-native-swiper";
import { API_BASE_URL } from "@/utils/config";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import LiveAds from "./LiveAds";
import SortModal from "../(tabs)/SortModal";
import FilterModal from "./FilterModal";

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
  created_at: string;
};
const extractFeature = (desc: string, key: string): string | null => {
  const regex = new RegExp(`${key}\\s*[:：]\\s*(.*)`, "i");
  const match = desc.match(regex);
  return match ? match[1].trim() : null;
};

const ExploreScreen = () => {
  const { category, condition } = useLocalSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [defaultProducts, setDefaultProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [isSortVisible, setSortVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Default");
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

      const data = response.data?.data || [];

      if (data.length === 0) {
        setNoResults(true);
      } else {
        setDefaultProducts(data);
        setProducts(data);
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

  const applySorting = (option: string, list: Product[] = products) => {
    const sorted = [...list];

    switch (option) {
      case "Price Highest to Lowest":
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "Price Lowest to Highest":
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "Newest to Oldest":
        sorted.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "Oldest to Newest":
        sorted.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        break;
      case "Default":
      default:
        setProducts([...defaultProducts]);
        return;
    }

    setProducts(sorted);
  };

  const handleFilter = async ({ location_id, priceRange }: { location_id?: number, priceRange?: { min: number; max: number } }) => {
    try {
      setLoading(true);

      const categoryId = categoryIdMap[String(category).toLowerCase()];
      if (!categoryId || !condition) {
        setNoResults(true);
        return;
      }

      let query = `category_id=${categoryId}&condition=${condition}`;
      if (location_id) query += `&location=${location_id}`;

      console.log('Fetching products with query:', query);
      const response = await axios.get(`${API_BASE_URL}/products/getAll?${query}`);
      let data = response.data?.data || [];

      // Filter products by price range on client side
      if (priceRange) {
        data = data.filter((product: Product) => {
          const productPrice = Number(product.price);
          // For 5000+ AED range, only check min price
          if (priceRange.max === null) {
            return productPrice >= priceRange.min;
          }
          // For other ranges, check both min and max
          return productPrice >= priceRange.min && productPrice <= priceRange.max;
        });
      }

      if (data.length === 0) {
        setNoResults(true);
      } else {
        setDefaultProducts(data);
        setProducts(data);
        if (selectedSort !== "Default") {
          applySorting(selectedSort, data);
        }
        setNoResults(false);
      }
    } catch (error) {
      console.error("Error applying filter", error);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const getImageUrl = (image_url: string) => {
    return image_url?.startsWith("https") ? image_url : image_url;
  };

  const getAdsInfo = (category: string | string[], condition: string | string[]) => {
    const lowerCategory = String(category).toLowerCase();
    const conditionValue = String(condition);

    if (lowerCategory === "laptops" && (conditionValue === "1" || conditionValue === "2")) {
      return { pageName: "Laptops", adId: 1 };
    } else if (lowerCategory === "components" || lowerCategory === "accessories") {
      return { pageName: "Components and Accessories", adId: 1 };
    } else if (lowerCategory === "desktop") {
      return { pageName: "Gaming PCS", adId: 1 };
    } else if (lowerCategory === "console") {
      return { pageName: "Gaming Consoles", adId: 1 };
    } else {
      return null;
    }
  };

  const adData = getAdsInfo(category, condition);

  const daysAgo = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diff = Math.floor(
      (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff === 0 ? "Today" : `${diff} day${diff > 1 ? "s" : ""} ago`;
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

        {/* Action Bar */}
        <View className="mt-4 flex-row items-center justify-center px-4 py-4 border-t border-gray-200">
          <Text className="text-gray-400">|</Text>
          <TouchableOpacity
            className="flex-row items-center mx-3 gap-3"
            onPress={() => setShowModal(true)}
          >
            <FontAwesome5 name="sliders-h" size={18} color="black" />
            <Text className="ml-1 text-gray-600 font-semibold">FILTERS</Text>
          </TouchableOpacity>
          <FilterModal
            isVisible={showModal}
            onClose={() => setShowModal(false)}
            onApplyFilter={handleFilter}
          />
          <Text className="text-gray-400">|</Text>
          <TouchableOpacity
            onPress={() => setSortVisible(true)}
            className="flex-row items-center mx-3 mr-5 gap-3"
          >
            <FontAwesome5 name="sort" size={18} color="black" />
            <Text className="ml-1 text-gray-600 font-semibold">SORT</Text>
          </TouchableOpacity>
        </View>

        {/* Sort Modal */}
        <SortModal
          isVisible={isSortVisible}
          selected={selectedSort}
          onClose={() => setSortVisible(false)}
          onSelect={(option: string) => {
            setSelectedSort(option);
            setSortVisible(false);
            applySorting(option);
          }}
        />
      </View>

      <ScrollView className="p-4 bg-gray-200 mb-2">
        {products.map((item, index) => (
          <React.Fragment key={index}>
            <View className="bg-white p-3 mb-4 rounded-lg shadow-md border border-gray-200">
              {item.images?.length > 0 ? (
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
              <TouchableOpacity onPress={() => router.push(`/product/${item.id}`)}>
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

              <Text className="text-gray-500 text-sm">
                {daysAgo(item.created_at)}
              </Text>

              {(() => {
                const lifespan = extractFeature(item.description, "Lifespan");
                const lighting = extractFeature(item.description, "Lighting");
                const color = extractFeature(item.description, "Color");

                if (lifespan || lighting || color) {
                  return (
                    <View className="flex-row flex-wrap mt-1 gap-2">
                      {lifespan && (
                        <Text className="text-gray-600 text-sm bg-gray-200 py-1 px-1 rounded-md">
                          Lifespan: {lifespan}
                        </Text>
                      )}
                      {lighting && (
                        <Text className="text-gray-600 text-sm bg-gray-200 py-1 px-1 rounded-md">
                          Lighting: {lighting}
                        </Text>
                      )}
                      {color && (
                        <Text className="text-gray-600 text-sm bg-gray-200 py-1 px-1 rounded-md">
                          Color: {color}
                        </Text>
                      )}
                    </View>
                  );
                }
              })()}

              <View className="flex-row justify-between mt-3">
                <TouchableOpacity className="bg-[#e8e3fc] w-32 mx-1 py-2 rounded-full">
                  <Text className="text-black text-center font-semibold">Chat</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Ads after every 3 items */}
            {(index + 1) % 5 === 0 && adData && (
              <View className="mt-4">
                <LiveAds
                  pageName={adData.pageName}
                  adId={adData.adId + Math.floor((index + 1) / 3) - 1}
                />
              </View>
            )}
          </React.Fragment>
        ))}
      </ScrollView>
    </>
  );
};

export default ExploreScreen;