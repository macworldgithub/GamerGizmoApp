import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";
import NoAds from "./NoAds";
import AdList from "./Adlist";
import CustomLoader from "./CustomLoader";
import { router } from "expo-router";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function Adds() {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState([]);

  const { refresh } = useLocalSearchParams(); // 👈 get param

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

  useFocusEffect(
    useCallback(() => {
      fetchAds();
    }, [currentPage]) 
  );
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Ads</Text>

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
