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