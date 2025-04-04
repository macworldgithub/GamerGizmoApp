// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

// export default function Create({ navigation }) {
//   const [password, setPassword] = useState("");

//   return (
//     <View className="flex-1 bg-white px-6 py-8">
//       {/* Close Button */}
//       <View className="">
//         <TouchableOpacity onPress={() => navigation.goBack()} className="">
//           {/* <AntDesign name="close" size={24} color="black" /> */}
//           <Image
//             source={require("../../assets/images/cross.png")}
//             className=""
//           />
//         </TouchableOpacity>

//         {/* Heading */}
//         <Text className="text-2xl font-bold  mt-10 ml-24">
//           Create an account
//         </Text>
//       </View>
//       {/* Input Fields */}
//       <TextInput
//         placeholder="First Name"
//         className="border border-gray-300 p-3 rounded-lg mt-6"
//       />
//       <TextInput
//         placeholder="Email"
//         className="border border-gray-300 p-3 rounded-lg mt-4"
//       />
//       <TextInput
//         placeholder="Password"
//         className="border border-gray-300 p-3 rounded-lg mt-4"
//       />

//       {/* Sign Up Button */}
//       <TouchableOpacity
//         className="bg-gray-300 p-4 rounded-lg mt-6 items-center"
//         disabled
//       >
//         <Text className="text-white font-semibold">Sign Up</Text>
//       </TouchableOpacity>

//       {/* Terms & Privacy Policy */}
//       <Text className="text-gray-500 text-xs text-center mt-4">
//         By logging in I agree to the{" "}
//         <Text className="text-blue-600">Terms and Conditions</Text> and{" "}
//         <Text className="text-blue-600">Privacy Policy</Text>
//       </Text>
//     </View>
//   );
// }

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

export default function CreateAccount({ navigation }) {
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 bg-white px-6 py-8">
      {/* Close Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require("../../assets/images/cross.png")} />
      </TouchableOpacity>

      {/* Heading */}
      <Text className="text-2xl font-bold mt-10 text-center">
        Create an account
      </Text>

      {/* Input Fields */}
      <TextInput
        placeholder="First Name"
        className="border border-gray-300 p-3 rounded-lg mt-6"
      />
      <TextInput
        placeholder="Email"
        className="border border-gray-300 p-3 rounded-lg mt-4"
      />
      <TextInput
        placeholder="Password"
        className="border border-gray-300 p-3 rounded-lg mt-4"
        secureTextEntry
      />

      {/* Sign Up Button */}
      <TouchableOpacity
        className="bg-gray-300 p-4 rounded-lg mt-6 items-center"
        disabled
      >
        <Text className="text-white font-semibold">Sign Up</Text>
      </TouchableOpacity>

      {/* Terms & Privacy Policy */}
      <Text className="text-gray-500 text-xs text-center mt-4">
        By logging in I agree to the{" "}
        <Text className="text-blue-600">Terms and Conditions</Text> and{" "}
        <Text className="text-blue-600">Privacy Policy</Text>
      </Text>
    </View>
  );
}
