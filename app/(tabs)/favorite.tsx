// import React from "react";
// import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

// const Favorite = () => {
//   return (
//     <ScrollView>
//       <View className="bg-white w-full h-full">
//         <View className="border-b border-gray-200 pb-4">
//           <View className="px-4  py-4 flex-row items-center">
//             <TouchableOpacity>
//               <Image source={require("../../assets/images/left.png")} />
//             </TouchableOpacity>
//             <View className="flex-1 items-center -ml-48">
//               <Text className="text-black font-semibold text-lg">Favorite</Text>
//             </View>
//           </View>
//         </View>
//         <View className="items-center justify-center p-6">
//           <View className="flex-row items-center justify-between w-full mb-6">
//             <Text className="text-xl font-bold text-black">All Favorite</Text>
//             <Image
//               source={require("../../assets/images/default.png")}
//               className="mr-40"
//             />
//           </View>

//           <Image source={require("../../assets/images/favorite.png")} />

//           <Text className="text-lg font-bold text-black text-center mt-12">
//             You have no favorites saved on this list
//           </Text>
//           <Text className="text-gray-500 text-center mt-2 px-6">
//             Use the favorite icon to save ads that you want to check later
//           </Text>

//           <TouchableOpacity className="bg-white border border-gray-400 px-6 py-3 rounded-md mt-6">
//             <Text className="text-black font-semibold">Continue Searching</Text>
//           </TouchableOpacity>

//           <View className="flex items-center justify-center w-screen h-72 bg-purple-100 mt-6 p-4">
//             <View className="bg-white p-4 rounded-xl shadow-lg w-72">
//               <Text className="text-sm font-bold text-center text-black">
//                 Create Your First Personalized List
//               </Text>
//               <Text className="text-gray-500 text-center mt-2">
//                 Organize Your Favorites
//               </Text>
//               <Text className="text-gray-500 text-center mt-1">
//                 Invite friends to view or collaborate on your list
//               </Text>
//               <TouchableOpacity className=" mt-4 ml-16">
//                 <Image source={require("../../assets/images/list.png")} />
//                 {/* <Text className="text-center text-white font-medium">
//                   Make A List
//                 </Text> */}
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default Favorite;

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   ActivityIndicator,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";

// const Favorite = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();

//   const fetchFavorites = async () => {
//     try {
//       setLoading(true);
//       const userId = await AsyncStorage.getItem("userId");
//       console.log("UserId from AsyncStorage:", userId);

//       if (!userId) {
//         alert("User ID not found. Please log in again.");
//         setLoading(false);
//         return;
//       }

//       const response = await axios.get(
//         `https://backend.gamergizmo.com/product/favourite/getAll?userId=${userId}`
//       );

//       console.log("Favorite API response:", response.data);

//       if (response.data?.data) {
//         setFavorites(response.data.data);
//       } else {
//         setFavorites([]);
//       }
//     } catch (err) {
//       console.error("Error fetching favorites:", err);
//       alert("Failed to load favorites.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch favorites when screen is focused
//   useFocusEffect(
//     useCallback(() => {
//       fetchFavorites();
//     }, [])
//   );

//   const handleGoBack = () => {
//     navigation.goBack();
//   };

//   return (
//     <ScrollView>
//       <View className="bg-white w-full min-h-screen">
//         {/* Header */}
//         <View className="border-b border-gray-200 pb-4">
//           <View className="px-4 py-4 flex-row items-center">
//             <TouchableOpacity onPress={handleGoBack}>
//               <Image source={require("../../assets/images/left.png")} />
//             </TouchableOpacity>
//             <View className="flex-1 items-center -ml-48">
//               <Text className="text-black font-semibold text-lg">Favorite</Text>
//             </View>
//           </View>
//         </View>

//         {loading ? (
//           <ActivityIndicator size="large" className="mt-10" />
//         ) : favorites.length === 0 ? (
//           // Empty state
//           <View className="items-center justify-center p-6">
//             <Image source={require("../../assets/images/favorite.png")} />
//             <Text className="text-lg font-bold text-black text-center mt-12">
//               You have no favorites saved on this list
//             </Text>
//             <Text className="text-gray-500 text-center mt-2 px-6">
//               Use the favorite icon to save ads that you want to check later
//             </Text>
//             <TouchableOpacity
//               className="bg-white border border-gray-400 px-6 py-3 rounded-md mt-6"
//               onPress={() => navigation.navigate("Home")} // Change "Home" to your screen name
//             >
//               <Text className="text-black font-semibold">
//                 Continue Searching
//               </Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           // List of favorites
//           <View className="p-4">
//             {favorites.map((item, index) => {
//               const product = item.product ?? item; // depends if API returns product inside object
//               const imageUrl =
//                 product.product_images?.[0]?.image_url ||
//                 "https://via.placeholder.com/150";
//               return (
//                 <View
//                   key={index}
//                   className="bg-red-400 rounded-lg shadow-md p-4 mb-4"
//                 >
//                   <Image
//                     source={{ uri: imageUrl }}
//                     className="w-full h-40 rounded-lg"
//                     resizeMode="cover"
//                   />
//                   <Text className="text-black font-semibold text-lg mt-2">
//                     {product.name}
//                   </Text>
//                   <Text className="text-gray-600 mt-1">
//                     Price: {product.price}
//                   </Text>
//                 </View>
//               );
//             })}
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default Favorite;

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
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
        alert("User ID not found.");
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
      alert("Failed to load favorites.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

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
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
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
                      <View className="absolute top-2 right-2 bg-white rounded-full p-1">
                        <FontAwesome name="heart" size={20} color="red" />
                      </View>
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
