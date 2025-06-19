import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Productcarrd from "./Productcarrd";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";
import LiveAds from "./LiveAds";
import { useFocusEffect } from "@react-navigation/native";

type ProductImage = {
  id: number;
  product_id: number;
  image_url: string;
  created_at: string;
};

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: ProductImage[];
  created_at: string;
  explorePath: string;
}

const PopularMainSection = () => {
  const [LaptopUsedData, setLaptopUsedData] = useState<Product[]>([]);
  const [LaptopNewData, setLaptopNewData] = useState<Product[]>([]);
  const [consolesNewData, setConsolesNewData] = useState<Product[]>([]);
  const [consolesUsedData, setConsolesUsedData] = useState<Product[]>([]);
  const [desktopNewData, setDesktopNewData] = useState<Product[]>([]);
  const [desktopUsedData, setDesktopUsedData] = useState<Product[]>([]);
  const [componentsUsedData, setComponentsUsedData] = useState<Product[]>([]);
  const [componentsNewData, setComponentsNewData] = useState<Product[]>([]);

  const ConsoleCategory = "Gaming Consoles";
  const consoleCondition = 2;
  const explorePath = `/${encodeURIComponent(
    ConsoleCategory
  )}?condition=${consoleCondition}`;
  const token = useSelector((state: RootState) => state.user.token);
  const [fetcher, seReftech] = useState(false);

  const fetchUsedDesktops = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products/getAll?category_id=2&condition=2`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const sortedData = [...(response?.data?.data || [])]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .map(product => ({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          description: product.description,
          created_at: product.created_at,
          images: (product.images || product.product_images || []).map((img: any) => ({
            id: img.id,
            product_id: img.product_id,
            image_url: img.image_url,
            created_at: img.created_at,
          })),
          explorePath: `/ExploreScreen?category=desktop&condition=2`,
        }));
      setDesktopUsedData(sortedData);
    } catch (err) {
      console.error("Failed to fetch desktops.");
    }
  };

  const fetchNewDesktops = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products/getAll?category_id=2&condition=1`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const sortedData = [...(response?.data?.data || [])]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .map(product => ({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          description: product.description,
          created_at: product.created_at,
          images: (product.images || product.product_images || []).map((img: any) => ({
            id: img.id,
            product_id: img.product_id,
            image_url: img.image_url,
            created_at: img.created_at,
          })),
          explorePath: `/ExploreScreen?category=desktop&condition=1`,
        }));
      setDesktopNewData(sortedData);
    } catch (err) {
      console.error("Failed to fetch desktops");
    }
  };
  const fetchUsedConsoles = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products/getAll?category_id=4&condition=2`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const sortedData = [...(response?.data?.data || [])]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .map(product => ({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          description: product.description,
          created_at: product.created_at,
          images: (product.images || product.product_images || []).map((img: any) => ({
            id: img.id,
            product_id: img.product_id,
            image_url: img.image_url,
            created_at: img.created_at,
          })),
          explorePath: `/ExploreScreen?category=console&condition=2`,
        }));
      setConsolesUsedData(sortedData);
    } catch (err) {
      console.error("Failed to fetch models.");
    }
  };

  const fetchNewConsoles = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products/getAll?category_id=4&condition=1`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const sortedData = [...(response?.data?.data || [])]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .map(product => ({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          description: product.description,
          created_at: product.created_at,
          images: (product.images || product.product_images || []).map((img: any) => ({
            id: img.id,
            product_id: img.product_id,
            image_url: img.image_url,
            created_at: img.created_at,
          })),
          explorePath: `/ExploreScreen?category=console&condition=1`,
        }));
      setConsolesNewData(sortedData);
    } catch (err) {
      console.error("Failed to fetch models.");
    }
  };
  const fetchUsedLaptops = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products/getAll?category_id=1&condition=2`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const sortedData = [...(response?.data?.data || [])]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .map(product => ({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          description: product.description,
          created_at: product.created_at,
          images: (product.images || product.product_images || []).map((img: any) => ({
            id: img.id,
            product_id: img.product_id,
            image_url: img.image_url,
            created_at: img.created_at,
          })),
          explorePath: `/ExploreScreen?category=laptops&condition=2`,
        }));
      setLaptopUsedData(sortedData);
    } catch (err) {
      console.error("Failed to fetch used laptops.");
    }
  };


  const fetchNewLaptops = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products/getAll?category_id=1&condition=1`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const sortedData = [...(response?.data?.data || [])]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .map(product => ({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          description: product.description,
          created_at: product.created_at,
          images: (product.images || product.product_images || []).map((img: any) => ({
            id: img.id,
            product_id: img.product_id,
            image_url: img.image_url,
            created_at: img.created_at,
          })),
          explorePath: `/ExploreScreen?category=laptops&condition=1`,
        }));
      setLaptopNewData(sortedData);
    } catch (err) {
      console.error("Failed to fetch models.");
    }
  };

  const fetchUsedComponents = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products/getAll?category_id=3&condition=2`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const sortedData = [...(response?.data?.data || [])]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .map(product => ({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          description: product.description,
          created_at: product.created_at,
          images: (product.images || product.product_images || []).map((img: any) => ({
            id: img.id,
            product_id: img.product_id,
            image_url: img.image_url,
            created_at: img.created_at,
          })),
          explorePath: `/ExploreScreen?category=components&condition=2`,
        }));
      setComponentsUsedData(sortedData);
    } catch (err) {
      console.error("Failed to fetch used components.");
    }
  };

  const fetchNewComponents = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products/getAll?category_id=3&condition=1`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const sortedData = [...(response?.data?.data || [])]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .map(product => ({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          description: product.description,
          created_at: product.created_at,
          images: (product.images || product.product_images || []).map((img: any) => ({
            id: img.id,
            product_id: img.product_id,
            image_url: img.image_url,
            created_at: img.created_at,
          })),
          explorePath: `/ExploreScreen?category=components&condition=1`,
        }));
      setComponentsNewData(sortedData);
    } catch (err) {
      console.error("Failed to fetch components.");
    }
  };

  const refreshAllData = () => {
    fetchUsedLaptops();
    fetchNewLaptops();
    fetchUsedConsoles();
    fetchNewConsoles();
    fetchUsedDesktops();
    fetchNewDesktops();
    fetchUsedComponents();
    fetchNewComponents();
  };

  // Initial load
  useEffect(() => {
    refreshAllData();
  }, []);

  // Refresh when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      refreshAllData();
    }, [])
  );

  return (
    <View>
      <View className="mt-6">
        <Productcarrd
          title="Popular in Used Gaming PCs"
          productList={desktopUsedData}
          explorePath={`/ExploreScreen?category=desktop&condition=2`}
        />
      </View>
      <View className="mt-6">
        <Productcarrd
          title="Popular in New Gaming PCs"
          productList={desktopNewData}
          explorePath={`/ExploreScreen?category=desktop&condition=1`}
        />
      </View>
      <View className="mt-4">
        <LiveAds pageName="Home" adId={2} />
      </View>
      <View className="mt-6">
        <Productcarrd
          title="Popular in Used Laptops"
          productList={LaptopUsedData}
          explorePath={`/ExploreScreen?category=laptops&condition=2`}
        />
      </View>
      <View className="mt-6">
        <Productcarrd
          title="Popular in New Laptops"
          productList={LaptopNewData}
          explorePath={`/ExploreScreen?category=laptops&condition=1`}
        />
      </View>
      <View className="mt-4">
        <LiveAds pageName="Home" adId={3} />
      </View>
      <View className="mt-6">
        <Productcarrd
          title="Popular in Used Consoles"
          productList={consolesUsedData}
          explorePath={`/ExploreScreen?category=console&condition=2`}
        />
      </View>
      <View className="mt-6">
        <Productcarrd
          title="Popular in New Consoles"
          productList={consolesNewData}
          explorePath={`/ExploreScreen?category=console&condition=1`}
        />
      </View>
      <View className="mt-4">
        <LiveAds pageName="Home" adId={4} />
      </View>
      <View className="mt-6">
        <Productcarrd
          title="Popular in Used Components and Accessories"
          productList={componentsUsedData}
          explorePath={`/ExploreScreen?category=components&condition=2`}
        />
      </View>
      <View className="mt-6">
        <Productcarrd
          title="Popular in New Components and Accessories"
          productList={componentsNewData}
          explorePath={`/ExploreScreen?category=components&condition=1`}
        />
      </View>
    </View>
  );
};

export default PopularMainSection;
