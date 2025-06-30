import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@/utils/config';
import UpdateOrderModal from './UpdateOrderModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


type Transaction = {
  id: number;
  order_id: number;
  transaction_status: string;
  payment_method: string;
  payment_amount: string;
  transaction_date: string;
  payment_intent: string;
};


type OrderItem = {
  id: number;
  quantity: number;
  product_id: number;
  price: string;
  product: {
    name: string;
    product_images: {
      image_url: string;
    }[];
  };
};

type Order = {
  id: number;
  created_at: string;
  total_amount: string;
  order_status: string;
  shipping_address: string;
  payment_method: string;
  payment_status?: string;
  order_items: OrderItem[];
  transactions: Transaction[];
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState('');

  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Orders fetched:', JSON.stringify(response.data, null, 2));


      const ordersData = Array.isArray(response.data) ? response.data : [response.data];
      setOrders(ordersData);
    } catch (error: any) {
      console.error('Failed to fetch orders:', error?.response?.data || error.message);
    }
  };

  const openUpdateModal = (orderId: number, currentAddress: string) => {
    setSelectedOrderId(orderId);
    setSelectedShippingAddress(currentAddress);
    setShowUpdateModal(true);
  };

  const handleUpdate = async (newAddress: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.patch(
        `${API_BASE_URL}/orders/${selectedOrderId}`,
        { shipping_address: newAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert('Updated', 'Shipping address updated successfully');
      setShowUpdateModal(false);
      fetchOrders();
    } catch (error: any) {
      console.error('Update error:', error?.response?.data || error.message);
      Alert.alert('Error', 'Failed to update shipping address');
    }
  };

  const openDeleteModal = (orderId: number) => {
    setSelectedOrderId(orderId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/orders/${selectedOrderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Deleted', `Order #${selectedOrderId} deleted`);
      setShowDeleteModal(false);
      fetchOrders();
    } catch (error: any) {
      console.error('Delete error:', error?.response?.data || error.message);
      Alert.alert('Error', 'Failed to delete order');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };
  

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  return (
    <View className="flex-1 bg-gray-100 relative">

      <TouchableOpacity
        onPress={() => router.push('/profile')}
        className="absolute top-12 left-4 z-10"
      >
        <AntDesign name="arrowleft" size={28} color="black" />
      </TouchableOpacity>

      {orders.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <Image
            source={require('../../assets/images/empty-cart.png')}
            className="w-60 h-60"
            resizeMode="contain"
          />
          <Text className="text-xl font-bold text-center mt-4">No Orders Placed</Text>
          <Text className="text-gray-500 text-center mt-2">
            You haven't placed any orders yet. Start shopping now!
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
        <ScrollView className="p-4 pt-20 mb-10">
          <Text className="text-2xl font-bold mb-4 text-center" style={{ color: '#9341f3' }}>
            My Orders
          </Text>

          {orders.map((order: Order) => (
            <View key={order.id} className="bg-white p-4 pb-20 mb-4 rounded-md shadow-sm">
              <Text className="font-semibold mb-1">Order #{order.id}</Text>
              <Text className="text-sm text-gray-600 mb-1">Date: {formatDate(order.created_at)}</Text>

              {order.order_items?.map((item: OrderItem) => (
                <View key={item.id} className="flex-row items-center mb-2">
                  <Image
                    source={{ uri: item.product?.product_images?.[0]?.image_url || '' }}
                    className="w-14 h-14 rounded-md"
                  />
                  <View className="ml-3">
                    <Text>{item.product?.name}</Text>
                    <Text className="text-sm text-gray-500">Qty: {item.quantity}</Text>
                  </View>
                </View>
              ))}

              <Text className="mt-1 font-bold">Total: AED {order.total_amount}</Text>
              <Text className="text-sm text-gray-600">Payment Mode: {order.payment_method}</Text>

              {order.payment_method === 'cash_on_delivery' ? (
                <View className="flex-row items-center mt-1">
                  <Text className="text-sm text-black mr-1">Order Status:</Text>
                  <View className="border border-[#D53AFB] px-2 rounded-lg">
                    <Text className="text-[#D53AFB] font-semibold text-sm">
                      {order.order_status}
                    </Text>
                  </View>
                </View>                
              ) : order.payment_method === 'online' && order.transactions?.length > 0 ? (
                <View className="flex-row items-center mt-1">
                  <Text className="text-sm text-black mr-1">Transaction Status:</Text>
                  <View className="border border-[#D53AFB] px-2 rounded-lg">
                    <Text className="text-[#D53AFB] font-semibold text-sm">
                      {order.transactions[0]?.transaction_status ?? 'Unknown'}
                    </Text>
                  </View>
                </View>
              ) : null}


              <View className="flex-row justify-end mt-3 gap-2">
                <TouchableOpacity
                  onPress={() => openUpdateModal(order.id, order.shipping_address)}
                  className="bg-[#9341f3] px-4 py-2 rounded"
                >
                  <Text className="text-white font-medium">Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openDeleteModal(order.id)}
                  className="bg-[#D53AFB] px-4 py-2 rounded"
                >
                  <Text className="text-white font-medium">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Modals */}
          <UpdateOrderModal
            visible={showUpdateModal}
            onClose={() => setShowUpdateModal(false)}
            currentAddress={selectedShippingAddress}
            onUpdate={handleUpdate}
          />

          <DeleteConfirmModal
            visible={showDeleteModal}
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
          />
        </ScrollView>
      )}
    </View>
  );

};

export default Orders;
