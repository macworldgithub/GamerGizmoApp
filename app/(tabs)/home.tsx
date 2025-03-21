

import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Swiper from "react-native-swiper";
const similarAds = [
  {
    id: "1",
    price: "AED 551.00",
    title: "Radeon RX 580 OC...",
    description: "Phantom Gaming D Radeon RX580 8G OC * Core Clock/ Memory...",
    image: require("../../assets/images/gpu1.png"),
  },
  {
    id: "2",
    price: "AED 551.00",
    title: "Radeon RX 580 OC...",
    description: "Phantom Gaming D Radeon RX580 8G OC * Core Clock/ Memory...",
    image: require("../../assets/images/gpu2.png"),
  },
  {
    id: "3",
    price: "AED 551.00",
    title: "Radeon RX 580 OC...",
    description: "Phantom Gaming D Radeon RX580 8G OC * Core Clock/ Memory...",
    image: require("../../assets/images/gpu3.png"),
  },
  {
    id: "4",
    price: "AED 551.00",
    title: "Radeon RX 580 OC...",
    description: "Phantom Gaming D Radeon RX580 8G OC * Core Clock/ Memory...",
    image: require("../../assets/images/gpu.png"),
  },
  {
    id: "5",
    price: "AED 551.00",
    title: "Radeon RX 580 OC...",
    description: "Phantom Gaming D Radeon RX580 8G OC * Core Clock/ Memory...",
    image: require("../../assets/images/gpu.png"),
  },
];
const consoles = [
  {
    id: "1",
    price: "AED 551.00",
    title: "CORSAIR VENGEANCE®",
    description: "Dynamic Multi-Zone RGB Lighting",
    image: require("../../assets/images/video.png"),
  },
  {
    id: "2",
    price: "AED 551.00",
    title: "PNY XLR8 Gaming 32GB",
    description: "A PNY XLR8 Gaming EPIC-X RGB Memory overclocked",
    image: require("../../assets/images/PNY.png"),
  },
  {
    id: "3",
    price: "AED 551.00",
    title: "XPG Lancer Blade RGB",
    description:
      "The LANCER BLADE RGB boasts a low-profile heatsink that fits perfectly in smaller PC",
    image: require("../../assets/images/Lancer.png"),
  },
  {
    id: "4",
    price: "AED 551.00",
    title: "Radeon RX 580 OC...",
    description: "Phantom Gaming D Radeon RX580 8G OC * Core Clock/ Memory...",
    image: require("../../assets/images/gpu.png"),
  },
  {
    id: "5",
    price: "AED 551.00",
    title: "Radeon RX 580 OC...",
    description: "Phantom Gaming D Radeon RX580 8G OC * Core Clock/ Memory...",
    image: require("../../assets/images/gpu.png"),
  },
];
const cases = [
  {
    id: "1",
    price: "AED 551.00",
    title: "CORSAIR VENGEANCE®",
    description: "Dynamic Multi-Zone RGB Lighting",
    image: require("../../assets/images/XLR8.png"),
  },
  {
    id: "2",
    price: "AED 551.00",
    title: "PNY XLR8 Gaming 32GB",
    description:
      "A PNY XLR8 Gaming EPIC-X RGB Memory overclockedPhantom Gaming D Radeon RX580 8G OC * Core Clock/ Memory...",
    image: require("../../assets/images/Corsair.png"),
  },
  {
    id: "3",
    price: "AED 551.00",
    title: "XPG Lancer Blade RGB",
    description:
      "The LANCER BLADE RGB boasts a low-profile heatsink that fits perfectly in smaller PC",
    image: require("../../assets/images/XPG.png"),
  },
  {
    id: "4",
    price: "AED 551.00",
    title: "Radeon RX 580 OC...",
    description: "Phantom Gaming D Radeon RX580 8G OC * Core Clock/ Memory...",
    image: require("../../assets/images/gpu.png"),
  },
  {
    id: "5",
    price: "AED 551.00",
    title: "Radeon RX 580 OC...",
    description: "Phantom Gaming D Radeon RX580 8G OC * Core Clock/ Memory...",
    image: require("../../assets/images/gpu.png"),
  },
];
const popular = [
  {
    id: "1",
    price: "AED 551.00",
    title: "CORSAIR VENGEANCE®",
    description: "Dynamic Multi-Zone RGB Lighting",
    image: require("../../assets/images/multi.png"),
  },
  {
    id: "2",
    price: "AED 551.00",
    title: "PNY XLR8 Gaming 32GB",
    description:
      "A PNY XLR8 Gaming EPIC-X RGB Memory overclockedPhantom Gaming D Radeon RX580 8G OC * Core Clock/ Memory...",
    image: require("../../assets/images/EPIC.png"),
  },
  {
    id: "3",
    price: "AED 551.00",
    title: "XPG Lancer Blade RGB",
    description:
      "The LANCER BLADE RGB boasts a low-profile heatsink that fits perfectly in smaller PC",
    image: require("../../assets/images/blade.png"),
  },
  {
    id: "4",
    price: "AED 551.00",
    title: "Radeon RX 580 OC...",
    description: "Phantom Gaming D Radeon RX580 8G OC * Core Clock/ Memory...",
    image: require("../../assets/images/gpu.png"),
  },
  {
    id: "5",
    price: "AED 551.00",
    title: "Radeon RX 580 OC...",
    description: "Phantom Gaming D Radeon RX580 8G OC * Core Clock/ Memory...",
    image: require("../../assets/images/gpu.png"),
  },
];

const categories = [
  { name: "Used Gaming PC", img: require("../../assets/images/pc1.png") },
  {
    name: "Used Gaming Laptops",
    img: require("../../assets/images/laptop.png"),
  },
  {
    name: "Used Gaming PC Parts",
    img: require("../../assets/images/both.png"),
  },
  {
    name: "Used Gaming Consoles",
    img: require("../../assets/images/gaming1.png"),
  },
  { name: "New Gaming PC Parts", img: require("../../assets/images/pc1.png") },
  {
    name: "New Gaming Laptops",
    img: require("../../assets/images/laptop.png"),
  },
  { name: "New Gaming Consoles", img: require("../../assets/images/both.png") },
  {
    name: "New Gaming Consoles",
    img: require("../../assets/images/gaming1.png"),
  },
  {
    name: "Customization & Gaming Gears",
    img: require("../../assets/images/gear.png"),
  },
];

export default function GamingStore() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  return (
    <View className="p-6 bg-gray-100 h-full">
      {/* Search Bar */}

      <View className="flex-row items-center bg-white border border-gray-300 rounded-full shadow-lg">
        <TextInput
          placeholder="Search"
          className="flex-1 text-gray-700 text-sm"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <ScrollView>
        {/* Categories List (3 items per row) */}
        <View className="bg-white mt-6 px-2 py-3 border-t border-gray-200 rounded-2xl">
          <View className="mt-6 flex flex-wrap flex-row justify-between">
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white w-[30%] m-1 p-3 rounded-lg shadow-lg shadow-purple-500 items-center"
              >
                <Image source={item.img} className="" />
                <Text className="text-center text-gray-700 mt-2 text-xs">
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View className="bg-purple-100 p-4 rounded-xl shadow-md mb-4 mt-6">
          {/* Row with Text & Image */}
          <View className="flex-row justify-between items-center">
            {/* Left Side - Text */}
            <View className="w-2/3">
              <Text className="text-lg font-semibold text-gray-900">
                New Projects
              </Text>
              <Text className="text-gray-600 text-sm">
                Get access to the latest gaming accessories
              </Text>
            </View>

            {/* Right Side - Image */}
            <Image
              source={require("../../assets/images/check.png")}
              className="w-20 h-20"
            />
          </View>

          {/* Explore More Button */}
          <TouchableOpacity className="mt-4 self-center w-full">
            <Image
              source={require("../../assets/images/explore.png")}
              className="w-full "
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Verified Badge Card */}
        <View className="bg-purple-200 p-4 rounded-xl shadow-md flex-row items-center justify-between mb-4 h-28">
          <View className="flex-row items-center">
            {/* <MaterialIcons name="verified" size={20} color="#6B46C1" /> */}
            <Image source={require("../../assets/images/verified1.png")} />

            <View className="ml-9">
              <Text className="text-sm font-semibold text-gray-900 text-center">
                Got a verified badge yet?
              </Text>
              <Text className="text-gray-600 text-xs text-center">
                Get more visibility
              </Text>
              <Text className="text-gray-600 text-xs text-center">
                Enhance your credibility
              </Text>
            </View>
          </View>
          {/* <ArrowRight size={20} color="black" /> */}
          <Image source={require("../../assets/images/right.png")} />
        </View>

        {/* Recently Viewed Card */}
        <View className="bg-white p-4 rounded-xl shadow-md flex-row items-center justify-between h-28">
          <View className="flex-row items-center">
            {/* <FontAwesome5 name="file-alt" size={20} color="#6B46C1" /> */}
            <Image source={require("../../assets/images/files.png")} />
            <View className="ml-2">
              <Text className="text-sm font-semibold text-gray-900">
                You recently looked at
              </Text>
              <Text className="text-gray-600 text-xs">
                Classifieds &gt; Computers & Accessories
              </Text>
            </View>
          </View>
         
          {/* <ArrowRight size={20} color="black" /> */}
          <Image source={require("../../assets/images/right.png")} />
        </View>
        <View className="mt-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-black font-bold text-lg mb-3">
              Popular in Used Gaming PC Parts
            </Text>
            <TouchableOpacity>
              <Image source={require("../../assets/images/right.png")} />
            </TouchableOpacity>
          </View>

          <Text className="text-gray-400 font-bold text-sm mb-3">
            Choose your necessary Parts from this Used Gaming Pc categories
          </Text>
          <Swiper
            style={{ height: 250 }}
            showsPagination={false}
            autoplay={false}
            autoplayTimeout={3}
            loop={true}
          >
            {similarAds
              .reduce((acc, _, i) => {
                if (i % 2 === 0) acc.push(similarAds.slice(i, i + 2)); // 2 items per slide
                return acc;
              }, [])
              .map((group, index) => (
                <View key={index} className="flex-row justify-between ">
                  {group.map((item) => (
                    <View
                      key={item.id}
                      className="bg-white p-3 rounded-lg shadow-md border border-gray-200 w-44"
                    >
                      <Image
                        source={item.image}
                        className="w-full h-32 rounded-lg"
                        resizeMode="contain"
                      />
                      <Text className="text-purple-600 font-bold text-lg mt-2">
                        {item.price}
                      </Text>
                      <Text className="text-black font-bold mt-1">
                        {item.title}
                      </Text>
                      <Text className="text-gray-600 text-sm mt-1">
                        {item.description}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
          </Swiper>
        </View>
        <View className="mt-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-black font-bold text-lg mb-3">
              Popular in Used Consoles
            </Text>
            <TouchableOpacity>
              {" "}
              <Image source={require("../../assets/images/right.png")} />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-400 font-bold text-sm mb-3">
            Choose your necessary Parts from this Used Gaming Pc categories
          </Text>

          <Swiper
            style={{ height: 250 }}
            showsPagination={false}
            autoplay={false}
            autoplayTimeout={3}
            loop={true}
          >
            {similarAds
              .reduce((acc, _, i) => {
                if (i % 2 === 0) acc.push(consoles.slice(i, i + 2)); // 2 items per slide
                return acc;
              }, [])
              .map((group, index) => (
                <View key={index} className="flex-row justify-between ">
                  {group.map((item) => (
                    <View
                      key={item.id}
                      className="bg-white p-3 rounded-lg shadow-md border border-gray-200 w-44"
                    >
                      <Image
                        source={item.image}
                        className="w-full h-32 rounded-lg"
                        resizeMode="contain"
                      />
                      <Text className="text-purple-600 font-bold text-lg mt-2">
                        {item.price}
                      </Text>
                      <Text className="text-black font-bold mt-1">
                        {item.title}
                      </Text>
                      <Text className="text-gray-600 text-sm mt-1">
                        {item.description}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
          </Swiper>
        </View>
        <View className="mt-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-black font-bold text-lg mb-3">
              Popular in Used Gaming Cases
            </Text>
            <TouchableOpacity>
              {" "}
              <Image source={require("../../assets/images/right.png")} />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-400 font-bold text-sm mb-3">
            Choose your necessary Parts from this Used Gaming Pc categories
          </Text>

          <Swiper
            style={{ height: 250 }}
            showsPagination={false}
            autoplay={false}
            autoplayTimeout={3}
            loop={true}
          >
            {similarAds
              .reduce((acc, _, i) => {
                if (i % 2 === 0) acc.push(cases.slice(i, i + 2)); // 2 items per slide
                return acc;
              }, [])
              .map((group, index) => (
                <View key={index} className="flex-row justify-between ">
                  {group.map((item) => (
                    <View
                      key={item.id}
                      className="bg-white p-3 rounded-lg shadow-md border border-gray-200 w-44"
                    >
                      <Image
                        source={item.image}
                        className="w-full h-32 rounded-lg"
                        resizeMode="contain"
                      />
                      <Text className="text-purple-600 font-bold text-lg mt-2">
                        {item.price}
                      </Text>
                      <Text className="text-black font-bold mt-1 text-sm">
                        {item.title}
                      </Text>
                      <Text className="text-gray-600 text-sm mt-1">
                        {item.description}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
          </Swiper>
        </View>
        <View className="mt-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-black font-bold text-lg mb-3">
              Popular in Used Gaming PCs
            </Text>
            <TouchableOpacity>
              {" "}
              <Image source={require("../../assets/images/right.png")} />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-400 font-bold text-sm mb-3">
            Choose your necessary Parts from this Used Gaming Pc categories
          </Text>

          <Swiper
            style={{ height: 250 }}
            showsPagination={false}
            autoplay={false}
            autoplayTimeout={3}
            loop={true}
          >
            {similarAds
              .reduce((acc, _, i) => {
                if (i % 2 === 0) acc.push(popular.slice(i, i + 2)); // 2 items per slide
                return acc;
              }, [])
              .map((group, index) => (
                <View key={index} className="flex-row justify-between ">
                  {group.map((item) => (
                    <View
                      key={item.id}
                      className="bg-white p-3 rounded-lg shadow-md border border-gray-200 w-44"
                    >
                      <Image
                        source={item.image}
                        className="w-full h-32 rounded-lg"
                        resizeMode="contain"
                      />
                      <Text className="text-purple-600 font-bold text-lg mt-2">
                        {item.price}
                      </Text>
                      <Text className="text-black font-bold mt-1">
                        {item.title}
                      </Text>
                      <Text className="text-gray-600 text-sm mt-1">
                        {item.description}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
          </Swiper>
        </View>
      </ScrollView>
    </View>
  );
}


// import React, { useState } from "react";
// import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
// // import { CheckCircle, XCircle } from "lucide-react-native";
// import Swiper from "react-native-swiper";

// const similarAds = [
//   { id: "1", price: "AED 551.00", title: "Radeon RX 580 OC...", description: "Phantom Gaming D Radeon RX580 8G OC * Core Clock/ Memory...", image: require("../../assets/images/gpu1.png") },
//   { id: "2", price: "AED 551.00", title: "Radeon RX 580 OC...", description: "Phantom Gaming D Radeon RX580 8G OC * Core Clock/ Memory...", image: require("../../assets/images/gpu2.png") },
// ];

// export default function PCInspection() {
//   const [search, setSearch] = useState("");
  
//   return (
//     <ScrollView className="p-4 bg-white rounded-2xl shadow-md">
//       {/* PC Inspection Section */}
//       <Text className="text-black text-lg font-semibold">Never buy a used laptop without</Text>
//       <Text className="text-lg font-bold"><Text className="text-purple-600">GamerGizmo</Text> PCs Inspection</Text>
      
//       <View className="flex-wrap flex-row mt-3">
//         {["CPU", "GPU", "Motherboard", "Temperatures", "Cooler", "RAM", "Usb Slots"].map((item, index) => (
//           <View key={index} className="flex-row items-center mr-3 mb-2">
//             {/* <CheckCircle size={18} color="purple" /> */}
//             <Text className="ml-1 text-black">{item}</Text>
//           </View>
//         ))}
//       </View>
      
//       <TouchableOpacity className="bg-purple-600 rounded-full px-4 py-2 mt-3 self-start">
//         <Text className="text-white font-semibold">Schedule Inspection</Text>
//       </TouchableOpacity>

//       <View className="mt-5 relative">
//         <Image source={require("../../assets/images/pc.png")} className="w-full h-64 rounded-lg" resizeMode="contain" />
//         <View className="absolute top-4 right-4 bg-purple-600 rounded-full px-3 py-2">
//           <Text className="text-white font-semibold text-sm">8/10 Condition</Text>
//         </View>
//         <View className="absolute bottom-6 left-6 flex-row items-center">
//           <Text className="text-black font-semibold">PSU</Text>
//           {/* <XCircle size={18} color="red" className="ml-1" /> */}
//         </View>
//       </View>

//       {/* Gaming Store Section */}
//       <View className="p-6 bg-gray-100 h-full mt-6">
//         <View className="flex-row items-center bg-white border border-gray-300 rounded-full shadow-lg">
//           <TextInput placeholder="Search" className="flex-1 text-gray-700 text-sm" value={search} onChangeText={setSearch} />
//         </View>
        
//         <View className="mt-6">
//           <Text className="text-black font-bold text-lg mb-3">Popular in Used Gaming PC Parts</Text>
//           <Swiper style={{ height: 250 }} showsPagination={false} autoplay={false} loop={true}>
//             {similarAds.map((item) => (
//               <View key={item.id} className="bg-white p-3 rounded-lg shadow-md border border-gray-200 w-44">
//                 <Image source={item.image} className="w-full h-32 rounded-lg" resizeMode="contain" />
//                 <Text className="text-purple-600 font-bold text-lg mt-2">{item.price}</Text>
//                 <Text className="text-black font-bold mt-1">{item.title}</Text>
//                 <Text className="text-gray-600 text-sm mt-1">{item.description}</Text>
//               </View>
//             ))}
//           </Swiper>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }
