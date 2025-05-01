// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   Image,
// } from "react-native";

// const City = () =>{
//   return (
// <SafeAreaView className="flex-1 bg-white">
//   <View className="border-b border-gray-200 pb-4">
//     <View className="px-4 mt-4 py-4 flex">
//       <Image
//         source={require("../../assets/images/cross.png")}
//         className="w-5 h-5"
//       />

//       <View className="items-center -mt-8">
//         <Text className="text-black font-semibold text-lg">
//           Select a City
//         </Text>
//         <Text className="text-gray-400 text-sm">
//           Where should we place your ad?
//         </Text>
//       </View>
//     </View>
//   </View>

//       <ScrollView>
//         <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
//           <Text className="text-black text-base ml-2">Abu Dhabi</Text>
//         </TouchableOpacity>

//         {/* <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
//           <Text className="text-black text-base ml-2">Ajman</Text>
//         </TouchableOpacity>

//         <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
//           <Text className="text-black text-base ml-2">Al Ain</Text>
//         </TouchableOpacity>

//         <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
//           <Text className="text-black text-base ml-2">Dubai</Text>
//         </TouchableOpacity>

//         <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
//           <Text className="text-black text-base ml-2">Fujairah</Text>
//         </TouchableOpacity>

//         <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
//           <Text className="text-black text-base ml-2">Ras al Khaimah</Text>
//         </TouchableOpacity>

//         <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
//           <Text className="text-black text-base ml-2">Sharjah</Text>
//         </TouchableOpacity>

//         <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
//           <Text className="text-black text-base ml-2">Umm al Quwain</Text>
//         </TouchableOpacity> */}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default City;

// components/CityModal.js
// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   Modal,
//   SafeAreaView,
// } from "react-native";

// const cities = [
//   "Abu Dhabi",
//   "Ajman",
//   "Al Ain",
//   "Dubai",
//   "Fujairah",
//   "Ras al Khaimah",
//   "Sharjah",
//   "Umm al Quwain",
// ];

// const CityModal = ({ visible, onClose, onSelect }) => {
//   return (
//     <Modal visible={visible} animationType="slide" transparent={false}>
//       <SafeAreaView className="flex-1 bg-white">
//         <View className="border-b border-gray-200 pb-4">
//           <View className="px-4 mt-4 py-4 flex">
//           <TouchableOpacity onPress={onClose}>
//             <Image
//               source={require("../../assets/images/cross.png")}
//               className="w-5 h-5"
//             />
// </TouchableOpacity>
//             <View className="items-center -mt-8">
//               <Text className="text-black font-semibold text-lg">
//                 Select a City
//               </Text>
//               <Text className="text-gray-400 text-sm">
//                 Where should we place your ad?
//               </Text>
//             </View>
//           </View>
//         </View>

//         <View className="flex-1 bg-white">
//           {/* rest of your content */}
//           <ScrollView>
//             <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
//               <Text className="text-black text-base ml-2">Abu Dhabi</Text>
//             </TouchableOpacity>

//             <TouchableOpacity className="border-b border-gray-200 px-4 py-4">
//               <Text className="text-black text-base ml-2">Ajman</Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </View>
//       </SafeAreaView>
//     </Modal>
//   );
// };

// export default CityModal;
