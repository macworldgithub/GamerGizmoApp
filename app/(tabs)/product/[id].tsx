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
  name: string;
  price: number;
  stock?: string;
  models?: Model;
  brands?: Brand;
  condition_product_conditionTocondition?: Condition;
  created_at: string;
  description?: string;
  location?: string;
  product_images: ProductImage[];
  seller?: Seller;
  users?: User;
  user_id: number;
}

const ProductDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/products/getProductById?id=${id}`
        );
        setProduct(response.data.data);
        console.log("product detail:", response.data.data);
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
        "https://backend.gamergizmo.com/product/favourite/addToFavourite",
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
      const buyerUserId = await AsyncStorage.getItem("userId");
      const sellerId = product?.user_id;

      // Detailed ID logging
      console.log("==========================================");
      console.log("🔍 CHAT CREATION - ID VERIFICATION");
      console.log("==========================================");
      console.log("👤 BUYER/USER INFORMATION:");
      console.log("- Buyer User ID:", buyerUserId);
      console.log("- Buyer ID Type:", typeof buyerUserId);
      
      console.log("\n🏪 SELLER INFORMATION:");
      console.log("- Seller ID:", sellerId);
      console.log("- Seller ID Type:", typeof sellerId);
      
      console.log("\n📦 PRODUCT DETAILS:");
      console.log("- Product ID:", product?.id);
      console.log("- Product User ID:", product?.user_id);
      
      console.log("\n👥 SELLER USER DETAILS:");
      console.log("- Seller User Object:", product?.users);
      console.log("- Seller Name:", `${product?.users?.first_name} ${product?.users?.last_name}`);
      console.log("==========================================");

      // Validate buyer is logged in
      if (!buyerUserId) {
        console.log("❌ ERROR: Buyer not logged in");
        alert("Please log in to start a chat.");
        return;
      }
      
      // Validate seller info exists
      if (!sellerId) {
        console.log("❌ ERROR: Seller information missing");
        alert("Seller information is missing.");
        return;
      }

      // Convert IDs to numbers and validate
      const buyerIdNumber = parseInt(buyerUserId, 10);
      const sellerIdNumber = parseInt(String(sellerId), 10);

      console.log("\n🔄 CONVERTED IDs:");
      console.log("- Converted Buyer ID:", buyerIdNumber, "(Type:", typeof buyerIdNumber, ")");
      console.log("- Converted Seller ID:", sellerIdNumber, "(Type:", typeof sellerIdNumber, ")");

      // Validate number conversion
      if (isNaN(buyerIdNumber) || isNaN(sellerIdNumber)) {
        console.log("❌ ERROR: ID conversion failed");
        alert("Invalid user IDs - please try again");
        return;
      }

      // Validate not chatting with self
      if (buyerIdNumber === sellerIdNumber) {
        console.log("❌ ERROR: Same user IDs", { buyerIdNumber, sellerIdNumber });
        alert("You cannot chat with yourself.");
        return;
      }

      // Create payload and log it
      const chatPayload = {
        user1Id: buyerIdNumber,
        user2Id: sellerIdNumber
      };

      console.log("\n📦 PAYLOAD BEING SENT TO SERVER:");
      console.log("==================================");
      console.log(JSON.stringify(chatPayload, null, 2), "chatPayload");
      console.log("==================================");
      console.log("URL:", "https://backend.gamergizmo.com/chats/create");
      console.log("Method: POST");
      console.log("==================================");

      // Create chat request
      const response = await axios.post(
        "https://backend.gamergizmo.com/chats/create",
        chatPayload
      );
      
      console.log("\n📥 SERVER RESPONSE:");
      console.log("==================================");
      console.log(JSON.stringify(response.data, null, 2));
      console.log("==================================");

      // Handle existing chat case
      if (response.data.message === "Chat already exists") {
        console.log("ℹ️ Using existing chat");
        const chatId = response.data.data.id;
        router.push({
          pathname: "/(tabs)/Chating",
          params: {
            chatId,
            sellerId: sellerIdNumber,
            productId: id,
          },
        });
        return;
      }

      // Handle new chat case
      const chatId = response.data.data.id;
      console.log("✅ New chat created:", chatId);

      // Connect to socket if needed
      if (!socket.connected) {
        socket.io.opts.query = { userId: buyerIdNumber };
        socket.connect();
        console.log("🔌 Socket connected");
      }

      // Navigate to chat
      router.push({
        pathname: "/(tabs)/Chating",
        params: {
          chatId,
          sellerId: sellerIdNumber,
          productId: id,
        },
      });
    } catch (error: any) {
      console.log("\n❌ ERROR DETAILS:");
      console.log("==================================");
      console.log("Response Data:", error.response?.data);
      console.log("Status:", error.response?.status);
      console.log("Status Text:", error.response?.statusText);
      console.log("Error Message:", error.message);
      console.log("Full Error Object:", error);
      console.log("==================================");
      
      const errorMessage = error.response?.data?.message 
        || error.message 
        || "Failed to start chat. Please try again.";
      
      alert(errorMessage);
    } finally {
      setIsConnecting(false);
      console.log("==========================================\n");
    }
  };

  const productUrl = `https://gamergizmo.com/product-details/${id}`;

  if (loading) return <ActivityIndicator className="mt-20" />;
  if (!product) return <Text className="text-center mt-10">Product not found</Text>;

  return (
    <ScrollView className="p-4 bg-white">
      <View className="h-60 rounded-lg overflow-hidden relative">
        {product.product_images && product.product_images.length > 0 ? (
          <Swiper
            style={{ height: 200 }}
            dotStyle={{ backgroundColor: "#ccc", width: 6, height: 6 }}
            activeDotStyle={{ backgroundColor: "#6D28D9", width: 8, height: 8 }}
            loop
            showsPagination
          >
            {product.product_images.map((img, i) => {
              const imageUrl = getImageUrl(img.image_url);
              return (
                <Image
                  key={i}
                  source={{ uri: imageUrl }}
                  className="w-full h-48 rounded-lg"
                  resizeMode="cover"
                />
              );
            })}
          </Swiper>
        ) : (
          <Image
            source={require("../../../assets/images/check.png")}
            className="w-full h-48 rounded-lg"
            resizeMode="cover"
          />
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

      <Text className="text-purple-600 text-2xl font-bold mt-4">
        AED {product.price}
      </Text>
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

      <TouchableOpacity
        onPress={handleStartChat}
        className="mt-6 border border-purple-600 rounded-md py-2 items-center"
        disabled={isConnecting}
      >
        <Text className="text-purple-600 font-semibold">
          {isConnecting ? "Connecting..." : "Chat"}
        </Text>
      </TouchableOpacity>

      <View className="mt-6">
        <Text className="text-lg font-semibold text-gray-800 mb-2">
          Description
        </Text>
        <Text className="text-gray-700">
          {product.description || "No description provided."}
        </Text>
      </View>

      <View className="border-b border-gray-200 my-4" />

      {/* Location */}
      <View>
        <Text className="text-lg font-semibold text-gray-800 mb-2">
          Location
        </Text>
        <Text className="text-gray-700">{product.location || "Dubai"}</Text>
        <View className="h-32 bg-gray-200 rounded-md mt-2 items-center justify-center">
          <Text className="text-gray-500">MAP</Text>
        </View>
      </View>

      {/* User Info */}
      <View className="mt-6 p-4 border border-gray-300 rounded-md bg-gray-50 shadow-sm">
        <View className="flex-row items-center mb-2">
          <Ionicons name="person-circle-outline" size={40} color="gray" />
          <View className="ml-2">
            <Text className="text-base font-semibold text-gray-800">
              {product.users?.first_name} {product.users?.last_name} (
              {product.users?.gender})
            </Text>
            <Text className="text-sm text-gray-500">
              Member Since{" "}
              {product.users?.created_at
                ? dayjs(product.users.created_at).format("DD MMM YYYY")
                : "N/A"}
            </Text>
          </View>
        </View>

        {/* WhatsApp */}
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

        {/* Email */}
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

export default ProductDetail;
