import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';
import { AntDesign } from '@expo/vector-icons';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  created_at?: string;
  images?: { image_url: string }[];
}

const categoryNamesMap: Record<string, string> = {
  "1": "Laptops",
  "2": "Gaming PCS",
  "3": "Components",
  "4": "Gaming Consoles",
};

const formatDate = (dateString: string) => {
  const postedDate = new Date(dateString);
  const daysAgo = Math.floor((Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24));
  return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
};

const StoreCategory: React.FC = () => {
  const { categoryId } = useLocalSearchParams<{ categoryId?: string }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const resolvedCategoryId = Array.isArray(categoryId) ? categoryId[0] : categoryId;
  const categoryName = categoryNamesMap[resolvedCategoryId ?? ''] || 'Unknown Category';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/getAll`, {
          params: {
            category_id: resolvedCategoryId,
            is_store_product: 'true',
          },
        });
        setProducts(response.data?.data || []);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    if (resolvedCategoryId) {
      fetchProducts();
    }
  }, [resolvedCategoryId]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 16 }} />;
  if (error) return <Text style={{ color: 'red', textAlign: 'center', marginTop: 8 }}>{error}</Text>;

  return (
    <View className={`px-4 py-2 ${Platform.OS === "ios" ? "mt-10" : "mt-0"}`}>
      <View className="py-6 px-4">
        <View className="relative items-center justify-center">
          {/* Back Arrow - absolute positioned on the left */}
          <TouchableOpacity
            onPress={() => router.push('/store')}
            className="absolute left-0"
          >
            <AntDesign name="arrowleft" size={28} color="black" />
          </TouchableOpacity>

          {/* Title - centered */}
          <Text className="text-2xl font-bold text-[#A93EF6]">{categoryName}</Text>
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex-row bg-white rounded-xl p-3 mb-4 shadow-sm shadow-gray-300">
            <Image
              source={{ uri: item.images?.[0]?.image_url || 'https://via.placeholder.com/100' }}
              style={{ width: 120, height: 90, borderRadius: 10 }}
              resizeMode="cover"
            />

            <View className="flex-1 ml-3 justify-between">
              <View>
                <Text numberOfLines={1} className="text-base font-semibold text-black">
                  {item.name}
                </Text>
                <Text numberOfLines={2} className="text-xs text-gray-500">
                  {item.description}
                </Text>
                <Text className="text-purple-700 text-sm font-bold mt-1">AED {item.price}</Text>
                {item.created_at && (
                  <Text className="text-xs text-gray-400 mt-0.5">
                    {formatDate(item.created_at)}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                className="bg-purple-600 py-1 px-3 mt-2 rounded-full self-start"
                onPress={() => router.push(`/product/${item.id}`)}
              >
                <Text className="text-white text-xs">View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default StoreCategory;
