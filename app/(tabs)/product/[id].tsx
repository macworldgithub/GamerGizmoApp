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
// import AsyncStorage from "@react-native-async-storage/async-storage";

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
//   const [isFavourite, setIsFavourite] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/products/getProductById?id=${id}`
//         );
//         setProduct(response.data.data);
//         // console.log("product detail:", response.data.data);
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
//   // const { id } = useLocalSearchParams<{ id: string }>();
//   const handleFavourite = async () => {
//     try {
//       const userId = await AsyncStorage.getItem("userId");

//       if (!userId) {
//         alert("User not logged in.");
//         return;
//       }

//       const productId = id;

//       const response = await axios.post(
//         "https://backend.gamergizmo.com/product/favourite/addToFavourite",
//         {
//           userId,
//           productId,
//         }
//       );

//       console.log("Favourite added:", response.data);
//       setIsFavourite(true); // ✅ set heart as filled
//       alert("Added to favourites!");
//     } catch (err: any) {
//       console.error(
//         "Error adding to favourites:",
//         err.response?.data || err.message
//       );
//       alert("Failed to add favourite.");
//     }
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
//           <TouchableOpacity
//             onPress={handleFavourite}
//             className="bg-white/70 p-2 rounded-full"
//           >
//             <FontAwesome
//               color={isFavourite ? "red" : "black"}
//               name="heart-o"
//               size={20}
//             />
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
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import ShareModal from "../ShareModal";
// import Modal from "react-native-modal";
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
//   const [isFavourite, setIsFavourite] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/products/getProductById?id=${id}`
//         );
//         setProduct(response.data.data);
//         // console.log("product detail:", response.data.data);
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
//   // const { id } = useLocalSearchParams<{ id: string }>();
//   const handleFavourite = async () => {
//     try {
//       const userId = await AsyncStorage.getItem("userId");

//       if (!userId) {
//         alert("User not logged in.");
//         return;
//       }

//       const productId = id;

//       const response = await axios.post(
//         "https://backend.gamergizmo.com/product/favourite/addToFavourite",
//         {
//           userId,
//           productId,
//         }
//       );

//       console.log("Favourite added:", response.data);
//       setIsFavourite(true); // ✅ set heart as filled
//       alert("Added to favourites!");
//     } catch (err: any) {
//       console.error(
//         "Error adding to favourites:",
//         err.response?.data || err.message
//       );
//       alert("Failed to add favourite.");
//     }
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
//           <TouchableOpacity
//             onPress={handleFavourite}
//             className="bg-white/70 p-2 rounded-full"
//           >
//             <FontAwesome
//               color={isFavourite ? "red" : "black"}
//               name="heart-o"
//               size={20}
//             />
//           </TouchableOpacity>
//           {/* <View className="flex-1 justify-center items-center bg-gray-100"> */}
//           {/* Your untouched share button */}
//           <TouchableOpacity
//             className="bg-white/70 p-2 rounded-full"
//             onPress={() => setIsVisible(true)}
//           >
//             <FontAwesome name="share-alt" size={20} color="black" />
//           </TouchableOpacity>

//           {/* Slide-up modal */}
//           <Modal
//             isVisible={isVisible}
//             onBackdropPress={() => setIsVisible(false)}
//             onBackButtonPress={() => setIsVisible(false)}
//             animationIn="slideInUp"
//             animationOut="slideOutDown"
//             backdropOpacity={0.4}
//             style={{ margin: 0, justifyContent: "flex-end" }}
//           >
//             <ShareModal />
//           </Modal>
//           {/* </View> */}
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
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import ShareModal from "../ShareModal";
// import Modal from "react-native-modal";

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
//   const [isFavourite, setIsFavourite] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/products/getProductById?id=${id}`
//         );
//         setProduct(response.data.data);
//         console.log("productdetail", response.data.data);
//       } catch (err) {
//         console.error("Error fetching product", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchProduct();
//   }, [id]);

//   const getImageUrl = (image_url: string) => {
//     return image_url?.startsWith("https") ? image_url : image_url;
//   };

//   const handleFavourite = async () => {
//     try {
//       const userId = await AsyncStorage.getItem("userId");

//       if (!userId) {
//         alert("User not logged in.");
//         return;
//       }

//       const response = await axios.post(
//         "https://backend.gamergizmo.com/product/favourite/addToFavourite",
//         {
//           userId,
//           productId: id,
//         }
//       );

//       console.log("Favourite added:", response.data);
//       setIsFavourite(true);
//       alert("Added to favourites!");
//     } catch (err: any) {
//       console.error(
//         "Error adding to favourites:",
//         err.response?.data || err.message
//       );
//       alert("Failed to add favourite.");
//     }
//   };

//   // Create the proper product URL that matches your web app's structure
//   const productUrl = `https://gamergizmo.com/product-details/${id}`;

//   if (loading) return <ActivityIndicator className="mt-20" />;
//   if (!product)
//     return <Text className="text-center mt-10">Product not found</Text>;

//   return (
//     <ScrollView className="p-4 bg-white">
//       {/* Product Images */}
//       <View className="h-60 rounded-lg overflow-hidden relative">
//         {product.product_images?.length > 0 ? (
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
//             {product.product_images.map((img, i) => (
//               <Image
//                 key={i}
//                 source={{ uri: getImageUrl(img.image_url) }}
//                 className="w-full h-48 rounded-lg"
//                 resizeMode="cover"
//               />
//             ))}
//           </Swiper>
//         ) : (
//           <Image
//             source={require("../../../assets/images/check.png")}
//             className="w-full h-48 rounded-lg"
//             resizeMode="cover"
//           />
//         )}

//         {/* Back Button */}
//         <TouchableOpacity
//           onPress={() => router.push("/home")}
//           className="absolute top-2 left-2 bg-white/70 p-2 rounded-full"
//         >
//           <FontAwesome name="arrow-left" size={20} color="black" />
//         </TouchableOpacity>

//         {/* Action Buttons */}
//         <View className="absolute bottom-2 right-2 flex-row space-x-2">
//           <TouchableOpacity
//             onPress={handleFavourite}
//             className="bg-white/70 p-2 rounded-full"
//           >
//             <FontAwesome
//               color={isFavourite ? "red" : "black"}
//               name="heart-o"
//               size={20}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             className="bg-white/70 p-2 rounded-full"
//             onPress={() => setIsVisible(true)}
//           >
//             <FontAwesome name="share-alt" size={20} color="black" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Product Info */}
//       <Text className="text-purple-600 text-2xl font-bold mt-4">
//         AED {product.price}
//       </Text>
//       <Text className="text-lg font-semibold text-gray-800 mt-1">
//         {product.name}
//       </Text>
//       <View className="border-b border-gray-200 my-2" />

//       {/* Product Details */}
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

//       {/* Action Buttons */}
//       <TouchableOpacity className="mt-6 border border-purple-600 rounded-md py-2 items-center">
//         <Text className="text-purple-600 font-semibold">Make an offer</Text>
//       </TouchableOpacity>

//       {/* Description */}
//       <View className="mt-6">
//         <Text className="text-lg font-semibold text-gray-800 mb-2">
//           Description
//         </Text>
//         <Text className="text-gray-700 flex-1">
//           {product.description || "No description provided."}
//         </Text>
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

//       {/* Seller Info */}
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

//       {/* Report Button */}
//       <TouchableOpacity className="mt-6 mb-10 flex-row items-center justify-center">
//         <Ionicons name="flag-outline" size={16} color="black" />
//         <Text className="text-sm ml-2">Report an ad</Text>
//       </TouchableOpacity>

//       {/* Share Modal */}
// <Modal
//   isVisible={isVisible}
//   onBackdropPress={() => setIsVisible(false)}
//   onBackButtonPress={() => setIsVisible(false)}
//   animationIn="slideInUp"
//   animationOut="slideOutDown"
//   backdropOpacity={0.4}
//   style={{ margin: 0, justifyContent: "flex-end" }}
// >
//         <ShareModal productUrl={productUrl} />
//       </Modal>
//     </ScrollView>
//   );
// };

// export default ProductDetail;

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
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import ShareModal from "../ShareModal";
// import Modal from "react-native-modal";

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
//   const [isFavourite, setIsFavourite] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);

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
//   // const { id } = useLocalSearchParams<{ id: string }>();
//   const handleFavourite = async () => {
//     try {
//       const userId = await AsyncStorage.getItem("userId");

//       if (!userId) {
//         alert("User not logged in.");
//         return;
//       }

//       const productId = id;

//       const response = await axios.post(
//         "https://backend.gamergizmo.com/product/favourite/addToFavourite",
//         {
//           userId,
//           productId,
//         }
//       );

//       console.log("Favourite added:", response.data);
//       setIsFavourite(true); // ✅ set heart as filled
//       alert("Added to favourites!");
//     } catch (err: any) {
//       console.error(
//         "Error adding to favourites:",
//         err.response?.data || err.message
//       );
//       alert("Failed to add favourite.");
//     }
//   };

//   const productUrl = `https://gamergizmo.com/product-details/${id}`;

//   if (loading) return <ActivityIndicator className="mt-20" />;
//   if (!product)
//     return <Text className="text-center mt-10">Product not found</Text>;

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
//           <TouchableOpacity
//             onPress={handleFavourite}
//             className="bg-white/70 p-2 rounded-full"
//           >
//             <FontAwesome
//               color={isFavourite ? "red" : "black"}
//               name="heart-o"
//               size={20}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             className="bg-white/70 p-2 rounded-full"
//             onPress={() => setIsVisible(true)}
//           >
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

//       <Modal
//         isVisible={isVisible}
//         onBackdropPress={() => setIsVisible(false)}
//         onBackButtonPress={() => setIsVisible(false)}
//         animationIn="slideInUp"
//         animationOut="slideOutDown"
//         backdropOpacity={0.4}
//         style={{ margin: 0, justifyContent: "flex-end" }}
//       >
//         <ShareModal productUrl={productUrl} />
//       </Modal>
//     </ScrollView>
//   );
// };

// export default ProductDetail;

// final codee:

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
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import ShareModal from "../ShareModal";
// import Modal from "react-native-modal";
// import { Linking } from "react-native";

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

// interface User {
//   id: number;
//   first_name: string;
//   last_name: string;
//   gender: string;
//   phone: string;
//   email: string;
//   created_at: string;
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

//   users?: User; // <--- Added this property
// }

// const ProductDetail = () => {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isFavourite, setIsFavourite] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);

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

//   const handleFavourite = async () => {
//     try {
//       const userId = await AsyncStorage.getItem("userId");

//       if (!userId) {
//         alert("User not logged in.");
//         return;
//       }

//       const productId = id;

//       const response = await axios.post(
//         "https://backend.gamergizmo.com/product/favourite/addToFavourite",
//         {
//           userId,
//           productId,
//         }
//       );

//       console.log("Favourite added:", response.data);
//       setIsFavourite(true);
//       alert("Added to favourites!");
//     } catch (err: any) {
//       console.error(
//         "Error adding to favourites:",
//         err.response?.data || err.message
//       );
//       alert("Failed to add favourite.");
//     }
//   };

//   const productUrl = `https://gamergizmo.com/product-details/${id}`;

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

//         <TouchableOpacity
//           onPress={() => router.push("/home")}
//           className="absolute top-2 left-2 bg-white/70 p-2 rounded-full"
//         >
//           <FontAwesome name="arrow-left" size={20} color="black" />
//         </TouchableOpacity>

//         <View className="absolute bottom-2 right-2 flex-row space-x-2">
//           <TouchableOpacity
//             onPress={handleFavourite}
//             className="bg-white/70 p-2 rounded-full"
//           >
//             <FontAwesome
//               color={isFavourite ? "red" : "black"}
//               name="heart-o"
//               size={20}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             className="bg-white/70 p-2 rounded-full"
//             onPress={() => setIsVisible(true)}
//           >
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

//       {/* User Info Section */}
//       <View className="mt-6 p-4 border border-gray-300 rounded-md bg-gray-50 shadow-sm">
//         <View className="flex-row items-center mb-2">
//           <Ionicons name="person-circle-outline" size={40} color="gray" />
//           <View className="ml-2">
//             <Text className="text-base font-semibold text-gray-800">
//               {product.users?.first_name} {product.users?.last_name} (
//               {product.users?.gender})
//             </Text>
//             <Text className="text-sm text-gray-500">
//               Member Since{" "}
//               {product.users?.created_at
//                 ? dayjs(product.users.created_at).format("DD MMM YYYY")
//                 : "N/A"}
//             </Text>
//           </View>
//         </View>

//         {/* WhatsApp */}
//         <TouchableOpacity
//           onPress={() => {
//             if (product.users?.phone) {
//               const phone = product.users.phone.replace(/\s+/g, ""); // remove any spaces
//               const url = `https://wa.me/${phone}`;
//               Linking.openURL(url).catch(() =>
//                 alert("WhatsApp is not installed or link is invalid")
//               );
//             }
//           }}
//           className="flex-row items-center mt-2"
//         >
//           <Ionicons name="logo-whatsapp" size={20} color="green" />
//           <Text className="ml-2 text-gray-700">{product.users?.phone}</Text>
//         </TouchableOpacity>

//         {/* Gmail */}
//         <TouchableOpacity
//           onPress={() => {
//             if (product.users?.email) {
//               const url = `mailto:${product.users.email}`;
//               Linking.openURL(url).catch(() =>
//                 alert("Unable to open email client")
//               );
//             }
//           }}
//           className="flex-row items-center mt-2"
//         >
//           <Ionicons name="mail-outline" size={20} color="gray" />
//           <Text className="ml-2 text-gray-700">{product.users?.email}</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Report */}
//       <TouchableOpacity className="mt-6 mb-10 flex-row items-center justify-center">
//         <Ionicons name="flag-outline" size={16} color="black" />
//         <Text className="text-sm ml-2">Report an ad</Text>
//       </TouchableOpacity>

//       <Modal
//         isVisible={isVisible}
//         onBackdropPress={() => setIsVisible(false)}
//         onBackButtonPress={() => setIsVisible(false)}
//         animationIn="slideInUp"
//         animationOut="slideOutDown"
//         backdropOpacity={0.4}
//         style={{ margin: 0, justifyContent: "flex-end" }}
//       >
//         <ShareModal productUrl={productUrl} />
//       </Modal>
//     </ScrollView>
//   );
// };

// export default ProductDetail;

// import {
//   View,
//   Text,
//   Image,
//   ActivityIndicator,
//   ScrollView,
//   TouchableOpacity,
//   Linking,
//   FlatList,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { router, useLocalSearchParams } from "expo-router";
// import axios from "axios";
// import { Ionicons } from "@expo/vector-icons";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";

// dayjs.extend(relativeTime);

// // Types
// interface ProductImage {
//   id: number;
//   image_url: string;
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

// interface User {
//   id: number;
//   first_name: string;
//   last_name: string;
//   gender: string;
//   phone: string;
//   email: string;
//   created_at: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   description?: string;
//   price: number;
//   location?: string;
//   created_at: string;
//   brands?: Brand;
//   models?: Model;
//   stock?: string;
//   category_id: number;
//   condition_product_conditionTocondition?: Condition;
//   product_images?: ProductImage[];
//   users?: User;
// }

// const API_BASE_URL = "https://backend.gamergizmo.com";

// const ProductDetail = () => {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   const getProduct = async () => {
//     try {
//       const res = await axios.get(
//         `${API_BASE_URL}/products/getProductById?id=${id}`
//       );
//       const data = res.data.data;
//       setProduct(data);
//       fetchSimilar(data.category_id, data.id);
//     } catch (error) {
//       console.error("Product fetch failed", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSimilar = async (categoryId: number, currentProductId: number) => {
//     try {
//       const res = await axios.get(
//         `${API_BASE_URL}/products/getAll?category_id=${categoryId}`
//       );
//       const all = res.data.data;
//       const filtered = all.filter((p: Product) => p.id !== currentProductId);
//       setSimilarProducts(filtered);
//     } catch (err) {
//       console.error("Similar products fetch failed", err);
//     }
//   };

//   const openWhatsApp = (phone: string) => {
//     const url = `https://wa.me/${phone}`;
//     Linking.openURL(url).catch(() => alert("WhatsApp not installed"));
//   };

//   const openEmail = (email: string) => {
//     const url = `mailto:${email}`;
//     Linking.openURL(url).catch(() => alert("Unable to open email client"));
//   };

//   useEffect(() => {
//     getProduct();
//   }, [id]);

//   if (loading) return <ActivityIndicator className="mt-20" />;
//   if (!product)
//     return <Text className="text-center mt-10">Product not found</Text>;

//   return (
//     <ScrollView className="p-4 bg-white">
//       {/* Product Image */}
//       <View className="h-48 rounded-lg overflow-hidden">
//         <Image
//           source={{
//             uri:
//               product.product_images && product.product_images.length > 0
//                 ? product.product_images[0].image_url
//                 : "https://via.placeholder.com/300",
//           }}
//           className="w-full h-48 rounded-lg"
//           resizeMode="cover"
//         />
//       </View>

//       {/* Price + Name */}
//       <Text className="text-purple-600 text-2xl font-bold mt-4">
//         AED {product.price}
//       </Text>
//       <Text className="text-lg font-semibold text-gray-800 mt-1">
//         {product.name}
//       </Text>

//       {/* Details */}
//       <View className="border-t border-b border-gray-200 my-4 py-4">
//         <Text className="text-sm text-gray-500">
//           Posted {dayjs(product.created_at).fromNow()}
//         </Text>
//         <Text className="text-sm text-gray-500">
//           Model: {product.models?.name || "N/A"}
//         </Text>
//         <Text className="text-sm text-gray-500">
//           Brand: {product.brands?.name || "N/A"}
//         </Text>
//         <Text className="text-sm text-gray-500">
//           Condition:{" "}
//           {product.condition_product_conditionTocondition?.name || "N/A"}
//         </Text>
//       </View>

//       {/* Description */}
//       <Text className="text-lg font-semibold text-gray-800 mb-2">
//         Description
//       </Text>
//       <Text className="text-gray-700 mb-4">
//         {product.description || "No description"}
//       </Text>

//       {/* Seller Info */}
//       <View className="mt-6 p-4 border border-gray-300 rounded-md bg-gray-50 shadow-sm">
//         <View className="flex-row items-center mb-2">
//           <Ionicons name="person-circle-outline" size={40} color="gray" />
//           <View className="ml-2">
//             <Text className="text-base font-semibold text-gray-800">
//               {product.users?.first_name} {product.users?.last_name} (
//               {product.users?.gender})
//             </Text>
//             <Text className="text-sm text-gray-500">
//               Member Since{" "}
//               {dayjs(product.users?.created_at).format("DD MMM YYYY")}
//             </Text>
//           </View>
//         </View>

//         <TouchableOpacity
//           className="flex-row items-center mt-2"
//           onPress={() => openWhatsApp(product.users?.phone || "")}
//         >
//           <Ionicons name="logo-whatsapp" size={20} color="green" />
//           <Text className="ml-2 text-gray-700">{product.users?.phone}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           className="flex-row items-center mt-2"
//           onPress={() => openEmail(product.users?.email || "")}
//         >
//           <Ionicons name="mail-outline" size={20} color="gray" />
//           <Text className="ml-2 text-gray-700">{product.users?.email}</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Similar Ads Section */}
//       <View className="mt-10">
//         <Text className="text-xl font-bold text-gray-800 mb-2">
//           Similar Ads
//         </Text>

//         <FlatList
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           data={similarProducts}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => {
//             const imageUrl =
//               Array.isArray(item.product_images) &&
//               item.product_images.length > 0 &&
//               item.product_images[0].image_url
//                 ? item.product_images[0].image_url
//                 : "https://via.placeholder.com/150";

//             return (
//               <TouchableOpacity
//                 className="mr-4 w-40"
//                 onPress={() => router.push(`/product/${item.id}`)}
//               >
//                 <Image
//                   source={{ uri: imageUrl }}
//                   className="h-24 w-full rounded-md"
//                   resizeMode="cover"
//                 />
//                 <Text
//                   className="text-sm font-semibold text-gray-800 mt-1"
//                   numberOfLines={1}
//                 >
//                   {item.name}
//                 </Text>
//                 <Text className="text-purple-600 text-sm">
//                   AED {item.price}
//                 </Text>
//               </TouchableOpacity>
//             );
//           }}
//         />
//       </View>
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
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShareModal from "../ShareModal";
import Modal from "react-native-modal";
import { Linking } from "react-native";

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
}

const ProductDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false); // 🔴 Track favourite status
  const [isVisible, setIsVisible] = useState(false);

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

  // ✅ Modified function to allow only one-time favourite
  const handleFavourite = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      if (!userId) {
        alert("User not logged in.");
        return;
      }

      // 🟡 If already favourited, prevent duplicate and show alert
      if (isFavourite) {
        Alert.alert(
          "Already Favourited",
          "This ad is already in your favourites."
        );
        return;
      }

      const productId = id;

      // ✅ Send request to backend to add to favourites
      const response = await axios.post(
        "https://backend.gamergizmo.com/product/favourite/addToFavourite",
        {
          userId,
          productId,
        }
      );

      console.log("Favourite added:", response.data);
      setIsFavourite(true); // 🔴 Mark as favourite in state
      alert("Added to favourites!");
    } catch (err: any) {
      console.error(
        "Error adding to favourites:",
        err.response?.data || err.message
      );
      alert("Failed to add favourite.");
    }
  };

  const productUrl = `https://gamergizmo.com/product-details/${id}`;

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
              // 🔄 Show filled heart icon if favourited
              color={isFavourite ? "red" : "black"}
              name={isFavourite ? "heart" : "heart-o"}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white/70 p-2 rounded-full"
            onPress={() => setIsVisible(true)}
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

      {/* User Info Section */}
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
              const url = `https://wa.me/${phone}`;
              Linking.openURL(url).catch(() =>
                alert("WhatsApp is not installed or link is invalid")
              );
            }
          }}
          className="flex-row items-center mt-2"
        >
          <Ionicons name="logo-whatsapp" size={20} color="green" />
          <Text className="ml-2 text-gray-700">{product.users?.phone}</Text>
        </TouchableOpacity>

        {/* Gmail */}
        <TouchableOpacity
          onPress={() => {
            if (product.users?.email) {
              const url = `mailto:${product.users.email}`;
              Linking.openURL(url).catch(() =>
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
