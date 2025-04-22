import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const Tell = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <View className="">
        <Image source={require("../../assets/images/left.png")} className="" />

        <View className="items-center -mt-6">
          <Text className="text-black font-semibold text-lg">
            Tell us about your PC
          </Text>
        </View>
      </View>

      <View className=" border border-gray-200  p-3 mb-4 shadow-sm mt-10">
        <TextInput placeholder="Title" className="text-base text-black" />
      </View>

      <View className=" border border-gray-200  mb-4 ">
        <Picker
          selectedValue={brand}
          onValueChange={(itemValue) => setBrand(itemValue)}
        >
          <Picker.Item label="Brand" value="" />
          <Picker.Item label="Dell" value="dell" />
          <Picker.Item label="HP" value="hp" />
          <Picker.Item label="Lenovo" value="lenovo" />
        </Picker>
      </View>

      <View className=" border border-gray-200 mb-4 ">
        <Picker
          selectedValue={model}
          onValueChange={(itemValue) => setModel(itemValue)}
        >
          <Picker.Item label="Model" value="" />
          <Picker.Item label="Inspiron 15" value="inspiron" />
          <Picker.Item label="Pavilion" value="pavilion" />
          <Picker.Item label="ThinkPad" value="thinkpad" />
        </Picker>
      </View>

      <View className=" border border-gray-200 mb-4">
        <Picker
          selectedValue={condition}
          onValueChange={(itemValue) => setCondition(itemValue)}
        >
          <Picker.Item label="Condition" value="" />
          <Picker.Item label="New" value="new" />
          <Picker.Item label="Used - Like New" value="like_new" />
          <Picker.Item label="Used - Good" value="good" />
          <Picker.Item label="Used - Fair" value="fair" />
        </Picker>
      </View>

      <View className=" border border-gray-200 mb-4 ">
        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => setLocation(itemValue)}
        >
          <Picker.Item label="Location" value="" />
          <Picker.Item label="Karachi" value="karachi" />
          <Picker.Item label="Lahore" value="lahore" />
          <Picker.Item label="Islamabad" value="islamabad" />
        </Picker>
      </View>

      <View className=" border border-gray-200  p-8 mb-6 ">
        <TextInput
          placeholder="Description"
          multiline
          numberOfLines={4}
          className="text-base text-black"
        />
      </View>

      <TouchableOpacity className="">
        <Image
          source={require("../../assets/images/next1.png")}
          className="ml-20"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Tell;
