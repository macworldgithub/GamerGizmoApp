// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   Image,
// } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";

// const Category = () => {
//   return (
//     <SafeAreaView className="flex-1 bg-white">

//       <View className="px-4 mt-4 py-4 flex">
//         <View className="border-b border-gray-200 pb-8">
//           <Image
//             source={require("../../assets/images/left.png")}
//             className=""
//           />

//           <View className="items-center -mt-6">
//             <Text className="text-black font-semibold text-lg">
//               Category Selection
//             </Text>
//           </View>
//         </View>
//       </View>

//       <ScrollView className="mt-2">
//         <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
//           <Text className="text-black text-base">Gaming PCs</Text>
//         </TouchableOpacity>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Category;

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { API_BASE_URL } from "@/utils/config";
import { useRouter } from "expo-router";

const Category = ({ navigation }: any) => {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setVisible(true);
    }, [])
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/categories/getAll`);

        if (response.data?.data) {
          const updatedCategories = response.data.data.map((item: any) => {
            let newName = item.name;

            if (item.name === "Desktops") newName = "Gaming PCs";
            else if (item.name === "Components") newName = "Laptops";
            else if (item.name === "Laptops") newName = "Gaming Consoles";
            else if (item.name === "Gaming Consoles")
              newName = "Components and Accessories";

            return { ...item, name: newName };
          });

          setCategories(updatedCategories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category: any) => {
    console.log("Selected category:", category);
    setVisible(false);

    router.push({
      pathname: "/tell",
      params: { category },
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="border-b border-gray-200 pb-4">
          <View className="px-4 mt-4 py-4 flex-row items-center">
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                source={require("../../assets/images/cross.png")}
                className="w-5 h-5"
              />
            </TouchableOpacity>
            <View className="flex-1 items-center -ml-5">
              <Text className="text-black font-semibold text-lg">
                Select a Category
              </Text>
              {/* <Text className="text-gray-400 text-sm">
                Choose the product type you're advertising
              </Text> */}
            </View>
          </View>
        </View>

        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <ScrollView>
            {categories.map((category: any) => (
              <TouchableOpacity
                key={category.id}
                className="border-b border-gray-200 px-4 py-4"
                onPress={() => handleCategorySelect(category)}
              >
                <Text className="text-black text-base ml-2">
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default Category;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   SafeAreaView,
//   ActivityIndicator,
// } from "react-native";
// import axios from "axios";
// import { API_BASE_URL } from "@/utils/config";

// const Category = ({ navigation, route }: any) => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { city } = route.params || {}; // ✅ Receive selected city from Placead

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/categories/getAll`);

//         if (response.data?.data) {
//           const updatedCategories = response.data.data.map((item: any) => {
//             let newName = item.name;

//             if (item.name === "Desktops") newName = "Gaming PCs";
//             else if (item.name === "Components") newName = "Laptops";
//             else if (item.name === "Laptops") newName = "Gaming Consoles";
//             else if (item.name === "Gaming Consoles")
//               newName = "Components and Accessories";

//             return { ...item, name: newName };
//           });

//           setCategories(updatedCategories);
//         }
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleCategorySelect = (category: any) => {
//     // Log values for now
//     console.log("Selected category:", category);
//     console.log("Selected city:", city);

//     // Optional: navigate to next screen with both city and category
//     // navigation.navigate("NextScreen", { city, category });
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       {/* Header */}
//       <View className="border-b border-gray-200 pb-4">
//         <View className="px-4 mt-4 py-4 flex-row items-center">
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Image
//               source={require("../../assets/images/cross.png")}
//               className="w-5 h-5"
//             />
//           </TouchableOpacity>
//           <View className="flex-1 items-center -ml-5">
//             <Text className="text-black font-semibold text-lg">
//               Select a Category
//             </Text>
//             {city && (
//               <Text className="text-gray-400 text-sm">City: {city}</Text>
//             )}
//           </View>
//         </View>
//       </View>

//       {/* Category List */}
//       {loading ? (
//         <View className="flex-1 justify-center items-center">
//           <ActivityIndicator size="large" color="#000" />
//         </View>
//       ) : (
//         <ScrollView>
//           {categories.map((category: any) => (
//             <TouchableOpacity
//               key={category.id}
//               className="border-b border-gray-200 px-4 py-4"
//               onPress={() => handleCategorySelect(category)}
//             >
//               <Text className="text-black text-base ml-2">{category.name}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       )}
//     </SafeAreaView>
//   );
// };

// export default Category;
