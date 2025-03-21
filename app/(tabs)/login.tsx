// import React from "react";
// import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
// import { AntDesign } from "@expo/vector-icons";

// export default function LoginScreen() {
//   return (
//     <View style={styles.container}>
//       {/* Close Button */}
//       <TouchableOpacity style={styles.closeButton}>
//         <AntDesign name="close" size={24} color="black" />
//       </TouchableOpacity>

//       {/* Logo */}
//       <Image
//         className="-mt-14"
//         source={require("../../assets/images/logo.png")}
//         style={styles.logo}
//       />

//       {/* Illustration */}
//       <Image
//         source={require("../../assets/images/gpu.png")}
//         style={styles.illustration}
//       />

//       <Text style={styles.title}>Login to contact the seller</Text>

//       {/* Login Buttons */}
//       <TouchableOpacity style={styles.button}>
//         <Image
//           source={require("../../assets/images/facebbok.png")}
//           style={styles.buttonImage}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button}>
//         <Image
//           source={require("../../assets/images/google.png")}
//           style={styles.buttonImage}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button}>
//         <Image
//           source={require("../../assets/images/email.png")}
//           style={styles.buttonImage}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button}>
//         <Image
//           source={require("../../assets/images/apple.png")}
//           style={styles.buttonImage}
//         />
//       </TouchableOpacity>

//       {/* Sign-up Link */}
//       <Text style={styles.signUpText}>
//         Don’t have an account? <Text style={styles.link}>Create one</Text>
//       </Text>

//       {/* Terms and Conditions */}
//       <Text style={styles.termsText}>
//         By logging in I agree to the{" "}
//         <Text style={styles.link}>Terms and Conditions</Text> and{" "}
//         <Text style={styles.link}>Privacy Policy</Text>
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     padding: 20,
//     paddingTop: 80,
//   },
//   closeButton: {
//     position: "absolute",
//     top: 10,
//     right: 20,
//   },
//   logo: {
//     width: 120,
//     height: 60,
//     resizeMode: "contain",
//     marginBottom: 10,
//   },
//   illustration: {
//     width: 200,
//     height: 150,
//     resizeMode: "contain",
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   button: {
//     // backgroundColor: "#eee",

//     width: "80%",
//     alignItems: "center",
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   buttonImage: {
//     width: "100%",
//     height: 40,
//     resizeMode: "contain",
//   },
//   signUpText: {
//     marginTop: 10,
//     fontSize: 14,
//   },
//   link: {
//     color: "blue",
//   },
//   termsText: {
//     fontSize: 12,
//     textAlign: "center",
//     marginTop: 10,
//   },
// });

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function LoginScreen() {
  return (
    <View className="flex-1 bg-white justify-start items-center px-5 pt-20">
      {/* Close Button */}
      <TouchableOpacity className="absolute top-3 right-5">
        {/* <AntDesign name="close" size={24} color="black" /> */}
        <Image source={require("../../assets/images/cross.png")}/>
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require("../../assets/images/logo.png")}
        className="w-32 h-16 mb-4"
        resizeMode="contain"
      />

      {/* Illustration */}
      <Image
        source={require("../../assets/images/gpu.png")}
        className="w-48 h-36 mb-5"
        resizeMode="contain"
      />

      {/* Title */}
      <Text className="text-xl font-bold text-center mb-5">
        Login to contact the seller
      </Text>

     

      <TouchableOpacity className="w-4/5 mb-3">
        <Image
          source={require("../../assets/images/facebbok.png")}
          className="w-full h-10"
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity className="w-4/5 mb-3">
        <Image
          source={require("../../assets/images/google.png")}
          className="w-full h-10"
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity className="w-4/5 mb-3">
        <Image
          source={require("../../assets/images/email.png")}
          className="w-full h-10"
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity className="w-4/5 mb-3">
        <Image
          source={require("../../assets/images/apple.png")}
          className="w-full h-10"
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Sign-up Link */}
      <Text className="mt-3 text-sm">
        Don’t have an account?{" "}
        <Text className="text-blue-500 font-semibold">Create one</Text>
      </Text>

      {/* Terms and Conditions */}
      <Text className="text-xs text-center mt-2">
        By logging in, I agree to the{" "}
        <Text className="text-blue-500 font-semibold">
          Terms and Conditions
        </Text>{" "}
        and <Text className="text-blue-500 font-semibold">Privacy Policy</Text>
      </Text>
    </View>
  );
}
