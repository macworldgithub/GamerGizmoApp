// import React from "react";
// import { View, Text, TouchableOpacity, Linking } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";

// export default function ShareModal({ productUrl }: { productUrl: string }) {
//   const message = `Check out this product on Gamer Gizmo: ${productUrl}`;

//   const handleShare = (url: string) => {
//     Linking.openURL(url);
//   };

//   const icons = [
//     {
//       name: "facebook",
//       url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//         productUrl
//       )}`,
//     },
//     {
//       name: "whatsapp",
//       url: `https://wa.me/?text=${encodeURIComponent(message)}`,
//     },
//     {
//       name: "twitter",
//       url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
//         productUrl
//       )}`,
//     },
//     {
//       name: "linkedin",
//       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//         productUrl
//       )}`,
//     },
//     {
//       name: "copy",
//       action: async () => {
//         await navigator.clipboard.writeText(productUrl);
//         alert("Link copied!");
//       },
//     },
//   ];
//   return (
//     <View className="bg-white rounded-t-xl p-4">
//       <Text className="text-lg font-semibold mb-4">Share this ad</Text>
//       <View className="flex-row justify-around">
//         {icons.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() =>
//               item.action ? item.action() : handleShare(item.url)
//             }
//             className="items-center"
//           >
//             <FontAwesome name={item.name as any} size={24} color="black" />
//             <Text className="text-sm mt-1 capitalize">{item.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// }

// function ShareOption({
//   icon,
//   color,
//   label,
//   onPress,
// }: {
//   icon: any;
//   color: string;
//   label: string;
//   onPress?: () => void;
// }) {
//   return (
//     <TouchableOpacity
//       className="items-center w-1/4 mb-6"
//       onPress={onPress}
//       activeOpacity={0.7}
//     >
//       <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center">
//         <FontAwesome name={icon} size={24} color={color} />
//       </View>
//       <Text className="text-xs mt-2 text-white text-center">{label}</Text>
//     </TouchableOpacity>
//   );
// }

// import { View, Text, TouchableOpacity, Linking } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";

// export default function ShareModal({ productUrl }: { productUrl: string }) {
//   const message = `Check out this product on Gamer Gizmo: ${productUrl}`;

//   const handleShare = (url: string) => {
//     Linking.openURL(url);
//   };

//   const icons = [
//     {
//       name: "facebook",
//       url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//         productUrl
//       )}`,
//     },
//     {
//       name: "whatsapp",
//       url: `https://wa.me/?text=${encodeURIComponent(message)}`,
//     },
//     {
//       name: "twitter",
//       url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
//         productUrl
//       )}`,
//     },
//     {
//       name: "linkedin",
//       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//         productUrl
//       )}`,
//     },
//     {
//       name: "copy",
//       action: async () => {
//         await navigator.clipboard.writeText(productUrl);
//         alert("Link copied!");
//       },
//     },
//   ];

//   return (
//     <View className="bg-white rounded-t-xl p-4">
//       <Text className="text-lg font-semibold mb-4">Share this ad</Text>
//       <View className="flex-row justify-around">
//         {icons.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() =>
//               item.action ? item.action() : handleShare(item.url)
//             }
//             className="items-center"
//           >
//             <FontAwesome name={item.name as any} size={24} color="black" />
//             <Text className="text-sm mt-1 capitalize">{item.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// }

// import { View, Text, TouchableOpacity, Linking, Alert } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";

// export default function ShareModal({ productUrl }: { productUrl: string }) {
//   const message = `Check out this product on Gamer Gizmo: ${productUrl}`;

//   const handleShare = async (url: string) => {
//     try {
//       const supported = await Linking.canOpenURL(url);
//       if (supported) {
//         await Linking.openURL(url);
//       } else {
//         Alert.alert("Error", "Unable to open this URL");
//       }
//     } catch (error) {
//       Alert.alert("Error", "An error occurred while sharing");
//     }
//   };

//   const icons = [
//     {
//       name: "facebook",
//       title: "Facebook",
//       url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//         productUrl
//       )}`,
//     },
//     {
//       name: "whatsapp",
//       title: "WhatsApp",
//       url: `https://wa.me/?text=${encodeURIComponent(message)}`,
//     },
//     {
//       name: "twitter",
//       title: "Twitter",
//       url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
//         productUrl
//       )}&text=Check%20out%20this%20product`,
//     },
//     {
//       name: "envelope",
//       title: "Email",
//       url: `mailto:?subject=Check%20out%20this%20product&body=${encodeURIComponent(
//         message
//       )}`,
//     },
//   ];

//   return (
//     <View className="bg-white rounded-t-xl p-6 pt-4">
//       <Text className="text-lg font-semibold mb-6 text-center">
//         Share this product
//       </Text>
//       <View className="flex-row justify-around">
//         {icons.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => handleShare(item.url)}
//             className="items-center"
//           >
//             <View className="bg-gray-100 p-4 rounded-full mb-2">
//               <FontAwesome name={item.name as any} size={24} color="#6D28D9" />
//             </View>
//             <Text className="text-sm mt-1 text-gray-700">{item.title}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// }

// Final:

import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ShareModal({ productUrl }: { productUrl: string }) {
  const message = `Check out this product on Gamer Gizmo: ${productUrl}`;

  const handleShare = (url: string) => {
    Linking.openURL(url);
  };

  const icons = [
    {
      name: "facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        productUrl
      )}`,
      color: "#1877F2", // Facebook blue
    },
    {
      name: "whatsapp",
      url: `https://wa.me/?text=${encodeURIComponent(message)}`,
      color: "#25D366", // WhatsApp green
    },
    {
      name: "twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        productUrl
      )}`,
      color: "#1DA1F2", // Twitter blue
    },
    {
      name: "linkedin",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        productUrl
      )}`,
      color: "#0A66C2", // LinkedIn blue
    },
  ];

  return (
    <View className="bg-black rounded-t-2xl p-6">
      <Text className="text-xl font-bold text-white mb-6 text-center ">
        Share this ad
      </Text>
      <View className="flex-row justify-around">
        {icons.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              //@ts-ignore
              item.action ? item.action() : handleShare(item.url!)
            }
            className="items-center"
          >
            <FontAwesome name={item.name as any} size={28} color={item.color} />
            <Text className="text-sm mt-2 text-white capitalize">
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// import React from "react";
// import { View, Text, TouchableOpacity, Linking } from "react-native";
// import { FontAwesome, Entypo } from "@expo/vector-icons";

// export default function ShareModal({
//   productUrl,
//   onClose,
// }: {
//   productUrl: string;
//   onClose: () => void;
// }) {
//   const message = `Check out this product on Gamer Gizmo: ${productUrl}`;

//   const handleShare = (url: string) => {
//     Linking.openURL(url);
//   };

//   const icons = [
//     {
//       name: "facebook",
//       url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//         productUrl
//       )}`,
//       color: "#1877F2",
//     },
//     {
//       name: "whatsapp",
//       url: `https://wa.me/?text=${encodeURIComponent(message)}`,
//       color: "#25D366",
//     },
//     {
//       name: "twitter",
//       url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
//         productUrl
//       )}`,
//       color: "#1DA1F2",
//     },
//     {
//       name: "linkedin",
//       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//         productUrl
//       )}`,
//       color: "#0A66C2",
//     },
//   ];

//   return (
//     <View className="bg-black rounded-t-2xl p-6 relative">
//       {/* Close button */}
//       <TouchableOpacity
//         onPress={onClose}
//         className="absolute top-4 right-4 z-10"
//       >
//         <Entypo name="cross" size={28} color="white" />
//       </TouchableOpacity>

//       <Text className="text-xl font-bold text-white mb-6 text-center">
//         Share this ad
//       </Text>

//       <View className="flex-row justify-around">
//         {icons.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => handleShare(item.url!)}
//             className="items-center"
//           >
//             <FontAwesome name={item.name as any} size={28} color={item.color} />
//             <Text className="text-sm mt-2 text-white capitalize">
//               {item.name}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// }
