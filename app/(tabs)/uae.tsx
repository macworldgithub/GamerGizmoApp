import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";

const slides = [
  {
    id: 1,
    image: require("../../assets/images/gpu.png"),
    title: "Find your Gaming PCs in the UAE",
    description:
      "Explore over 20,000 pcs and find exactly what you're looking for with the help of 1000+ trusted.",
  },
  {
    id: 2,
    image: require("../../assets/images/gaming.png"),
    title: "Get yourself a gaming experience",
    description:
      "Explore over 20,000 pcs and find exactly what you're looking for with the help of 1000+ trusted.",
  },
  {
    id: 3,
    image: require("../../assets/images/pc.png"),
    title: "Find your Gaming PC components",
    description:
      "Explore over 20,000 pcs and find exactly what you're looking for with the help of 1000+ trusted.",
  },
];

const uae = () => {
  return (
    <View className="flex-1 bg-white">
      <View className="absolute top-5 right-5">
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/cross.png")}
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>

      {/* Swiper */}
      <View className="flex-1">
        <Swiper loop={false} dotColor="#ddd" activeDotColor="#6d28d9">
          {slides.map((slide) => (
            <View
              key={slide.id}
              className="flex-1 items-center justify-center px-6"
            >
              <Image
                source={require("../../assets/images/logo.png")}
                className="w-20 h-20 mb-4"
              />
              <Image
                source={slide.image}
                className="w-60 h-60 mb-6"
                resizeMode="contain"
              />
              <Text className="text-xl font-bold text-center mb-2">
                {slide.title}
              </Text>
              <Text className="text-gray-600 text-center mb-6 mt-4">
                {slide.description}
              </Text>
            </View>
          ))}
        </Swiper>
      </View>

      {/* Button at Bottom */}
      <View className="items-center pb-10">
        <TouchableOpacity>
          <Image source={require("../../assets/images/button.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default uae;
