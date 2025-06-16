import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView, TextInput, Alert,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { API_BASE_URL } from '@/utils/config';

import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';

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
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const shippingCost = 10;

  const fetchCart = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Cart response:', JSON.stringify(response.data, null, 2));


      const data = response.data;

      if (!data || !Array.isArray(data.cart_items)) {
        console.error('Unexpected cart response:', data);
        return;
      }

      const transformed = data.cart_items.map((item: any) => {
        const product = item.product || {};
        const firstImage = product.product_images?.[0]?.image_url;
        return {
          id: item.id,
          name: product.name || 'Unnamed Product',
          color: product.color || 'N/A',
          itemId: `#${item.id}`,
          price: parseFloat(item.price),
          quantity: item.quantity,
          image: {
            uri: firstImage || 'https://via.placeholder.com/150',
          },
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
      await axios.delete(`${API_BASE_URL}/cart/item/${productId}`, {
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
      await axios.delete(`${API_BASE_URL}/cart`, {
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

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  )

  const handleCheckout = async () => {
    if (!shippingAddress.trim()) {
      Alert.alert('Address Required', 'Please enter a shipping address.');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Authentication Error', 'User not authenticated.');
      return;
    }

    if (paymentMethod === 'cod') {
      // COD Flow
      try {
        const response = await axios.post(
          `${API_BASE_URL}/orders`,
          {
            shipping_address: shippingAddress,
            payment_method: 'cash_on_delivery',
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        Alert.alert('Success', 'Order placed successfully (COD).');
        setCartItems([]);
        router.push('/Orders');
      } catch (error: any) {
        console.error('COD Error:', error?.response?.data || error.message);
        Alert.alert('Checkout Failed', 'Something went wrong during COD checkout.');
      }
    } else {
      // Online Payment Flow
      try {
        const response = await axios.post(
          `${API_BASE_URL}/orders/create-intent`,
          {
            shipping_address: shippingAddress,
            payment_method: 'online',
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { clientSecret } = response.data;
        const initResult = await initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          merchantDisplayName: 'GamerGizmo',
        });

        if (initResult.error) {
          Alert.alert('Stripe Init Error', initResult.error.message);
          return;
        }

        const paymentResult = await presentPaymentSheet();

        if (paymentResult.error) {
          Alert.alert('Payment Failed', paymentResult.error.message);
        } else {
          router.push({
            pathname: '/OrderSuccess',
            params: {
              payment_intent: clientSecret.split('_secret')[0],
              client_secret: clientSecret,
              redirect_status: 'succeeded',
            },
          });
        }
      } catch (error: any) {
        console.error('Stripe Error:', error?.response?.data || error.message);
        Alert.alert('Checkout Failed', 'Something went wrong during online checkout.');
      }
    }
  };

 return (
  <View className="flex-1 bg-white relative">
    <TouchableOpacity
      onPress={() => router.push('/profile')}
      className="absolute top-12 left-4 z-10"
    >
      <AntDesign name="arrowleft" size={28} color="black" />
    </TouchableOpacity>

    {cartItems.length === 0 ? (
      <View className="flex-1 justify-center items-center px-6">
        <Image
          source={require('../../assets/images/empty-cart.png')} // Ensure this path is correct
          className="w-60 h-60"
          resizeMode="contain"
        />
        <Text className="text-xl font-bold text-center mt-4">Your cart is empty!</Text>
        <Text className="text-gray-500 text-center mt-2">
          Looks like you haven't added anything to your cart yet.
        </Text>

        <TouchableOpacity
          onPress={() => router.push('/home')}
          className="mt-6 px-6 py-3 rounded-lg"
          style={{ backgroundColor: '#9341f3' }}
        >
          <Text className="text-white font-semibold">Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <ScrollView className="flex-1 bg-gray-100 px-4 pt-20 pb-6">
        <Text className="text-2xl font-bold mb-4 text-center" style={{ color: '#9341f3' }}>
          Shopping Cart
        </Text>

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
              className={`w-4 h-4 mr-2 rounded-full border ${paymentMethod === 'online' ? 'border-[#9341f3] bg-[#9341f3]' : 'border-gray-400'}`}
            />
            <Text>Online Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPaymentMethod('cod')} className="flex-row items-center">
            <View
              className={`w-4 h-4 mr-2 rounded-full border ${paymentMethod === 'cod' ? 'border-[#9341f3] bg-[#9341f3]' : 'border-gray-400'}`}
            />
            <Text>Cash on Delivery</Text>
          </TouchableOpacity>
        </View>

        {/* Checkout & Clear */}
        <TouchableOpacity
          className="py-4 rounded-lg mb-3"
          style={{ backgroundColor: '#9341f3' }}
          onPress={handleCheckout}
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
    )}
  </View>
);


};

export default AddToCart;
