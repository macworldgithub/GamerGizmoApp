import { API_BASE_URL } from "@/utils/config";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
export default function Part() {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
    const router = useRouter();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/component-category/getAll?pageNo=1`);
        setCategories(response.data.data);
        console.log("Category", response )
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200 mt-3">
        <TouchableOpacity
         onPress={()=>router.push('/home')}
        >
       
          <Image source={require("../../assets/images/arrow.png")} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold ml-7">Gaming PC Parts</Text>
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" className="mt-10" />
      ) : (
        <View className="mt-2">
          {categories.map((item) => (
            <TouchableOpacity key={item.id} className="p-4 border-b border-gray-200">
              <Text className="text-sm text-black ml-4 font-semibold">{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
