import { View, Text, TouchableOpacity,Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const categories = [
  "Processors",
  "Rams",
  "Motherboards",
  "PSU",
  "Casings",
  "SSD",
  "Hard drives",
  "Graphic Cards",
  "RGB Fans",
];

export default function Part() {
  return (
    <View className="flex-1 bg-white">
      
      <View className="flex-row items-center p-4 border-b border-gray-200 mt-3 ">
        {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
        <TouchableOpacity>
       <Image source={require("../../assets/images/arrow.png")}/>
       </TouchableOpacity>
        <Text className="text-lg font-semibold ml-7">Gaming PC Parts</Text>
      
      </View>
     

   
      <View className="mt-2">
        {categories.map((item, index) => (
          <TouchableOpacity key={index} className="p-4 border-b border-gray-200">
            <Text className="text-sm text-black ml-4 font-semibold">{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
