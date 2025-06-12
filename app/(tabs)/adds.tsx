import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";
import NoAds from "./NoAds";
import AdList from "./Adlist";
import CustomLoader from "./CustomLoader";
import { router } from "expo-router";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

export default function Adds() {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState([]);
  const [search, setSearch] = useState("");

  const { refresh } = useLocalSearchParams();
  const fetchAds = async (query = "") => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      if (!token || !userId) {
        router.replace("/login");
        return;
      }

      let response;

      if (query.trim() === "") {
        // ✅ Default user ads
        response = await axios.get(
          `https://backend.gamergizmo.com/products/getUserProducts?userId=${userId}&pageNo=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAds(response.data?.data ?? []);
        setTotal(response.data?.total ?? 0);
      } else {
        // ✅ Search by query
        response = await axios.get(
          `https://backend.gamergizmo.com/products/search-my-products?userId=${userId}&query=${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Search response:", response.data);

        // ✅ Correct keys for search result
        setAds(response.data?.products ?? []);
        setTotal(response.data?.total ?? 0);
      }
    } catch (error) {
      console.error("Fetch error", error);
      Toast.show({
        type: "error",
        text1: "Failed to fetch ads",
      });
      setAds([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);
    fetchAds(text); // Immediately fetch results on each keystroke
  };

  useFocusEffect(
    useCallback(() => {
      fetchAds(); // Load default ads when screen is focused or refreshed
    }, [currentPage])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Ads</Text>

      <View className="flex-row items-center bg-gray-100 border border-gray-300 rounded-full px-4 py-2 shadow-sm mb-4">
        <MagnifyingGlassIcon size={20} color="#6b7280" className="mr-2" />
        <TextInput
          placeholder="Search for products..."
          className="flex-1 text-gray-800 text-base"
          value={search}
          onChangeText={handleSearchChange}
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
