import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ToastAndroid,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setPrice } from "../../store/slice/adSlice";

const Set = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useLocalSearchParams();

  const from = params.from; // from query param

  const storedPrice = useSelector((state: RootState) => state.ad.price);
  const [price, setPriceLocal] = useState(Number(storedPrice) || 0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    dispatch(setPrice(price.toString()));
  }, [price]);

  const increment = (setter: (val: number) => void, value: number) =>
    setter(value + 1);

  const decrement = (setter: (val: number) => void, value: number) =>
    setter(value > 0 ? value - 1 : 0);

  const handleNext = () => {
    if (price <= 0 || quantity <= 0) {
      const message = "Price and quantity must be greater than 0.";
      if (Platform.OS === "android") {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
        alert(message);
      }
      return;
    }

    router.push("/image");
  };

  const handleBack = () => {
    if (from === "chooseType") {
      router.push("/chooseType");
    } else {
      router.push("/tell");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6 pb-24">
      <TouchableOpacity className="flex-row items-center border-b border-gray-200 pb-4 mb-6"
      onPress={handleBack}
      >
        <TouchableOpacity >
          <Image source={require("../../assets/images/left.png")} />
        </TouchableOpacity>
        <Text className="text-black text-base font-semibold flex-1 text-center -ml-6">
          Set Price
        </Text>
      </TouchableOpacity>

      {/* Price Input */}
      {/* <View className="border border-gray-200 rounded-md mb-4 p-3 flex-row items-center justify-between">
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
          <Ionicons name="add-circle-outline" size={24} color="gray" className="" />
        </TouchableOpacity>
      </View> */}

      {/* Quantity Input */}
      {/* <View className="border border-gray-200 rounded-md mb-10 p-3 flex-row items-center justify-between">
        <Text className="text-base text-black mr-2">Quantity:</Text>
        <TouchableOpacity onPress={() => decrement(setQuantity, quantity)} className="ml-7">
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
      </View> */}


<View className="border border-gray-200 rounded-md mb-4 px-4 py-3">
  <Text className="text-base text-black mb-2">Price (AED):</Text>
  <View className="flex-row items-center justify-center space-x-4">
    <TouchableOpacity
      onPress={() => decrement(setPriceLocal, price)}
      className="bg-gray-100 rounded-full w-10 h-10 items-center justify-center"
    >
      <Ionicons name="remove" size={24} color="gray" />
    </TouchableOpacity>

    <TextInput
      value={price.toString()}
      onChangeText={(text) => {
        const numeric = Number(text);
        if (!isNaN(numeric)) setPriceLocal(numeric);
      }}
      keyboardType="numeric"
      className="text-base text-black text-center w-20 border border-gray-300 rounded-md px-2 py-1"
    />

    <TouchableOpacity
      onPress={() => increment(setPriceLocal, price)}
      className="bg-gray-100 rounded-full w-10 h-10 items-center justify-center"
    >
      <Ionicons name="add" size={24} color="gray" />
    </TouchableOpacity>
  </View>
</View>

{/* Quantity Input */}
<View className="border border-gray-200 rounded-md mb-10 px-4 py-3">
  <Text className="text-base text-black mb-2">Quantity:</Text>
  <View className="flex-row items-center justify-center space-x-4">
    <TouchableOpacity
      onPress={() => decrement(setQuantity, quantity)}
      className="bg-gray-100 rounded-full w-10 h-10 items-center justify-center"
    >
      <Ionicons name="remove" size={24} color="gray" />
    </TouchableOpacity>

    <TextInput
      value={quantity.toString()}
      onChangeText={(text) => {
        const numeric = Number(text);
        if (!isNaN(numeric)) setQuantity(numeric);
      }}
      keyboardType="numeric"
      className="text-base text-black text-center w-20 border border-gray-300 rounded-md px-2 py-1"
    />

    <TouchableOpacity
      onPress={() => increment(setQuantity, quantity)}
      className="bg-gray-100 rounded-full w-10 h-10 items-center justify-center"
    >
      <Ionicons name="add" size={24} color="gray" />
    </TouchableOpacity>
  </View>
</View>


      {/* Next Button */}
      <TouchableOpacity onPress={handleNext}>
        <Image
          source={require("../../assets/images/next1.png")}
          className="ml-20"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Set;
