import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { API_BASE_URL } from '@/utils/config';

// Define type for Product object
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  images?: { image_url: string }[];
};

// Props for the component
interface StoreCategoryProductsProps {
  categoryId: number;
  categoryName: string;
}

const StoreCategoryProducts: React.FC<StoreCategoryProductsProps> = ({
  categoryId,
  categoryName,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/getAll`, {
          params: {
            category_id: categoryId,
            is_store_product: 'true',
          },
        });
        setProducts(response.data?.data?.slice(0, 6) || []);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) return <ActivityIndicator color="purple" size="large" />;
  if (error) return <Text className="text-red-500 text-center mt-2">{error}</Text>;

  return (
    <View className="px-4 mb-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-base font-bold text-black">{categoryName}</Text>
        {products.length > 0 && (
          <TouchableOpacity
            className="bg-purple-700 p-2 rounded-full"
            onPress={() =>
              router.push({
                pathname: '/StoreCategory/[categoryId]',
                params: { categoryId: categoryId.toString() },
              })
            }
          >
            <Image
              source={require('../../assets/images/right.png')}
              className="w-4 h-4 tint-white"
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((product) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/product/[id]',
                params: { id: product.id.toString() },
              })
            }
            key={product.id}
            className="w-[150px] bg-red-950 p-2 mr-3  rounded-lg shadow-md"
          >
            <Image
              source={{
                uri:
                  product.images && product.images.length > 0
                    ? product.images[0].image_url
                    : '../../assets/images/check.png',
              }}
              className="w-full h-[100px] rounded-md"
              resizeMode="cover"
            />
            <Text numberOfLines={1} className="text-xs font-semibold mt-1 text-black">
              {product.name}
            </Text>
            <Text numberOfLines={1} className="text-[10px] text-gray-500">
              {product.description}
            </Text>
            <Text className="text-xs text-purple-600 font-bold">AED {product.price}</Text>
            <TouchableOpacity
              className="mt-1 bg-purple-700 py-1 rounded-full"
              onPress={() =>
                router.push({
                  pathname: '/product/[id]',
                  params: { id: product.id.toString() },
                })
              }
            >
              <Text className="text-white text-xs text-center">View Details</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default StoreCategoryProducts;
