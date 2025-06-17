import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShareModal from "../ShareModal";
import Modal from "react-native-modal";
import { io } from "socket.io-client";
import { useNavigation } from "@react-navigation/native";
import socket from "../../socket";

dayjs.extend(relativeTime);

interface ProductImage {
  id: number;
  image_url: string;
  product_id: number;
  created_at?: string;
}

interface Brand {
  name: string;
}

interface Model {
  name: string;
}

interface Condition {
  name: string;
}

interface Seller {
  name: string;
  avatar: string;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  phone: string;
  email: string;
  created_at: string;
}

interface Product {
  id: string;
  is_store_product?: boolean;
  name: string;
  price: number;
  stock?: string;
  models?: Model;
  brands?: Brand;
  category_id: number;
  condition_product_conditionTocondition?: Condition;
  created_at: string;
  description?: string;
  location?: string;
  product_images: ProductImage[];
  seller?: Seller;
  users?: User;
  user_id: number;
  // location_product_locationTolocation: Location
  location_product_locationTolocation: {
    id: number;
    name: string;
  };
}

interface SimilarProduct {
  id: string;
  name: string;
  price: number;
  images: Array<{ image_url: string }>;
  product_images?: Array<{ image_url: string }>;
  category_id: number;
}

const ProductDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<SimilarProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigation = useNavigation();
  const [showCounter, setShowCounter] = useState(false);
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/products/getProductById?id=${id}`
        );

        const productData = response.data.data;
        setProduct(productData);

        // Fetch similar products
        if (productData.category_id) {
          try {
            // If it's a store product, fetch only store products
            const queryParams = productData.is_store_product 
              ? `category_id=${productData.category_id}&is_store_product=true`
              : `category_id=${productData.category_id}&is_store_product=false`;

            const similarResponse = await axios.get(
              `${API_BASE_URL}/products/getAll?${queryParams}`
            );

            // Filter out the current product and ensure we have valid data
            const filteredSimilarProducts = similarResponse.data.data
              .filter((item: SimilarProduct) => item.id !== id)
              .map((item: SimilarProduct) => ({
                ...item,
                images: item.images || [],
                product_images: item.product_images || []
              }));
            setSimilarProducts(filteredSimilarProducts);
            console.log("similar.data", filteredSimilarProducts);
          } catch (err) {
            console.error("Error fetching similar products:", err);
          }
        }
      } catch (err) {
        console.error("Error fetching product", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <ActivityIndicator className="mt-20" />;
  if (!product)
    return <Text className="text-center mt-10">Product not found</Text>;

  const getImageUrl = (image_url: string) => {
    return image_url?.startsWith("https") ? image_url : image_url;
  };

  const handleFavourite = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        alert("User not logged in.");
        return;
      }
      if (isFavourite) {
        Alert.alert(
          "Already Favourited",
          "This ad is already in your favourites."
        );
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/product/favourite/addToFavourite`,
        { userId, productId: id }
      );

      console.log("Favourite added:", response.data);
      setIsFavourite(true);
      alert("Added to favourites!");
    } catch (err: any) {
      console.error(
        "Error adding to favourites:",
        err.response?.data || err.message
      );
      alert("Failed to add favourite.");
    }
  };

  const handleStartChat = async () => {
    setIsConnecting(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const buyerUserId = await AsyncStorage.getItem("userId");
      const sellerId = product?.user_id;

      // Detailed ID logging
      // console.log("🔍 CHAT CREATION - ID VERIFICATION");
      // console.log("👤 BUYER/USER INFORMATION:");
      // console.log("- Buyer User ID:", buyerUserId);
      // console.log("- Buyer ID Type:", typeof buyerUserId);

      // console.log("\n🏪 SELLER INFORMATION:");
      // console.log("- Seller ID:", sellerId);
      // console.log("- Seller ID Type:", typeof sellerId);

      // console.log("\n📦 PRODUCT DETAILS:");
      // console.log("- Product ID:", product?.id);
      // console.log("- Product User ID:", product?.user_id);

      console.log("\n👥 SELLER USER DETAILS:");
      console.log("- Seller User Object:", product?.users);
      console.log(
        "- Seller Name:",
        `${product?.users?.first_name} ${product?.users?.last_name}`
      );

      // Validate buyer is logged in
      if (!buyerUserId || !token) {
        Alert.alert("Error", "Please log in to start a chat.");
        return;
      }

      // Validate seller info exists
      if (!sellerId) {
        Alert.alert("Error", "Seller information is missing.");
        return;
      }

      // Convert IDs to numbers and validate
      const buyerIdNumber = parseInt(buyerUserId, 10);
      const sellerIdNumber = parseInt(String(sellerId), 10);

      console.log("\n🔄 CONVERTED IDs:");
      console.log(
        "- Converted Buyer ID:",
        buyerIdNumber,
        "(Type:",
        typeof buyerIdNumber,
        ")"
      );
      console.log(
        "- Converted Seller ID:",
        sellerIdNumber,
        "(Type:",
        typeof sellerIdNumber,
        ")"
      );

      // Validate number conversion
      if (isNaN(buyerIdNumber) || isNaN(sellerIdNumber)) {
        Alert.alert("Error", "Invalid user IDs - please try again");
        return;
      }

      // Validate not chatting with self
      if (buyerIdNumber === sellerIdNumber) {
        Alert.alert("Error", "You cannot chat with yourself.");
        return;
      }

      // Create payload
      const chatPayload = {
        user1Id: buyerIdNumber,
        user2Id: sellerIdNumber,
      };

      // Create chat request
      const response = await axios.post(
        `${API_BASE_URL}/chats/create`,
        chatPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("\n📥 SERVER RESPONSE:");
      // console.log("==================================");
      // console.log(JSON.stringify(response.data, null, 2));
      // console.log("==================================");

      // Handle existing chat case
      if (response.data.message === "Chat already exists") {
        console.log("ℹ️ Using existing chat");
        const chatId = response.data.data.id;
        Alert.alert("Success", "Redirecting ", [
          {
            text: "OK",
            onPress: () => {
              router.push({
                pathname: "/(tabs)/Chating",
                params: {
                  chatId,
                  sellerId: sellerIdNumber,
                  productId: id,
                  sellerName: `${product?.users?.first_name || ""} ${product?.users?.last_name || ""
                    }`,
                },
              });
            },
          },
        ]);
        return;
      }

      // Handle new chat case
      const chatId = response.data.data.id;
      // console.log("✅ New chat created:", chatId);

      // Connect to socket if needed
      if (!socket.connected) {
        socket.io.opts.query = { userId: buyerIdNumber };
        socket.connect();
        // console.log("🔌 Socket connected");
      }

      // Show success message and navigate
      Alert.alert("Success", "Chat created successfully!", [
        {
          text: "OK",
          onPress: () => {
            router.push({
              pathname: "/(tabs)/Chating",
              params: {
                chatId,
                sellerId: sellerIdNumber,
                productId: id,
              },
            });
          },
        },
      ]);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to start chat. Please try again.";

      Alert.alert("Error", errorMessage);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleAddToCart = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Please log in to add items to your cart.");
      return;
    }

    if (!showCounter) {
      // First click reveals the counter
      setShowCounter(true);
      return;
    }

    if (!product?.id) return;

    setAdding(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/cart`,
        {
          product_id: product.id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Alert.alert("Added to cart successfully!");

      Alert.alert(
  "Added to cart successfully!",
  "",
  [
    {
      text: "OK",
      onPress: () => {
        router.push('/AddToCart');
      },
    },
  ],
  { cancelable: false }
);



      console.log("Cart response:", response?.data);
      // Optional: Reset state
      setShowCounter(false);
      setQuantity(1);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to add to cart.";
      Alert.alert(errorMessage);
      console.error("Add to cart error:", error);
    } finally {
      setAdding(false);
    }
  };



  const productUrl = `https://gamergizmo.com/product-details/${id}`;

  if (loading) return <ActivityIndicator className="mt-20" />;
  if (!product)
    return <Text className="text-center mt-10">Product not found</Text>;

  return (
    <ScrollView className="bg-white">
      <View className="h-80 relative">
        {product.product_images && product.product_images.length > 0 ? (
          <Swiper
            style={{ height: 320 }}
            dotStyle={{ backgroundColor: "#ccc", width: 6, height: 6 }}
            activeDotStyle={{ backgroundColor: "#6D28D9", width: 8, height: 8 }}
            loop
            showsPagination
          >
            {product.product_images.map((img, i) => {
              const imageUrl = getImageUrl(img.image_url);
              return (
                <ScrollView

                  key={i}
                  maximumZoomScale={3}
                  minimumZoomScale={1}
                  contentContainerStyle={{ flex: 1 }}
                >
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </ScrollView>
              );
            })}
          </Swiper>
        ) : (
          <ScrollView
            maximumZoomScale={3}
            minimumZoomScale={1}
            contentContainerStyle={{ flex: 1 }}
          >
            <Image
              source={require("../../../assets/images/check.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </ScrollView>
        )}

        <TouchableOpacity
          onPress={() => router.push("/home")}
          className="absolute top-2 left-2 bg-white/70 p-2 rounded-full"
        >
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>

        <View className="absolute bottom-2 right-2 flex-row space-x-2">
          <TouchableOpacity
            onPress={handleFavourite}
            className="bg-white/70 p-2 rounded-full"
          >
            <FontAwesome
              color={isFavourite ? "red" : "black"}
              name={isFavourite ? "heart" : "heart-o"}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsVisible(true)}
            className="bg-white/70 p-2 rounded-full"
          >
            <FontAwesome name="share-alt" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="p-5">
        {product?.is_store_product ? (
          <View className="flex-row items-center justify-between mt-4">
            <Text className="text-purple-600 text-2xl font-bold">
              AED {product.price}
            </Text>

            <View className="flex-row items-center space-x-4">
              <TouchableOpacity
                onPress={() => {
                  if (showCounter) {
                    handleAddToCart();
                  } else {
                    setShowCounter(true);
                  }
                }}
                disabled={adding}
                className="flex-row items-center bg-purple-600 px-4 py-2 rounded-full disabled:opacity-50"
              >
                <FontAwesome name="cart-plus" size={18} color="white" />
                <Text className="text-white font-semibold ml-2">
                  {adding ? "Adding..." : showCounter ? "Confirm" : "Add to Cart"}
                </Text>
              </TouchableOpacity>

              {showCounter && (
                <View className="flex-row items-center space-x-2">
                  <TouchableOpacity
                    className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
                    onPress={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  >
                    <Text className="text-lg font-bold text-gray-600">−</Text>
                  </TouchableOpacity>
                  <Text className="w-6 text-center text-black">{quantity}</Text>
                  <TouchableOpacity
                    className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
                    onPress={() => setQuantity((prev) => prev + 1)}
                  >
                    <Text className="text-lg font-bold text-gray-600">+</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

        ) : (
          <Text className="text-purple-600 text-2xl font-bold mt-4">
            AED {product.price}
          </Text>
        )}


        <Text className="text-lg font-semibold text-gray-800 mt-1">
          {product.name}
        </Text>
        <View className="border-b border-gray-200 my-2" />

        <Text className="text-lg font-bold text-gray-800 mt-4 mb-2">Details</Text>
        <View className="border-t border-b border-gray-200">
          <View className="flex-row justify-between items-center py-3 border-b border-gray-200 px-4">
            <Text className="text-gray-900 font-semibold">Stock</Text>
            <Text className="text-gray-500">{product.stock || "N/A"}</Text>
          </View>
          <View className="flex-row justify-between items-center py-3 border-b border-gray-200 px-4">
            <Text className="text-gray-900 font-semibold">Model</Text>
            <Text className="text-gray-500">{product.models?.name || "N/A"}</Text>
          </View>
          <View className="flex-row justify-between items-center py-3 border-b border-gray-200 px-4">
            <Text className="text-gray-900 font-semibold">Brand</Text>
            <Text className="text-gray-500">{product.brands?.name || "N/A"}</Text>
          </View>
          <View className="flex-row justify-between items-center py-3 px-4">
            <Text className="text-gray-900 font-semibold">Condition</Text>
            <Text className="text-gray-500">
              {product.condition_product_conditionTocondition?.name || "N/A"}
            </Text>
          </View>
          <View className="flex-row justify-between items-center py-3 px-4">
            <Text className="text-gray-900 font-semibold">Posted On</Text>
            <Text className="text-gray-500">
              {dayjs(product.created_at).fromNow()}
            </Text>
          </View>
        </View>
        {!product?.is_store_product && (
          <TouchableOpacity
            onPress={handleStartChat}
            className="mt-6 border border-purple-600 rounded-md py-2 items-center"
            disabled={isConnecting}
          >
            <Text className="text-purple-600 font-semibold">
              {isConnecting ? "Connecting..." : "Chat"}
            </Text>
          </TouchableOpacity>
        )}

        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-800 mb-2">
            Description
          </Text>
          <Text className="text-gray-700">
            {product.description || "No description provided."}
          </Text>
        </View>
        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-800 mb-2">
            Description
          </Text>
          <Text className="text-gray-700">
            {product.description || "No description provided."}
          </Text>
        </View>

        <View className="border-b border-gray-200 my-4" />
        <View className="border-b border-gray-200 my-4" />

        {/* Location */}
        <View>
          <Text className="text-lg font-semibold text-gray-800 mb-2">
            Location
          </Text>
        //@ts-ignore
          <Text className="text-gray-700">{product.location_product_locationTolocation.name}</Text>
        </View>
        {/* <View className="h-32 bg-gray-200 rounded-md mt-2 items-center justify-center">
          <Text className="text-gray-500">MAP</Text>
        </View> */}
      </View>

 {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <View className="mt-6 mb-10">
          <Text className="text-lg font-bold text-gray-800 mb-4 px-4">
            Similar Products
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          >
            {similarProducts.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  if (item.id !== id) {
                    router.push(`/product/${item.id}`);
                  }
                }}
                className="mr-4 w-40"
              >
                <View className="w-40 h-40 bg-gray-100 rounded-lg overflow-hidden">
                  {(item.images && item.images.length > 0) || (item.product_images && item.product_images.length > 0) ? (
                    <Image
                      source={{
                        uri: (item.images?.[0]?.image_url || item.product_images?.[0]?.image_url)?.startsWith("http")
                          ? (item.images?.[0]?.image_url || item.product_images?.[0]?.image_url)
                          : `${API_BASE_URL}${item.images?.[0]?.image_url || item.product_images?.[0]?.image_url}`,
                      }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  ) : (
                    <View className="w-full h-full items-center justify-center bg-gray-200">
                      <Ionicons name="image-outline" size={40} color="gray" />
                      <Text className="text-gray-500 mt-2">No Image</Text>
                    </View>
                  )}
                </View>
                <Text className="text-purple-600 font-bold mt-2">
                  AED {item.price}
                </Text>
                <Text className="text-gray-800 text-sm" numberOfLines={2}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}



      {/* User Info */}
      <View className="mt-6 p-4 border border-gray-300 rounded-md bg-gray-50 shadow-sm">
        <View className="flex-row items-center mb-2">
          <Ionicons name="person-circle-outline" size={40} color="gray" />
          {product?.is_store_product ? (
            <View className="ml-2">
              <Text className="text-xl font-bold text-black pl-2">
                GamerGizmo
              </Text>

              <TouchableOpacity
                onPress={() => Linking.openURL("https://wa.me/971555795213")}
                className="flex-row items-center mt-2"
              >
                <Ionicons name="logo-whatsapp" size={20} color="green" />
                <Text className="ml-2 text-gray-700">+971555795213</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Linking.openURL("mailto:support@gamergizmo.com")}
                className="flex-row items-center mt-2"
              >
                <Ionicons name="mail-outline" size={20} color="gray" />
                <Text className="ml-2 text-gray-700">support@gamergizmo.com</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="ml-2">
              <Text className="text-base font-semibold text-gray-800">
                {product.users?.first_name} {product.users?.last_name} ({product.users?.gender})
              </Text>
              <Text className="text-sm text-gray-500">
                Member Since{" "}
                {product.users?.created_at
                  ? dayjs(product.users.created_at).format("DD MMM YYYY")
                  : "N/A"}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  if (product.users?.phone) {
                    const phone = product.users.phone.replace(/\s+/g, "");
                    Linking.openURL(`https://wa.me/${phone}`).catch(() =>
                      alert("WhatsApp not installed or link is invalid")
                    );
                  }
                }}
                className="flex-row items-center mt-2"
              >
                <Ionicons name="logo-whatsapp" size={20} color="green" />
                <Text className="ml-2 text-gray-700">{product.users?.phone}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  if (product.users?.email) {
                    Linking.openURL(`mailto:${product.users.email}`).catch(() =>
                      alert("Unable to open email client")
                    );
                  }
                }}
                className="flex-row items-center mt-2"
              >
                <Ionicons name="mail-outline" size={20} color="gray" />
                <Text className="ml-2 text-gray-700">{product.users?.email}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>


      {/* Report */}
      <TouchableOpacity className="mt-6 mb-10 flex-row items-center justify-center">
        <Ionicons name="flag-outline" size={16} color="black" />
        <Text className="text-sm ml-2">Report an ad</Text>
      </TouchableOpacity>

      {/* Share Modal */}
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        onBackButtonPress={() => setIsVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.4}
        style={{ margin: 0, justifyContent: "flex-end" }}
      >
        <ShareModal productUrl={productUrl} />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ProductDetail;
