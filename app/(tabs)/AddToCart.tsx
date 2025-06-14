import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView, TextInput, Alert,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE = 'https://backend.gamergizmo.com';

interface CartItem {
  id: number;
  name: string;
  color: string;
  itemId: string;
  price: number;
  quantity: number;
  image: any;
  productId: number;
}

const AddToCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingAddress, setShippingAddress] = useState('123 Test Street, City, Country');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const shippingCost = 10;

  const fetchCart = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${API_BASE}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Cart response:', response.data);

    const data = response.data;

    if (!data || !Array.isArray(data.cart_items)) {
      console.error('Unexpected cart response:', data);
      return;
    }

    const transformed = data.cart_items.map((item: any) => {
      const product = item.product || {};
      return {
        id: item.id,
        name: product.name || 'Unnamed Product',
        color: product.color || 'N/A',
        itemId: `#${item.id}`,
        price: parseFloat(item.price),
        quantity: item.quantity,
        image: { uri: product.imageUrl || product.image || 'https://via.placeholder.com/150' },
        productId: item.product_id,
      };
    });

    setCartItems(transformed);
  } catch (error: any) {
    console.error('Failed to fetch cart:', error?.response?.data || error.message);
  }
};



  const deleteItem = async (productId: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`${API_BASE}/cart/item/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(prev => prev.filter(item => item.productId !== productId));
    } catch (error: any) {
      console.error('Failed to delete item:', error?.response?.data || error.message);
    }
  };

  const clearCart = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`${API_BASE}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems([]);
    } catch (error: any) {
      console.error('Failed to clear cart:', error?.response?.data || error.message);
    }
  };


  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <ScrollView className="bg-gray-100 flex-1 px-4 py-6">
      <Text className="text-lg font-bold mb-4" style={{ color: '#9341f3' }}>Summary</Text>

      {cartItems.map(item => (
        <View key={item.id} className="flex-row items-center bg-white rounded-md shadow-sm mb-4 p-3">
          <Image source={item.image} className="w-16 h-16 rounded-md" resizeMode="contain" />
          <View className="ml-3 flex-1">
            <Text className="font-semibold text-base">{item.name} × {item.quantity}</Text>

            <Text className="text-sm text-gray-500">Item {item.itemId}</Text>
            <Text className="text-sm font-semibold mt-1">AED {item.price.toFixed(2)}</Text>
          </View>
          <TouchableOpacity onPress={() => deleteItem(item.productId)}>
            <MaterialIcons name="delete" size={24} color="#D53AFB" />
          </TouchableOpacity>
        </View>
      ))}

      {/* Pricing Summary */}
      <View className="bg-white p-4 rounded-md shadow-sm mb-6">
        <View className="flex-row justify-between mb-2">
          <Text className="text-base">Subtotal</Text>
          <Text className="text-base font-semibold">AED {getSubtotal().toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-base">Shipping (Fixed)</Text>
          <Text className="text-base font-semibold">AED {shippingCost.toFixed(2)}</Text>
        </View>
        <View className="border-t border-gray-300 my-2" />
        <View className="flex-row justify-between">
          <Text className="text-lg font-bold">Order Total</Text>
          <Text className="text-lg font-bold">
            AED {(getSubtotal() + shippingCost).toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Address & Payment */}
      <Text className="text-base font-semibold mb-2">Shipping Address</Text>
      <TextInput
        className="bg-white p-3 rounded-md mb-4 border border-gray-300"
        placeholder="Enter your address"
        value={shippingAddress}
        onChangeText={setShippingAddress}
      />

      <Text className="text-base font-semibold mb-2">Select Payment Method:</Text>
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => setPaymentMethod('online')} className="flex-row items-center mr-4">
          <View
            className={`w-4 h-4 mr-2 rounded-full border ${paymentMethod === 'online' ? 'border-[#9341f3] bg-[#9341f3]' : 'border-gray-400'
              }`}
          />
          <Text>Online Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPaymentMethod('cod')} className="flex-row items-center">
          <View
            className={`w-4 h-4 mr-2 rounded-full border ${paymentMethod === 'cod' ? 'border-[#9341f3] bg-[#9341f3]' : 'border-gray-400'
              }`}
          />
          <Text>Cash on Delivery</Text>
        </TouchableOpacity>
      </View>

      {/* Checkout & Clear */}
      <TouchableOpacity
        className="py-4 rounded-lg mb-3"
        style={{ backgroundColor: '#9341f3' }}
      >
        <Text className="text-white text-center font-bold">Proceed to Checkout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={clearCart}
        className="py-4 rounded-lg"
        style={{ backgroundColor: '#D53AFB' }}
      >
        <Text className="text-white text-center font-bold">Clear Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddToCart;
