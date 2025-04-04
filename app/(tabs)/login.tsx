

// import React from "react";
// import { View, Text, Image, TouchableOpacity } from "react-native";
// import { AntDesign } from "@expo/vector-icons";

// export default function LoginScreen() {
//   return (
//     <View className="flex-1 bg-white justify-start items-center px-5 pt-20">
//       {/* Close Button */}
//       <TouchableOpacity className="absolute top-3 right-5">
//         {/* <AntDesign name="close" size={24} color="black" /> */}
//         <Image source={require("../../assets/images/cross.png")}/>
//       </TouchableOpacity>

//       {/* Logo */}
//       <Image
//         source={require("../../assets/images/logo.png")}
//         className="w-32 h-16 mb-4"
//         resizeMode="contain"
//       />

//       {/* Illustration */}
//       <Image
//         source={require("../../assets/images/gpu.png")}
//         className="w-48 h-36 mb-5"
//         resizeMode="contain"
//       />

//       {/* Title */}
//       <Text className="text-xl font-bold text-center mb-5">
//         Login to contact the seller
//       </Text>

     

//       <TouchableOpacity className="w-4/5 mb-3">
//         <Image
//           source={require("../../assets/images/facebbok.png")}
//           className="w-full h-10"
//           resizeMode="contain"
//         />
//       </TouchableOpacity>

//       <TouchableOpacity className="w-4/5 mb-3">
//         <Image
//           source={require("../../assets/images/google.png")}
//           className="w-full h-10"
//           resizeMode="contain"
//         />
//       </TouchableOpacity>

//       <TouchableOpacity className="w-4/5 mb-3">
//         <Image
//           source={require("../../assets/images/email.png")}
//           className="w-full h-10"
//           resizeMode="contain"
//         />
//       </TouchableOpacity>

//       <TouchableOpacity className="w-4/5 mb-3">
//         <Image
//           source={require("../../assets/images/apple.png")}
//           className="w-full h-10"
//           resizeMode="contain"
//         />
//       </TouchableOpacity>

//       {/* Sign-up Link */}
//       <Text className="mt-3 text-sm">
//         Don’t have an account?{" "}
//         <Text className="text-blue-500 font-semibold">Create one</Text>
//       </Text>

//       {/* Terms and Conditions */}
//       <Text className="text-xs text-center mt-2">
//         By logging in, I agree to the{" "}
//         <Text className="text-blue-500 font-semibold">
//           Terms and Conditions
//         </Text>{" "}
//         and <Text className="text-blue-500 font-semibold">Privacy Policy</Text>
//       </Text>
//     </View>
//   );
// }

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View className="flex-1 bg-white justify-start items-center px-5 pt-20">
     
      <TouchableOpacity className="absolute top-3 right-5" onPress={() => navigation.goBack()}>
        <Image source={require("../../assets/images/cross.png")} />
      </TouchableOpacity>

     
      <Image source={require("../../assets/images/logo.png")} className="w-32 h-16 mb-4" resizeMode="contain" />

      <Image source={require("../../assets/images/gpu.png")} className="w-48 h-36 mb-5" resizeMode="contain" />

     
      <Text className="text-xl font-bold text-center mb-5">
        Login to contact the seller
      </Text>

      
      <TouchableOpacity className="w-4/5 mb-3">
        <Image source={require("../../assets/images/facebbok.png")} className="w-full h-10" resizeMode="contain" />
      </TouchableOpacity>

      <TouchableOpacity className="w-4/5 mb-3">
        <Image source={require("../../assets/images/google.png")} className="w-full h-10" resizeMode="contain" />
      </TouchableOpacity>

      <TouchableOpacity className="w-4/5 mb-3">
        <Image source={require("../../assets/images/email.png")} className="w-full h-10" resizeMode="contain" />
      </TouchableOpacity>

      <TouchableOpacity className="w-4/5 mb-3">
        <Image source={require("../../assets/images/apple.png")} className="w-full h-10" resizeMode="contain" />
      </TouchableOpacity>

      {/* Sign-up Link */}
      <Text className="mt-3 text-sm">
        Don’t have an account?{" "}
        <Text className="text-blue-500 font-semibold" onPress={() => navigation.navigate("create")}>
          Create one
        </Text>
      </Text>

      {/* Terms and Conditions */}
      <Text className="text-xs text-center mt-2">
        By logging in, I agree to the{" "}
        <Text className="text-blue-500 font-semibold">Terms and Conditions</Text> and{" "}
        <Text className="text-blue-500 font-semibold">Privacy Policy</Text>
      </Text>
    </View>
  );
}
