// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { router, useLocalSearchParams } from "expo-router";
// import {
//   View,
//   Text,
//   Image,
//   ActivityIndicator,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "@/utils/config";
// import { FontAwesome, Ionicons } from "@expo/vector-icons";
// import Swiper from "react-native-swiper";

// dayjs.extend(relativeTime);

// interface ProductImage {
//   id: number;
//   image_url: string;
//   product_id: number;
//   created_at?: string;
// }

// interface Brand {
//   name: string;
// }

// interface Model {
//   name: string;
// }

// interface Condition {
//   name: string;
// }

// interface Seller {
//   name: string;
//   avatar: string;
// }

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   stock?: string;
//   models?: Model;
//   brands?: Brand;
//   condition_product_conditionTocondition?: Condition;
//   created_at: string;
//   description?: string;
//   location?: string;
//   product_images: ProductImage[];
//   seller?: Seller;
// }

// const ProductDetail = () => {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/products/getProductById?id=${id}`
//         );
//         setProduct(response.data.data);
//         console.log("product detail:", response.data.data);
//       } catch (err) {
//         console.error("Error fetching product", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchProduct();
//   }, [id]);

//   if (loading) return <ActivityIndicator className="mt-20" />;
//   if (!product)
//     return <Text className="text-center mt-10">Product not found</Text>;

//   const getImageUrl = (image_url: string) => {
//     return image_url?.startsWith("https") ? image_url : image_url;
//   };

//   return (
//     <ScrollView className="p-4 bg-white">
//       <View className="h-60 rounded-lg overflow-hidden relative">
//         {product.product_images && product.product_images.length > 0 ? (
//           <Swiper
//             style={{ height: 200 }}
//             dotStyle={{ backgroundColor: "#ccc", width: 6, height: 6 }}
//             activeDotStyle={{
//               backgroundColor: "#6D28D9",
//               width: 8,
//               height: 8,
//             }}
//             loop
//             showsPagination
//           >
//             {product.product_images.map((img, i) => {
//               const imageUrl = getImageUrl(img.image_url);
//               return (
//                 <Image
//                   key={i}
//                   source={{ uri: imageUrl }}
//                   className="w-full h-48 rounded-lg"
//                   resizeMode="cover"
//                 />
//               );
//             })}
//           </Swiper>
//         ) : (
//           <Image
//             source={require("../../../assets/images/check.png")}
//             className="w-full h-48 rounded-lg"
//             resizeMode="cover"
//           />
//         )}

//         {/* Back Arrow - Top Left */}
//         <TouchableOpacity
//           onPress={() => router.push("/home")}
//           className="absolute top-2 left-2 bg-white/70 p-2 rounded-full"
//         >
//           <FontAwesome name="arrow-left" size={20} color="black" />
//         </TouchableOpacity>

//         {/* Heart and Share Icons - Bottom Right */}
//         <View className="absolute bottom-2 right-2 flex-row space-x-2">
//           <TouchableOpacity className="bg-white/70 p-2 rounded-full">
//             <FontAwesome name="heart-o" size={20} color="black" />
//           </TouchableOpacity>
//           <TouchableOpacity className="bg-white/70 p-2 rounded-full">
//             <FontAwesome name="share-alt" size={20} color="black" />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <Text className="text-purple-600 text-2xl font-bold mt-4">
//         AED {product.price}
//       </Text>
//       <Text className="text-lg font-semibold text-gray-800 mt-1">
//         {product.name}
//       </Text>
//       <View className="border-b border-gray-200 my-2" />

//       <Text className="text-lg font-bold text-gray-800 mt-4 mb-2">Details</Text>
//       <View className="border-t border-b border-gray-200">
//         <View className="flex-row justify-between items-center py-3 border-b border-gray-200 px-4">
//           <Text className="text-gray-900 font-semibold">Stock</Text>
//           <Text className="text-gray-500">{product.stock || "N/A"}</Text>
//         </View>
//         <View className="flex-row justify-between items-center py-3 border-b border-gray-200 px-4">
//           <Text className="text-gray-900 font-semibold">Model</Text>
//           <Text className="text-gray-500">{product.models?.name || "N/A"}</Text>
//         </View>
//         <View className="flex-row justify-between items-center py-3 border-b border-gray-200 px-4">
//           <Text className="text-gray-900 font-semibold">Brand</Text>
//           <Text className="text-gray-500">{product.brands?.name || "N/A"}</Text>
//         </View>
//         <View className="flex-row justify-between items-center py-3 px-4">
//           <Text className="text-gray-900 font-semibold">Condition</Text>
//           <Text className="text-gray-500">
//             {product.condition_product_conditionTocondition?.name || "N/A"}
//           </Text>
//         </View>
//         <View className="flex-row justify-between items-center py-3 px-4">
//           <Text className="text-gray-900 font-semibold">Posted On</Text>
//           <Text className="text-gray-500">
//             {dayjs(product.created_at).fromNow()}
//           </Text>
//         </View>
//       </View>

//       <TouchableOpacity className="mt-6 border border-purple-600 rounded-md py-2 items-center">
//         <Text className="text-purple-600 font-semibold">Make an offer</Text>
//       </TouchableOpacity>

//       <View className="mt-6">
//         <Text className="text-lg font-semibold text-gray-800 mb-2">
//           Description
//         </Text>
//         <View className="flex-row">
//           <Text className="text-gray-700 flex-1">
//             {product.description || "No description provided."}
//           </Text>
//         </View>
//       </View>

//       <View className="border-b border-gray-200 my-4" />

//       {/* Location */}
//       <View>
//         <Text className="text-lg font-semibold text-gray-800 mb-2">
//           Location
//         </Text>
//         <Text className="text-gray-700">{product.location || "Dubai"}</Text>
//         <View className="h-32 bg-gray-200 rounded-md mt-2 items-center justify-center">
//           <Text className="text-gray-500">MAP</Text>
//         </View>
//       </View>

//       {/* Seller */}
//       <View className="mt-6 p-4 border border-gray-300 rounded-md bg-gray-50 shadow-sm">
//         <Text className="text-lg font-semibold text-gray-800 mb-3">Seller</Text>
//         <View className="flex-row items-center">
//           <Image
//             source={{
//               uri: `${API_BASE_URL}${
//                 product.seller?.avatar || "/default-avatar.png"
//               }`,
//             }}
//             className="w-12 h-12 rounded-full mr-4"
//           />
//           <View>
//             <Text className="font-semibold text-gray-800">
//               {product.seller?.name || "Seller"}
//             </Text>
//             <Text className="text-sm text-gray-500">⭐ 4.8 rating</Text>
//           </View>
//         </View>
//       </View>

//       {/* Report */}
//       <TouchableOpacity className="mt-6 mb-10 flex-row items-center justify-center">
//         <Ionicons name="flag-outline" size={16} color="black" />
//         <Text className="text-sm ml-2">Report an ad</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default ProductDetail;

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
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
}

const ProductDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

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
  // const { id } = useLocalSearchParams<{ id: string }>();
  const handleFavourite = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      if (!userId) {
        alert("User not logged in.");
        return;
      }

      const productId = id;

      const response = await axios.post(
        "https://backend.gamergizmo.com/product/favourite/addToFavourite",
        {
          userId,
          productId,
        }
      );

      console.log("Favourite added:", response.data);
      setIsFavourite(true); // ✅ set heart as filled
      alert("Added to favourites!");
    } catch (err: any) {
      console.error(
        "Error adding to favourites:",
        err.response?.data || err.message
      );
      alert("Failed to add favourite.");
    }
  };

  return (
    <ScrollView className="p-4 bg-white">
      <View className="h-60 rounded-lg overflow-hidden relative">
        {product.product_images && product.product_images.length > 0 ? (
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

        {/* Back Arrow - Top Left */}
        <TouchableOpacity
          onPress={() => router.push("/home")}
          className="absolute top-2 left-2 bg-white/70 p-2 rounded-full"
        >
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>

        {/* Heart and Share Icons - Bottom Right */}
        <View className="absolute bottom-2 right-2 flex-row space-x-2">
          <TouchableOpacity
            onPress={handleFavourite}
            className="bg-white/70 p-2 rounded-full"
          >
            <FontAwesome
              color={isFavourite ? "red" : "black"}
              name="heart-o"
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity className="bg-white/70 p-2 rounded-full">
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

      <TouchableOpacity className="mt-6 border border-purple-600 rounded-md py-2 items-center">
        <Text className="text-purple-600 font-semibold">Make an offer</Text>
      </TouchableOpacity>

      <View className="mt-6">
        <Text className="text-lg font-semibold text-gray-800 mb-2">
          Description
        </Text>
        <View className="flex-row">
          <Text className="text-gray-700 flex-1">
            {product.description || "No description provided."}
          </Text>
        </View>
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

      {/* Seller */}
      <View className="mt-6 p-4 border border-gray-300 rounded-md bg-gray-50 shadow-sm">
        <Text className="text-lg font-semibold text-gray-800 mb-3">Seller</Text>
        <View className="flex-row items-center">
          <Image
            source={{
              uri: `${API_BASE_URL}${
                product.seller?.avatar || "/default-avatar.png"
              }`,
            }}
            className="w-12 h-12 rounded-full mr-4"
          />
          <View>
            <Text className="font-semibold text-gray-800">
              {product.seller?.name || "Seller"}
            </Text>
            <Text className="text-sm text-gray-500">⭐ 4.8 rating</Text>
          </View>
        </View>
      </View>

      {/* Report */}
      <TouchableOpacity className="mt-6 mb-10 flex-row items-center justify-center">
        <Ionicons name="flag-outline" size={16} color="black" />
        <Text className="text-sm ml-2">Report an ad</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductDetail;
