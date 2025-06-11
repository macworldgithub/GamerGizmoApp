import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";
import NoAds from "./NoAds";
import AdList from "./Adlist";
import CustomLoader from "./CustomLoader";
import { router } from "expo-router";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";


export default function Adds() {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState([]);
  const [search, setSearch] = useState("");
  

  const { refresh } = useLocalSearchParams();

  const fetchAds = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      if (!token || !userId) {
        router.replace("/login");
        return;
      }

      const response = await axios.get(
        `https://backend.gamergizmo.com/products/getUserProducts?userId=${userId}&pageNo=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAds(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to fetch ads",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (text: string) => {
    setSearch(text);
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      
      if (!token) {
        router.replace("/login");
        return;
      }

      if (!text.trim()) {
        fetchAds();
        return;
      }

      const response = await axios.get(
        `http://192.168.100.45:4001/products/search-by-name?name=${text}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAds(response.data.data || []);
      setTotal(response.data.total || 0);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to search ads",
      });
    } finally {
      setLoading(false);
    }
  };
 
useFocusEffect(
  useCallback(() => {
    if (!search.trim()) {
      fetchAds();
    }
  }, [currentPage, search])
);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Ads</Text>
     <View className="flex-row items-center bg-gray-100 border border-gray-300 rounded-full px-4 py-2 shadow-sm">
        <MagnifyingGlassIcon size={20} color="#6b7280" className="mr-2" />
        <TextInput
          placeholder="Search for products..."
          className="flex-1 text-gray-800 text-base"
          value={search}
          onChangeText={handleSearch}
          placeholderTextColor="#9ca3af"
        />
      </View>

      {loading ? (
        <CustomLoader />
      ) : ads.length === 0 ? (
        <NoAds />
      ) : (
        <AdList
          ads={ads}
          //@ts-ignore
          setAds={setAds}
          fetchAds={fetchAds}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={total}
        />
      )}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000",
  },
});


