import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
// ✅ Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store"; // adjust if your store path is different
import { setPrice } from "../../store/slice/adSlice"; // adjust the path as needed

const Set = () => {
  const dispatch = useDispatch();

 
  const storedPrice = useSelector((state: RootState) => state.ad.price);
  const [price, setPriceLocal] = useState(Number(storedPrice) || 0);
  const [quantity, setQuantity] = useState(1); // Not used in Redux, adjust if needed

 
  useEffect(() => {
    dispatch(setPrice(price.toString()));
  }, [price]);

  const increment = (setter: (val: number) => void, value: number) =>
    setter(value + 1);

  const decrement = (setter: (val: number) => void, value: number) =>
    setter(value > 0 ? value - 1 : 0);

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6 pb-24">
      <View className="flex-row items-center border-b border-gray-200 pb-4 mb-6">
        <Link href="/tell" asChild>
          <TouchableOpacity>
            <Image source={require("../../assets/images/left.png")} />
          </TouchableOpacity>
        </Link>
        <Text className="text-black text-base font-semibold flex-1 text-center -ml-6">
          Set Price
        </Text>
      </View>

      {/* Price Input with +/- */}
      <View className="border border-gray-200 rounded-md mb-4 p-3 flex-row items-center justify-between">
        <Text className="text-base text-black mr-2">Price (AED):</Text>
        <TouchableOpacity onPress={() => decrement(setPriceLocal, price)}>
          <Ionicons name="remove-circle-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TextInput
          value={price.toString()}
          onChangeText={(text) => {
            const numeric = Number(text);
            if (!isNaN(numeric)) setPriceLocal(numeric);
          }}
          keyboardType="numeric"
          className="text-base text-black text-center w-16 mx-2"
        />
        <TouchableOpacity onPress={() => increment(setPriceLocal, price)}>
          <Ionicons name="add-circle-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Quantity Input with +/- */}
      <View className="border border-gray-200 rounded-md mb-10 p-3 flex-row items-center justify-between">
        <Text className="text-base text-black mr-2">Quantity:</Text>
        <TouchableOpacity onPress={() => decrement(setQuantity, quantity)}>
          <Ionicons name="remove-circle-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TextInput
          value={quantity.toString()}
          onChangeText={(text) => {
            const numeric = Number(text);
            if (!isNaN(numeric)) setQuantity(numeric);
          }}
          keyboardType="numeric"
          className="text-base text-black text-center w-16 mx-2"
        />
        <TouchableOpacity onPress={() => increment(setQuantity, quantity)}>
          <Ionicons name="add-circle-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <Link href="/image" asChild>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/next1.png")}
            className="ml-20"
          />
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
};

export default Set;

