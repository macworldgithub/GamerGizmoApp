import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';
import { FontAwesome } from '@expo/vector-icons';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images?: string[];
  location?: {
    id: number;
    name: string;
  };
  user?: {
    id: number;
    phone?: string;
    email?: string;
  };
};

const ProductDetail = () => {
  const { productId } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
        if (response.data?.data) {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetail();
    }
  }, [productId]);

  const handleCall = async () => {
    if (product?.user?.phone) {
      try {
        await Linking.openURL(`tel:${product.user.phone}`);
      } catch (error) {
        console.error('Failed to make call:', error);
      }
    }
  };

  const handleEmail = async () => {
    if (product?.user?.email) {
      try {
        await Linking.openURL(`mailto:${product.user.email}`);
      } catch (error) {
        console.error('Failed to open email:', error);
      }
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ef4444" />
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-gray-500 text-lg text-center">
          Product not found
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-white p-4 flex-row items-center border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold ml-4">Product Details</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Images */}
        {product.images && product.images.length > 0 && (
          <Image
            source={{ uri: product.images[0] }}
            className="w-full h-72"
            resizeMode="cover"
          />
        )}

        {/* Product Info */}
        <View className="p-4">
          <Text className="text-2xl font-bold mb-2">{product.title}</Text>
          <Text className="text-red-600 text-xl font-bold mb-4">
            AED {product.price.toLocaleString()}
          </Text>

          {product.location && (
            <View className="flex-row items-center mb-4">
              <FontAwesome name="map-marker" size={16} color="gray" />
              <Text className="text-gray-500 ml-2">{product.location.name}</Text>
            </View>
          )}

          <Text className="text-gray-700 text-base mb-6">
            {product.description}
          </Text>

          {/* Contact Buttons */}
          {product.user && (
            <View className="flex-row space-x-4">
              {product.user.phone && (
                <TouchableOpacity
                  onPress={handleCall}
                  className="flex-1 bg-red-600 py-3 rounded-lg flex-row justify-center items-center"
                >
                  <FontAwesome name="phone" size={20} color="white" />
                  <Text className="text-white font-semibold ml-2">Call</Text>
                </TouchableOpacity>
              )}

              {product.user.email && (
                <TouchableOpacity
                  onPress={handleEmail}
                  className="flex-1 bg-gray-800 py-3 rounded-lg flex-row justify-center items-center"
                >
                  <FontAwesome name="envelope" size={20} color="white" />
                  <Text className="text-white font-semibold ml-2">Email</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetail; 