// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   Modal,
//   SafeAreaView,
//   ActivityIndicator,
// } from "react-native";
// import axios from "axios";
// import { useFocusEffect } from "@react-navigation/native";
// import { API_BASE_URL } from "@/utils/config";
// import { useRouter } from "expo-router";

// // ✅ Redux imports
// import { useDispatch } from "react-redux";
// import { setCategory } from "../../store/slice/adSlice"; // adjust path if needed

// const Category = ({ navigation }: any) => {
//   const [visible, setVisible] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   // ✅ Redux dispatcher
//   const dispatch = useDispatch();

//   useFocusEffect(
//     useCallback(() => {
//       setVisible(true);
//     }, [])
//   );

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
//     console.log("Selected category:", category);

//     // ✅ Dispatch to Redux store
//     dispatch(setCategory(category));

//     setVisible(false);
//     router.push({
//       pathname: "/tell",
//       params: { category },
//     });
//   };

//   return (
//     <Modal visible={visible} animationType="slide" transparent={false}>
//       <SafeAreaView className="flex-1 bg-white">
//         <View className="border-b border-gray-200 pb-4">
//           <View className="px-4 mt-4 py-4 flex-row items-center">
//             <TouchableOpacity onPress={() => setVisible(false)}>
//               <Image
//                 source={require("../../assets/images/cross.png")}
//                 className="w-5 h-5"
//               />
//             </TouchableOpacity>
//             <View className="flex-1 items-center -ml-5">
//               <Text className="text-black font-semibold text-lg">
//                 Select a Category
//               </Text>
//             </View>
//           </View>
//         </View>

//         {loading ? (
//           <View className="flex-1 justify-center items-center">
//             <ActivityIndicator size="large" color="#000" />
//           </View>
//         ) : (
//           <ScrollView>
//             {categories.map((category: any) => (
//               <TouchableOpacity
//                 key={category.id}
//                 className="border-b border-gray-200 px-4 py-4"
//                 onPress={() => handleCategorySelect(category)}
//               >
//                 <Text className="text-black text-base ml-2">
//                   {category.name}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         )}
//       </SafeAreaView>
//     </Modal>
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

// ✅ Redux imports
import { useDispatch } from "react-redux";
import { setCategory } from "../../store/slice/adSlice"; // adjust path if needed

const Category = ({ navigation }: any) => {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Redux dispatcher
  const dispatch = useDispatch();

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
          
          const nameMapping: { [key: string]: { name: string; id: number } } = {
            Desktops: { name: "Gaming PCs", id: 2 },
            Components: { name: "Laptops", id: 1 },
            Laptops: { name: "Gaming Consoles", id: 4 },
            "Gaming Consoles": { name: "Components and Accessories", id: 3 },
          };

          const updatedCategories = response.data.data.map((item: any) => {
            const mapped = nameMapping[item.name];
            return mapped ? { ...item, ...mapped } : item;
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

    // ✅ Dispatch to Redux store
    dispatch(setCategory(category));

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
