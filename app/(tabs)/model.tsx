// import React from "react";
// import { View, Text, Image, TouchableOpacity } from "react-native";

// const ProcessorCard = () => {
//   return (

//     <View className="flex-row items-center p-4 bg-white rounded-2xl shadow-md border border-gray-200 mx-2 mt-5">
//       {/* Left: Image */}
//       <Image
//         source={require("../../assets/images/core.png")}
//         className=" rounded-lg -mt-16"
//         resizeMode="contain"
//       />

//       {/* Right: Product Details */}
//       <View className="flex-1 ml-4">
//         <Text className="text-sm font-bold text-black">
//           USED INTEL CORE I7 7TH GEN PROCESSOR (WITHOUT BOX)
//         </Text>
//         <Text className="text-gray-500 text-xs mt-1">
//         # of Cores 4 | # of Threads 8 | Processor Base Frequency3.60 GHz | Max Turbo Frequency4.20
//          GHz Cache8 MB SmartCache | Bus Speed8 GT/s DMI3 # of QPI Links0 | TDP65 W
//         </Text>

//         {/* Rating Stars */}
//         <View className="flex-row mt-2">
//           {[...Array(5)].map((_, i) => (
//             <Text key={i} className="text-gray-400 text-lg">
//               ☆
//             </Text>
//           ))}
//         </View>

//         {/* Price and Buy Button */}
// <View className="flex-row justify-between  mt-3">
//   <Text className="text-xl font-bold text-[#6345ED] -ml-32">AED 551.00</Text>
//   <TouchableOpacity className=" ">
//     <Image source={require("../../assets/images/buy.png")}/>
//   </TouchableOpacity>
// </View>

//   </View>
// </View>
//   );
// };

// export default ProcessorCard;

// import React from "react";
// import { View, Text, Image, TouchableOpacity } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";

// const RatingStars = ({ rating }) => {
//   const totalStars = 5;
//   return (
//     <View className="flex-row">
//       {[...Array(totalStars)].map((_, index) => (
//         <MaterialIcons
//           key={index}
//           name={index < rating ? "star" : "star-border"}
//           size={16}
//           color={index < rating ? "#FFD700" : "gray"}
//         />
//       ))}
//     </View>
//   );
// };

// const ProcessorCard = () => {
//   return (

//   <View className="">
//     <Image source={require("../../assets/images/filter.png")}/>
//     <Image source={require("../../assets/images/price.png")}/>
//     <Image source={require("../../assets/images/model.png")}/>
//     <Image source={require("../../assets/images/location1.png")}/>

//     <View className="flex-row items-center p-4 bg-white rounded-2xl shadow-md border border-gray-200 mx-2 mt-5">

//       <Image
//         source={require("../../assets/images/core.png")}
//         className="w-24 h-24 rounded-lg -mt-16"
//         resizeMode="contain"
//       />

//       <View className="flex-1 ml-4">
//         <Text className="text-sm font-bold text-black">
//           USED INTEL CORE I7 7TH GEN PROCESSOR (WITHOUT BOX)
//         </Text>
//         <Text className="text-gray-500 text-xs mt-1">
//         # of Cores 4 | # of Threads 8 | Processor Base Frequency3.60 GHz | Max Turbo Frequency4.20 GHz Cache8 MB SmartCache | Bus Speed8
//         </Text>

//         {/* Rating Stars */}
//         <View className="flex-row mt-2">
//           <RatingStars rating={0} />
//         </View>

//         {/* Price and Buy Button */}
//         <View className="flex-row justify-between  mt-3">
//           <Text className="text-xl font-bold text-[#6345ED] -ml-24">AED 551.00</Text>
//           <TouchableOpacity className=" ">
//             <Image source={require("../../assets/images/buy.png")}/>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//     </View>
//   );
// };

// export default ProcessorCard;

// import React from "react";
// import { View, Text, Image, TouchableOpacity } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";


// const RatingStars = ({ rating }) => {
//   const totalStars = 5;
//   return (
//     <View className="flex-row">
//       {[...Array(totalStars)].map((_, index) => (
//         <MaterialIcons
//           key={index}
//           name={index < rating ? "star" : "star-border"}
//           size={16}
//           color={index < rating ? "#FFD700" : "gray"}
//         />
//       ))}
//     </View>
//   );
// };

// const ProcessorCard = () => {
//   return (
//     <View className="flex-1 bg-white">
//        <View className="flex-row items-center  mt-3  ">
//               {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
//               <TouchableOpacity>
//                 <Image source={require("../../assets/images/arrow.png")} className="ml-4" />
//               </TouchableOpacity>

//               <Text className="text-lg font-semibold  ml-24 ">My Profile</Text>

//             </View>
//       {/* Icons Row */}
      
//       <View className="flex-row justify-between  mt-6">
//         <Image
//           source={require("../../assets/images/filter.png")}

//         />
//         <Image
//           source={require("../../assets/images/price.png")}

//         />
//         <Image
//           source={require("../../assets/images/model.png")}

//         />
//         <Image
//           source={require("../../assets/images/location1.png")}

//         />
//       </View>
    

//       {/* Processor Card */}
//       <View className="flex-row items-center p-4 bg-white rounded-2xl shadow-md border border-gray-200 mx-2 mt-5">
//         <Image
//           source={require("../../assets/images/core.png")}
//           className="w-24 h-24 rounded-lg -mt-16"
//           resizeMode="contain"
//         />

//         <View className="flex-1 ml-4">
//           <Text className="text-sm font-bold text-black">
//             USED INTEL CORE I7 7TH GEN PROCESSOR (WITHOUT BOX)
//           </Text>
//           <Text className="text-gray-500 text-xs mt-1">
//             # of Cores 4 | # of Threads 8 | Processor Base Frequency 3.60 GHz |
//             Max Turbo Frequency 4.20 GHz | Cache 8 MB SmartCache | Bus Speed 8
//           </Text>

//           {/* Rating Stars */}
//           <View className="flex-row mt-2">
//             <RatingStars rating={0} />
//           </View>

//           {/* Price and Buy Button */}
//           <View className="flex-row justify-between mt-3">
//             <Text className="text-xl font-bold text-[#6345ED] -ml-24">
//               AED 551.00
//             </Text>
//             <TouchableOpacity>
//               <Image source={require("../../assets/images/buy.png")} />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default ProcessorCard;

// import React from "react";
// import { View, Text, Image, TouchableOpacity } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";

// const RatingStars = ({ rating }) => {
//   const totalStars = 5;
//   return (
//     <View className="flex-row">
//       {[...Array(totalStars)].map((_, index) => (
//         <MaterialIcons
//           key={index}
//           name={index < rating ? "star" : "star-border"}
//           size={16}
//           color={index < rating ? "#FFD700" : "gray"}
//         />
//       ))}
//     </View>
//   );
// };

// // Dynamic Processor Card Component
// const ProcessorCard = ({ image, title, details, rating, price }) => {
//   return (
    
//     <View className="flex-row items-center p-4 bg-white rounded-2xl shadow-md border border-gray-200 mx-2 mt-5">
//       {/* Dynamic Image */}
//       <Image
//         source={image}
//         className="w-24 h-24 rounded-lg -mt-16"
//         resizeMode="contain"
//       />

//       <View className="flex-1 ml-4">
//         {/* Dynamic Title */}
//         <Text className="text-sm font-bold text-black">{title}</Text>

//         {/* Dynamic Details */}
//         <Text className="text-gray-500 text-xs mt-1">{details}</Text>

//         {/* Dynamic Rating */}
//         <View className="flex-row mt-2">
//           <RatingStars rating={rating} />
//         </View>

//         {/* Dynamic Price & Buy Button */}
//         <View className="flex-row justify-between mt-3">
//           <Text className="text-xl font-bold text-[#6345ED] -ml-24">{`AED ${price}`}</Text>
//           <TouchableOpacity>
//             <Image source={require("../../assets/images/buy.png")} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// // Example Usage
// const ExampleScreen = () => {
//   return (
//     <View>
//       <ProcessorCard
//         image={require("../../assets/images/core.png")}
//         title="USED INTEL CORE I7 7TH GEN PROCESSOR (WITHOUT BOX)"
//         details="# of Cores 4 | # of Threads 8 | Base Frequency 3.60 GHz | Turbo 4.20 GHz | Cache 8MB"
//         rating={0} // Dynamic Rating
//         price={551.0} // Dynamic Price
//       />
//  <ProcessorCard
//         image={require("../../assets/images/core.png")}
//         title="USED INTEL CORE I7 7TH GEN PROCESSOR (WITHOUT BOX)"
//         details="# of Cores 4 | # of Threads 8 | Base Frequency 3.60 GHz | Turbo 4.20 GHz | Cache 8MB"
//         rating={0} // Dynamic Rating
//         price={551.0} // Dynamic Price
//       />
//        <ProcessorCard
//         image={require("../../assets/images/core.png")}
//         title="USED INTEL CORE I7 7TH GEN PROCESSOR (WITHOUT BOX)"
//         details="# of Cores 4 | # of Threads 8 | Base Frequency 3.60 GHz | Turbo 4.20 GHz | Cache 8MB"
//         rating={0} // Dynamic Rating
//         price={551.0} // Dynamic Price
//       />
      
//     </View>
//   );
// };

// export default ExampleScreen;


import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const RatingStars = ({ rating }) => {
  const totalStars = 5;
  return (
    <View className="flex-row">
      {[...Array(totalStars)].map((_, index) => (
        <MaterialIcons
          key={index}
          name={index < rating ? "star" : "star-border"}
          size={16}
          color={index < rating ? "#FFD700" : "gray"}
        />
      ))}
    </View>
  );
};

// Dummy Data for Processors
const processors = [
  {
    id: "1",
    name: "USED INTEL CORE I7 7TH GEN PROCESSOR (WITHOUT BOX)",
    specs: "# of Cores 4 | # of Threads 8 | Base 3.60 GHz | Turbo 4.20 GHz | Cache 8MB",
    price: "AED 551.00",
    rating: 4,
    image: require("../../assets/images/core.png"),
  },
  {
    id: "2",
    name: "AMD RYZEN 5 3600 6-CORE 12-THREAD PROCESSOR",
    specs: "# of Cores 6 | # of Threads 12 | Base 3.60 GHz | Turbo 4.20 GHz | Cache 35MB",
    price: "AED 620.00",
    rating: 5,
    image: require("../../assets/images/core.png"),
  },
  {
    id: "3",
    name: "Intel Core i5-9600K 9th Gen Processor",
    specs: "# of Cores 6 | # of Threads 6 | Base 3.70 GHz | Turbo 4.60 GHz | Cache 9MB",
    price: "AED 450.00",
    rating: 3,
    image: require("../../assets/images/core.png"),
  },
  {
    id: "4",
    name: "Intel Core i5-9600K 9th Gen Processor",
    specs: "# of Cores 6 | # of Threads 6 | Base 3.70 GHz | Turbo 4.60 GHz | Cache 9MB",
    price: "AED 450.00",
    rating: 3,
    image: require("../../assets/images/core.png"),
  },
  {
    id: "5",
    name: "Intel Core i5-9600K 9th Gen Processor",
    specs: "# of Cores 6 | # of Threads 6 | Base 3.70 GHz | Turbo 4.60 GHz | Cache 9MB",
    price: "AED 450.00",
    rating: 3,
    image: require("../../assets/images/core.png"),
  },
];

const ProcessorCard = () => {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center mt-3">
        <TouchableOpacity>
          <Image source={require("../../assets/images/arrow.png")} className="ml-4" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold ml-24">My Profile</Text>
      </View>

      {/* Icons Row */}
      <View className="flex-row justify-between mt-6">
        <Image source={require("../../assets/images/filter.png")} />
        <Image source={require("../../assets/images/price.png")} />
        <Image source={require("../../assets/images/model.png")} />
        <Image source={require("../../assets/images/location1.png")} />
      </View>

     
      <ScrollView>
        {processors.map((item) => (
          <View key={item.id} className="flex-row items-center p-4 bg-white rounded-2xl shadow-md border border-gray-200 mx-2 mt-5">
            <Image source={item.image} className="w-24 h-24 rounded-lg -mt-16" resizeMode="contain" />
            <View className="flex-1 ml-4">
              <Text className="text-sm font-bold text-black">{item.name}</Text>
              <Text className="text-gray-500 text-xs mt-1">{item.specs}</Text>

              {/* Rating Stars */}
              <View className="flex-row mt-2">
                <RatingStars rating={item.rating} />
              </View>

              {/* Price and Buy Button */}
              <View className="flex-row justify-between mt-3">
                <Text className="text-xl font-bold text-[#6345ED] -ml-24">{item.price}</Text>
                <TouchableOpacity>
                  <Image source={require("../../assets/images/buy.png")} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProcessorCard;
