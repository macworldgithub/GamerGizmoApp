import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Productcarrd from './Productcarrd';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types'; // You must define this

// Define navigation prop type
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'processor'>;

const PopularMainSection = () => {
  const navigation = useNavigation<NavigationProp>();
  const [LaptopUsedData, setLaptopUsedData] = useState([
    {
      id: 1,
      name: 'Radeon RX 580 OC...',
      description: 'Powerful graphics card for gaming...',
      price: 551.0,
      images: [
        {
          id: 1,
          product_id: 1,
          image_url: 'https://via.placeholder.com/100', // Use a remote fallback image
          created_at: '',
        },
      ],
    },
  ]);

  const token = useSelector((state: RootState) => state.user.token);
  const [fetcher, setFetcher] = useState(false);

  const fetchUsedLaptops = async () => {
    try {
      const conditions = [2, 3, 4];
      const promises = conditions.map((cond) =>
        axios.get(`${API_BASE_URL}/products/getAll?category_id=1&condition=${cond}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      );

      const responses = await Promise.all(promises);
      const allData = responses.flatMap((res) => res?.data?.data || []);
      setLaptopUsedData(allData);
    } catch (err) {
      console.error('Failed to fetch used laptops.');
    }
  };

  useEffect(() => {
    fetchUsedLaptops();
  }, [fetcher]);

  return (
    <View>
      <View className="mt-6">
        <Productcarrd
          title="Popular in Used Laptops"
          productList={LaptopUsedData}
          explorePath="/laptops?condition=2"
          onExplore={() => console.log('Explore Gaming PC Parts')}
          onProductClick={(id) => navigation.navigate('processor', { id })}
        />
      </View>
    </View>
  );
};

export default PopularMainSection;
