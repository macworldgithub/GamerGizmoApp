import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const RatingStars = ({ rating }) => {
  const totalStars = 5;
  return (
    <View className="flex-row">
      {[...Array(totalStars)].map((_, index) => (
        <MaterialIcons
          key={index}
          name={index < rating ? "star" : "star-border"}
          size={16}
          color={index < rating ? "#FFD700" : "gray"}
        />
      ))}
    </View>
  );
};

// Dummy Data for Processors
const processors = [
  {
    id: "1",
    name: "USED INTEL CORE I7 7TH GEN PROCESSOR (WITHOUT BOX)",
    specs: "# of Cores 4 | # of Threads 8 | Base 3.60 GHz | Turbo 4.20 GHz | Cache 8MB",
    price: "AED 551.00",
    rating: 4,
    image: require("../../assets/images/core.png"),
  },
  {
    id: "2",
    name: "AMD RYZEN 5 3600 6-CORE 12-THREAD PROCESSOR",
    specs: "# of Cores 6 | # of Threads 12 | Base 3.60 GHz | Turbo 4.20 GHz | Cache 35MB",
    price: "AED 620.00",
    rating: 5,
    image: require("../../assets/images/core.png"),
  },
  {
    id: "3",
    name: "Intel Core i5-9600K 9th Gen Processor",
    specs: "# of Cores 6 | # of Threads 6 | Base 3.70 GHz | Turbo 4.60 GHz | Cache 9MB",
    price: "AED 450.00",
    rating: 3,
    image: require("../../assets/images/core.png"),
  },
  {
    id: "4",
    name: "Intel Core i5-9600K 9th Gen Processor",
    specs: "# of Cores 6 | # of Threads 6 | Base 3.70 GHz | Turbo 4.60 GHz | Cache 9MB",
    price: "AED 450.00",
    rating: 3,
    image: require("../../assets/images/core.png"),
  },
  {
    id: "5",
    name: "Intel Core i5-9600K 9th Gen Processor",
    specs: "# of Cores 6 | # of Threads 6 | Base 3.70 GHz | Turbo 4.60 GHz | Cache 9MB",
    price: "AED 450.00",
    rating: 3,
    image: require("../../assets/images/core.png"),
  },
];

const ProcessorCard = () => {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center mt-3">
        <TouchableOpacity>
          <Image source={require("../../assets/images/arrow.png")} className="ml-4" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold ml-24">My Profile</Text>
      </View>

      {/* Icons Row */}
      <View className="flex-row justify-between mt-6">
        <Image source={require("../../assets/images/filter.png")} />
        <Image source={require("../../assets/images/price.png")} />
        <Image source={require("../../assets/images/model.png")} />
        <Image source={require("../../assets/images/location1.png")} />
      </View>

     
      <ScrollView>
        {processors.map((item) => (
          <View key={item.id} className="flex-row items-center p-4 bg-white rounded-2xl shadow-md border border-gray-200 mx-2 mt-5">
            <Image source={item.image} className="w-24 h-24 rounded-lg -mt-16" resizeMode="contain" />
            <View className="flex-1 ml-4">
              <Text className="text-sm font-bold text-black">{item.name}</Text>
              <Text className="text-gray-500 text-xs mt-1">{item.specs}</Text>

              {/* Rating Stars */}
              <View className="flex-row mt-2">
                <RatingStars rating={item.rating} />
              </View>

              {/* Price and Buy Button */}
              <View className="flex-row justify-between mt-3">
                <Text className="text-xl font-bold text-[#6345ED] -ml-24">{item.price}</Text>
                <TouchableOpacity>
                  <Image source={require("../../assets/images/buy.png")} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProcessorCard;
