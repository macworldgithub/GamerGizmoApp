import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

const Set = () => {
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6 pb-24">
      
      <View className="flex-row items-center border-b border-gray-200 pb-4 mb-6">
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-black text-base font-semibold flex-1 text-center -ml-6">
          Set Price
        </Text>
      </View>

     
      <View className="border border-gray-200 rounded-md mb-4">
        <Picker selectedValue={price} onValueChange={(val) => setPrice(val)}>
          <Picker.Item label="Price (AED)" value="" />
          <Picker.Item label="100 AED" value="100" />
          <Picker.Item label="200 AED" value="200" />
          <Picker.Item label="300 AED" value="300" />
        </Picker>
      </View>

      
      <View className="border border-gray-200 rounded-md mb-10">
        <Picker
          selectedValue={quantity}
          onValueChange={(val) => setQuantity(val)}
        >
          <Picker.Item label="Quantity" value="" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
        </Picker>
      </View>

      
      <TouchableOpacity className="items-center -mt-15 mb-10">
        <Image
          source={require("../../assets/images/next1.png")}
          className=" "
          resizeMode="contain"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Set;
