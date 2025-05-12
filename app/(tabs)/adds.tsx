import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import NoAds from "./NoAds";
import Adlist from "./Adlist";
import CustomLoader from "./CustomLoader";
import { router } from "expo-router";

export default function Adds() {
  const [currentPage, setCurrentPage] = useState(1);
  const [fetcher, setFetch] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState([]);
  const navigation = useNavigation();

  const fetchAds = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      // if (!token || !userId) {
      //   navigation.navigate("Login" as never); // Adjust route name accordingly
      //   return;
      // }
      if (!token || !userId) {
        router.replace("/login"); // use replace() instead of navigate for auth redirects
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

  useEffect(() => {
    fetchAds();
  }, [fetcher]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Ads</Text>
      {ads.length === 0 ? (
        <NoAds />
      ) : (
        <Adlist
          //@ts-ignore
          total={total}
          setFetch={setFetch}
          fetcher={fetcher}
          ads={ads}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {loading && <CustomLoader />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6", // light gray
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
