// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { useRouter } from "expo-router";
// import PopularMainSection from "./PopularMainSection";
// import Add from "../(tabs)/add";
// import GetStartedBadge from "@/components/GetStartedBadge";

// // Categories data
// const categories = [
//   {
//     name: "Used Gaming PC",
//     img: require("../../assets/images/pc1.png"),
//     category: "desktop",
//     condition: 2,
//   },
//   {
//     name: "Used Gaming Laptops",
//     img: require("../../assets/images/laptop.png"),
//     category: "laptops",
//     condition: 2,
//   },
//   {
//     name: "Used Components and Accessories",
//     img: require("../../assets/images/both.png"),
//     category: "components",
//     condition: 2,
//   },
//   {
//     name: "Used Gaming Consoles",
//     img: require("../../assets/images/gaming1.png"),
//     category: "console",
//     condition: 2,
//   },
//   {
//     name: "New Gaming PC ",
//     img: require("../../assets/images/pc1.png"),
//     category: "desktop",
//     condition: 1,
//   },
//   {
//     name: "New Gaming Laptops",
//     img: require("../../assets/images/laptop.png"),
//     category: "laptops",
//     condition: 1,
//   },
//   {
//     name: "New Components and Accessories",
//     img: require("../../assets/images/both.png"),
//     category: "components",
//     condition: 1,
//   },
//   {
//     name: "New Gaming Consoles",
//     img: require("../../assets/images/both.png"),
//     category: "console",
//     condition: 1,
//   },
//   {
//     name: "Customization & Gaming Gears",
//     img: require("../../assets/images/gear.png"),
//     category: "components",
//     condition: 1,
//   },
// ];

// export default function GamingStore() {
//   const [search, setSearch] = useState("");
//   const router = useRouter();

//   // Handle category click
//   const handleCategoryClick = (category: string, condition: string) => {
//     router.push({
//       pathname: "/ExploreScreen",
//       params: {
//         category: category,
//         condition: condition,
//       },
//     });
//   };

//   return (
//     <View className="p-6 bg-gray-100 h-full">
//       {/* Search Bar */}
//       <View className="flex-row items-center bg-white border border-gray-300 rounded-full shadow-lg">
//         <TextInput
//           placeholder="Search"
//           className="flex-1 py-4 text-gray-700 text-md placeholder:px-4"
//           value={search}
//           onChangeText={setSearch}
//         />
//       </View>

//       <ScrollView>
//         {/* Categories List (3 items per row) */}
//         <View className="bg-white mt-6 px-2 py-3 border-t border-gray-200 rounded-2xl">
//           <View className="mt-6 flex flex-wrap flex-row justify-between">
//             {categories.map((item, index) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() =>
//                   //@ts-ignore
//                   handleCategoryClick(item.category, item.condition)
//                 }
//                 className="bg-white w-[30%] m-1 p-3 rounded-lg shadow-lg shadow-purple-500 items-center"
//               >
//                 <Image source={item.img} />
//                 <Text className="text-center text-gray-700 mt-2 text-xs">
//                   {item.name}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

// <GetStartedBadge/>

//         <View>
//           <Add />
//         </View>

//         <PopularMainSection />
//       </ScrollView>
//     </View>
//   );
// }

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
// } from "react-native";
// import { useRouter } from "expo-router";
// import PopularMainSection from "./PopularMainSection";
// import Add from "../(tabs)/add";
// import GetStartedBadge from "@/components/GetStartedBadge";
// import axios from "axios";
// import { useLocalSearchParams } from "expo-router";

// const categories = [
//   {
//     name: "Used Gaming PC",
//     img: require("../../assets/images/pc1.png"),
//     category: "desktop",
//     condition: 2,
//   },
//   {
//     name: "Used Gaming Laptops",
//     img: require("../../assets/images/laptop.png"),
//     category: "laptops",
//     condition: 2,
//   },
//   {
//     name: "Used Components and Accessories",
//     img: require("../../assets/images/both.png"),
//     category: "components",
//     condition: 2,
//   },
//   {
//     name: "Used Gaming Consoles",
//     img: require("../../assets/images/gaming1.png"),
//     category: "console",
//     condition: 2,
//   },
//   {
//     name: "New Gaming PC ",
//     img: require("../../assets/images/pc1.png"),
//     category: "desktop",
//     condition: 1,
//   },
//   {
//     name: "New Gaming Laptops",
//     img: require("../../assets/images/laptop.png"),
//     category: "laptops",
//     condition: 1,
//   },
//   {
//     name: "New Components and Accessories",
//     img: require("../../assets/images/both.png"),
//     category: "components",
//     condition: 1,
//   },
//   {
//     name: "New Gaming Consoles",
//     img: require("../../assets/images/both.png"),
//     category: "console",
//     condition: 1,
//   },
//   {
//     name: "Customization & Gaming Gears",
//     img: require("../../assets/images/gear.png"),
//     category: "components",
//     condition: 1,
//   },
// ];

// export default function GamingStore() {
//   const [search, setSearch] = useState("");
//   const [results, setResults] = useState([]);
//   const router = useRouter();
// const { productId } = useLocalSearchParams();
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       if (search.trim()) {
//         fetchSearchResults(search);
//       } else {
//         setResults([]);
//       }
//     }, 500);

//     return () => clearTimeout(delayDebounce);
//   }, [search]);

//   const fetchSearchResults = async (query) => {
//     try {
//       const response = await axios.get(
//         "https://backend.gamergizmo.com/products/search",
//         {
//           params: { query },
//         }
//       );
//       setResults(response.data.products || []);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   const handleCategoryClick = (category, condition) => {
//     router.push({
//       pathname: "/ExploreScreen",
//       params: {
//         category,
//         condition,
//       },
//     });
//   };

//   return (
//     <View className="p-6 bg-gray-100 h-full">
//       {/* Search Bar */}
//       <View className="flex-row items-center bg-white border border-gray-300 rounded-full shadow-lg">
//         <TextInput
//           placeholder="Search"
//           className="flex-1 py-4 px-4 text-gray-700 text-md"
//           value={search}
//           onChangeText={setSearch}
//         />
//       </View>

//       {/* Search Results */}
//      <FlatList
//   data={results}
//   keyExtractor={(item) => item.id.toString()}
//   renderItem={({ item }) => (
//     <TouchableOpacity
//       onPress={() =>
//         router.push({
//           pathname: "/product-details",
//           params: { productId: item.id },
//         })
//       }
//       className="p-2 border-b border-gray-200"
//     >
//       <Text className="text-gray-800">{item.name}</Text>
//     </TouchableOpacity>
//   )}
// />

//       <ScrollView>
//         {/* Categories List */}
//         <View className="bg-white mt-6 px-2 py-3 border-t border-gray-200 rounded-2xl">
//           <View className="mt-6 flex flex-wrap flex-row justify-between">
//             {categories.map((item, index) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => handleCategoryClick(item.category, item.condition)}
//                 className="bg-white w-[30%] m-1 p-3 rounded-lg shadow-lg shadow-purple-500 items-center"
//               >
//                 <Image source={item.img} />
//                 <Text className="text-center text-gray-700 mt-2 text-xs">
//                   {item.name}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         <GetStartedBadge />
//         <Add />
//         <PopularMainSection />
//       </ScrollView>
//     </View>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import PopularMainSection from "./PopularMainSection";
import Add from "../(tabs)/add";
import GetStartedBadge from "@/components/GetStartedBadge";
import axios from "axios";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";


const categories = [
  {
    name: "Used Gaming PC",
    img: require("../../assets/images/pc1.png"),
    category: "desktop",
    condition: 2,
  },
  {
    name: "Used Gaming Laptops",
    img: require("../../assets/images/laptop.png"),
    category: "laptops",
    condition: 2,
  },
  {
    name: "Used Components and Accessories",
    img: require("../../assets/images/both.png"),
    category: "components",
    condition: 2,
  },
  {
    name: "Used Gaming Consoles",
    img: require("../../assets/images/gaming1.png"),
    category: "console",
    condition: 2,
  },
  {
    name: "New Gaming PC ",
    img: require("../../assets/images/pc1.png"),
    category: "desktop",
    condition: 1,
  },
  {
    name: "New Gaming Laptops",
    img: require("../../assets/images/laptop.png"),
    category: "laptops",
    condition: 1,
  },
  {
    name: "New Components and Accessories",
    img: require("../../assets/images/both.png"),
    category: "components",
    condition: 1,
  },
  {
    name: "New Gaming Consoles",
    img: require("../../assets/images/both.png"),
    category: "console",
    condition: 1,
  },
  {
    name: "Customization & Gaming Gears",
    img: require("../../assets/images/gear.png"),
    category: "components",
    condition: 1,
  },
];

export default function GamingStore() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim()) {
        fetchSearchResults(search);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);
//@ts-ignore
  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(
        "https://backend.gamergizmo.com/products/search",
        {
          params: { query },
        }
      );
      setResults(response.data.products || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
//@ts-ignore
  const handleCategoryClick = (category, condition) => {
    router.push({
      pathname: "/ExploreScreen",
      params: {
        category,
        condition,
      },
    });
  };

  return (
    <View className="p-6 bg-gray-100 h-full">
   
      {/* <View className="flex-row items-center bg-white border border-gray-300 rounded-full shadow-lg">
        <TextInput
          placeholder="Search"
          className="flex-1 py-4 px-4 text-gray-700 text-md"
          value={search}
          onChangeText={setSearch}
        />
      </View>

    
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
         onPress={() =>
              router.push({
                pathname: "/product/[id]",
                params: { id: item.id.toString() },
              })
            }
            className="p-2 border-b border-gray-200"
          >
            <Text className="text-gray-800">{item.name}</Text>
          </TouchableOpacity>
        )}
      /> */}


       <View className="flex-row items-center bg-gray-100 border border-gray-300 rounded-full px-4 py-2 shadow-sm">
    <MagnifyingGlassIcon size={20} color="#6b7280" className="mr-2" />
    <TextInput
      placeholder="Search for products..."
      className="flex-1 text-gray-800 text-base"
      value={search}
      onChangeText={setSearch}
      placeholderTextColor="#9ca3af"
    />
  </View>

  {/* Search Results */}
  <FlatList
    data={results}
    
    keyExtractor={(item:any) => item.id.toString()}
    className="mt-4"
    renderItem={({ item }) => (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/product/[id]",
            params: { id: item.id.toString() },
          })
        }
        className="mb-3 bg-white p-4 rounded-xl shadow-md border border-gray-100"
      >
      
        <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
     
      </TouchableOpacity>
    )}
  />

      <ScrollView>
        {/* Categories List */}
        <View className="bg-white mt-6 px-2 py-3 border-t border-gray-200 rounded-2xl">
          <View className="mt-6 flex flex-wrap flex-row justify-between">
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  handleCategoryClick(item.category, item.condition)
                }
                className="bg-white w-[30%] m-1 p-3 rounded-lg shadow-lg shadow-purple-500 items-center"
              >
                <Image source={item.img} />
                <Text className="text-center text-gray-700 mt-2 text-xs">
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <GetStartedBadge />
        <Add />
        <PopularMainSection />
      </ScrollView>
    </View>
  );
}
