// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { Ionicons } from "@expo/vector-icons";
// import { Link } from "expo-router";

// const Set = () => {
//   const [price, setPrice] = useState("");
//   const [quantity, setQuantity] = useState("");

//   return (
//     <ScrollView className="flex-1 bg-white px-4 py-6 pb-24">
//       <View className="flex-row items-center border-b border-gray-200 pb-4 mb-6">
//         <TouchableOpacity>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//         <Text className="text-black text-base font-semibold flex-1 text-center -ml-6">
//           Set Price
//         </Text>
//       </View>

//       <View className="border border-gray-200 rounded-md mb-4">
//         <Picker
//           selectedValue={price}
//           onValueChange={(val) => {
//             setPrice(val);
//             console.log("Selected price:", val);
//           }}
//         >
//           <Picker.Item label="Price (AED)" value="" />
//           <Picker.Item label="100 AED" value="100" />
//           <Picker.Item label="200 AED" value="200" />
//           <Picker.Item label="300 AED" value="300" />
//         </Picker>
//       </View>

//       <View className="border border-gray-200 rounded-md mb-10">
//         <Picker
//           selectedValue={quantity}
//           onValueChange={(val) => {
//             setQuantity(val);
//             console.log("Selected quantity:", val);
//           }}
//         >
//           <Picker.Item label="Quantity" value="" />
//           <Picker.Item label="1" value="1" />
//           <Picker.Item label="2" value="2" />
//           <Picker.Item label="3" value="3" />
//         </Picker>
//       </View>

//       <Link href="/image" asChild>
//         <TouchableOpacity>
//           <Image
//             source={require("../../assets/images/next1.png")}
//             className="ml-20"
//           />
//         </TouchableOpacity>
//       </Link>
//     </ScrollView>
//   );
// };

// export default Set;

import React, { useState } from "react";
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

const Set = () => {
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const increment = (setter: (val: number) => void, value: number) =>
    setter(value + 1);
  const decrement = (setter: (val: number) => void, value: number) =>
    setter(value > 0 ? value - 1 : 0);

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

      {/* Price Input with +/- */}
      <View className="border border-gray-200 rounded-md mb-4 p-3 flex-row items-center justify-between">
        <Text className="text-base text-black mr-2">Price (AED):</Text>
        <TouchableOpacity onPress={() => decrement(setPrice, price)}>
          <Ionicons name="remove-circle-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TextInput
          value={price.toString()}
          onChangeText={(text) => setPrice(Number(text))}
          keyboardType="numeric"
          className="text-base text-black text-center w-16 mx-2"
        />
        <TouchableOpacity onPress={() => increment(setPrice, price)}>
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
          onChangeText={(text) => setQuantity(Number(text))}
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
