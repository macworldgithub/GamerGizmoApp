// import React from "react";
// import { View, Text, Image, TouchableOpacity } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import { ScrollView } from "react-native";

// const Processor = () => {
//   return (
//     <ScrollView>
//       <View className="bg-white  shadow-md p-4 ">
//         {/* Product Image with Back Arrow */}
//         <View className="relative">
//           <Image
//             source={require("../../assets/images/intel.png")}
//             className="w-full h-40 rounded-lg"
//             resizeMode="contain"
//           />
//           <TouchableOpacity className="absolute  left-2 bg-white p-2 rounded-full">
//             <FontAwesome name="arrow-left" size={20} color="black" />
//           </TouchableOpacity>
//           <View className="absolute  right-2 mt-36 flex-row gap-2">
//             <TouchableOpacity>
//               <FontAwesome name="heart-o" size={20} color="black" />
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <FontAwesome name="share-alt" size={20} color="black" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Price and Verified Badge */}

//         <View className="flex-row items-center mt-10  ">
//           <Text className="text-purple-600 font-bold text-xl">AED 551.00</Text>
//           <Image
//             source={require("../../assets/images/verified.png")}
//             className="ml-2"
//           />
//         </View>

//         {/* Product Name with Black Line */}
//         <Text className="text-gray-800 font-semibold text-lg mt-1">
//           USED INTEL CORE I7 7TH GEN PROCESSOR lorem ipsum lorem ipsum lorem
//           ipsum
//         </Text>
//         <View className=" mt-3 border border-gray-100" />

//         {/* Details Section */}
//         <Text className="text-gray-700 font-semibold mt-7">Details</Text>
//         <View className="flex-row justify-between mt-1">
//           <Text className=" text-black">Condition</Text>
//           <Text className="text-gray-500 mr-44">New</Text>
//         </View>
//         <View className="flex-row justify-between mt-1">
//           <Text className="text-black">Usage</Text>
//           <Text className=" text-gray-500 mr-7">
//             Still in original packaging
//           </Text>
//         </View>
//         <View className="flex-row justify-between mt-1">
//           <Text className="text-black">Posted On</Text>
//           <Text className=" text-gray-500 mr-28">10 Feb, 2025</Text>
//         </View>

//         {/* Make an Offer Button */}
//         <TouchableOpacity className="border border-purple-600 rounded-lg py-3 mt-8">
//           <Text className="text-purple-600 text-center font-semibold">
//             Make an Offer
//           </Text>
//         </TouchableOpacity>

//         {/* Description Section */}
//         <Text className="text-black font-bold mt-4">Description</Text>
//         <Text className="text-gray-700 mt-1">
//           Rule your game with AMD RadeonTM RX 6800 XT graphics card with 72
//           powerful compute units, 128 MB of new AMD Infinity Cache, and up to
//           16GB of GDDR6 memory.
//         </Text>
//         <View className=" mt-3 border border-gray-100" />
//         <Text className="text-gray-900 font-bold text-lg mt-4 ml-3">
//           Location
//         </Text>
//         <View className="flex-row items-center mt-1 ml-3">
//           <FontAwesome name="map-marker" size={18} color="gray" />
//           <Text className="text-gray-600 ml-2">Dubai</Text>
//         </View>

//         {/* Map Placeholder */}
//         <View className="bg-gray-300 w-full h-32  mt-3 flex items-center justify-center">
//           <Text className="text-gray-700 font-semibold">MAP</Text>
//         </View>

//         {/* Seller Info Card */}
//         <View className="bg-white border border-gray-300 rounded-2xl p-3 mt-4 flex-row items-center shadow-sm">
//           {/* Profile Image Placeholder */}
//           <View className="w-16 h-16 bg-gray-300 rounded-full"></View>

//           {/* Seller Details */}
//           <View className="ml-3 flex-1 ">
//             <Text className="text-gray-700 text-sm">Seller:</Text>
//             <Text className="text-black font-semibold">Muhammad Ahmed</Text>
//             <View className="flex-row items-center mt-1 ">
//               <Image
//                 source={require("../../assets/images/verified.png")}
//                 className=""
//               />
//               <Image
//                 source={require("../../assets/images/star.png")}
//                 className="ml-4"
//               />

//             </View>
//           </View>

//           {/* See More */}
//           <TouchableOpacity>
//             <Text className="text-blue-600 font-semibold">See More</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Report an Ad */}
//         <TouchableOpacity className="flex-row items-center justify-center mt-4">
//           <FontAwesome name="flag" size={16} color="black" />
//           <Text className="text-gray-700 ml-2">Report an ad</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default Processor;

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import Add from "../(tabs)/add";

const { width } = Dimensions.get("window");

const similarAds = [
  {
    id: "1",
    price: "AED 551.00",
    title: "Radeon RX 580 OC...",
    description: "Phantom Gaming D Radeon RX580 8G OC * Core Clock/ Memory...",
    image: require("../../assets/images/intel.png"),
  },
  {
    id: "2",
    price: "AED 551.00",
    title: "Radeon RX 580 OC...",
    description: "Phantom Gaming D Radeon RX580 8G OC * Core Clock/ Memory...",
    image: require("../../assets/images/processor.png"),
  },
  {
    id: "3",
    price: "AED 551.00",
    title: "Radeon RX 580 OC...",
    description: "Phantom Gaming D Radeon RX580 8G OC * Core Clock/ Memory...",
    image: require("../../assets/images/gen.png"),
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

const Processor = () => {
  return (
    <ScrollView>
      <View className="bg-white shadow-md p-4">
        {/* Product Image with Back Arrow */}
        <View className="relative">
          <Image
            source={require("../../assets/images/intel.png")}
            className="w-full h-40 rounded-lg"
            resizeMode="contain"
          />
          <TouchableOpacity className="absolute left-2 bg-white p-2 rounded-full">
            {/* <FontAwesome name="arrow-left" size={20} color="black" /> */}
            <Image source={require("../../assets/images/arrow.png")} />
          </TouchableOpacity>
          <View className="absolute right-2 mt-36 flex-row gap-2">
            <TouchableOpacity className="bg-white p-2 rounded-full">
              {/* <FontAwesome name="heart-o" size={20} color="black" /> */}
              <Image source={require("../../assets/images/heart.png")} />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-2 rounded-full">
              {/* <FontAwesome name="share-alt" size={20} color="black" /> */}
              <Image source={require("../../assets/images/share.png")} />
            </TouchableOpacity>
          </View>
        </View>

       
        <View className="flex-row items-center mt-10">
          <Text className="text-purple-600 font-bold text-xl">AED 551.00</Text>
          <Image
            source={require("../../assets/images/verified.png")}
            className="ml-2"
          />
        </View>

        
        <Text className="text-gray-800 font-semibold text-lg mt-1">
          USED INTEL CORE I7 7TH GEN PROCESSOR lorem ipsum lorem ipsum lorem
          ipsum
        </Text>
        <View className="mt-3 border border-gray-100" />
        <Text className="text-gray-700 font-semibold mt-7">Details</Text>
        <View className="flex-row justify-between mt-1">
          <Text className="text-black">Condition</Text>
          <Text className="text-gray-500 mr-44">New</Text>
        </View>
        <View className="flex-row justify-between mt-1">
          <Text className="text-black">Usage</Text>
          <Text className="text-gray-500 mr-7">
            Still in original packaging
          </Text>
        </View>
        <View className="flex-row justify-between mt-1">
          <Text className="text-black">Posted On</Text>
          <Text className="text-gray-500 mr-28">10 Feb, 2025</Text>
        </View>

        <TouchableOpacity className="border border-purple-600 rounded-lg py-3 mt-8">
          <Text className="text-purple-600 text-center font-semibold">
            Make an Offer
          </Text>
        </TouchableOpacity>

        <Text className="text-black font-bold mt-4">Description</Text>
        <Text className="text-gray-700 mt-1">
          Rule your game with AMD RadeonTM RX 6800 XT graphics card with 72
          powerful compute units, 128 MB of new AMD Infinity Cache, and up to
          16GB of GDDR6 memory.
        </Text>
        <View className="mt-10">
          <Add />
        </View>
        <View className="mt-10 border border-gray-100 " />
        <Text className="text-gray-900 font-bold text-lg mt-4 ml-3">
          Location
        </Text>
        <View className="flex-row items-center mt-1 ml-3">
          <FontAwesome name="map-marker" size={18} color="gray" />
          <Text className="text-gray-600 ml-2">Dubai</Text>
        </View>

        
        <View className="bg-gray-300 w-full h-32 mt-3 flex items-center justify-center">
          <Text className="text-gray-700 font-semibold">MAP</Text>
        </View>

     
        <View className="bg-white border border-gray-300 rounded-2xl p-3 mt-4 flex-row items-center shadow-sm">
          
          <View className="w-16 h-16 bg-gray-300 rounded-full"></View>

     
          <View className="ml-3 flex-1">
            <Text className="text-gray-700 text-sm">Seller:</Text>
            <Text className="text-black font-semibold">Muhammad Ahmed</Text>
            <View className="flex-row items-center mt-1">
              <Image source={require("../../assets/images/verified.png")} />
              <Image
                source={require("../../assets/images/star.png")}
                className="ml-4"
              />
            </View>
          </View>

          <TouchableOpacity>
            <Text className="text-blue-600 font-semibold">See More</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="flex-row items-center justify-center mt-4">
          <FontAwesome name="flag" size={16} color="black" />
          <Text className="text-gray-700 ml-2">Report an ad</Text>
        </TouchableOpacity>
        <View className="mt-10">
          <Add />
        </View>
        <View className="mt-6">
          <Text className="text-black font-bold text-lg mb-3">Similar Ads</Text>
          <Swiper
            style={{ height: 250 }}
            showsPagination={false}
            autoplay={false}
            autoplayTimeout={3}
            loop={true}
          >
            {similarAds
              .reduce((acc, _, i) => {
                if (i % 2 === 0) acc.push(similarAds.slice(i, i + 2));
                return acc;
              }, [])
              .map((group, index) => (
                <View key={index} className="flex-row justify-between px-2">
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
      </View>
    </ScrollView>
  );
};

export default Processor;
