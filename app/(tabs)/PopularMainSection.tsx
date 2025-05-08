import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Productcarrd from "./Productcarrd";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";
import Add from "./add";

const PopularMainSection = () => {
  const [LaptopUsedData, setLaptopUsedData] = useState([]);
  const [LaptopNewData, setLaptopNewData] = useState([]);
  const [consolesNewData, setConsolesNewData] = useState([]);
  const [consolesUsedData, setConsolesUsedData] = useState([]);
  const [desktopNewData, setDesktopNewData] = useState([]);
  const [desktopUsedData, setDesktopUsedData] = useState([]);

  const ConsoleCategory = "Gaming Consoles";
  const consoleCondition = 2;
  const explorePath = `/${encodeURIComponent(
    ConsoleCategory
  )}?condition=${consoleCondition}`;
  const [componentsUsedData, setComponentsUsedData] = useState([]);
  const [componentsNewData, setComponentsNewData] = useState([]);
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

      setDesktopUsedData(response?.data?.data || []);
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

      setDesktopNewData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch  desktops");
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

      setConsolesUsedData(response?.data?.data || []);
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

      setConsolesNewData(response?.data?.data || []);
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

      setLaptopUsedData(response?.data?.data || []);
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

      setLaptopNewData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch models.");
    }
  };

  const fetchUsedComponents = async () => {
    try {
      const response =await axios.get(
          `${API_BASE_URL}/products/getAll?category_id=3&condition=2`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
      );

      setComponentsUsedData(response?.data?.data || []);
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

      setComponentsNewData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch components.");
    }
  };

  useEffect(() => {
    fetchUsedLaptops();
    fetchNewLaptops();
    fetchUsedConsoles();
    fetchNewConsoles();
    fetchUsedDesktops();
    fetchNewDesktops();
    fetchUsedComponents();
    fetchNewComponents();
  }, [fetcher]);
  return (
    <View>
      <View className="mt-6">
        <Productcarrd
          title="Popular in Used Gaming PCs"
          productList={desktopUsedData}
          seReftech={seReftech}
          refetch={fetcher}
          explorePath={`/ExploreScreen?category=desktop&condition=2`}
          // explorePath={`/desktop?condition=2`}

        />
      </View>
      <View className="mt-6">
        <Productcarrd
          title="Popular in New Gaming PCs"
          productList={desktopNewData}
          seReftech={seReftech}
          refetch={fetcher}
          explorePath={`/ExploreScreen?category=desktop&condition=1`}
        />
      </View>
      <View className="mt-4">
        <Add />
      </View>
      <View className="mt-6">
        <Productcarrd
          title="Popular in Used Laptops"
          productList={LaptopUsedData}
          seReftech={seReftech}
          refetch={fetcher}
          explorePath={`/ExploreScreen?category=laptops&condition=2`}

        />
      </View>
      <View className="mt-6">
        <Productcarrd
          title="Popular in New Laptops"
          productList={LaptopNewData}
          seReftech={seReftech}
          explorePath={`/ExploreScreen?category=laptops&condition=1`}
          refetch={fetcher}
        />
      </View>
      <View className="mt-4">
        <Add />
      </View>
      <View className="mt-6">
        <Productcarrd
          title="Popular in Used Consoles"
          productList={consolesUsedData}
          seReftech={seReftech}
          refetch={fetcher}
          explorePath={`/ExploreScreen?category=console&condition=2`}
        />
      </View>
      <View className="mt-6">
        <Productcarrd
          title="Popular in New Consoles"
          productList={consolesNewData}
          seReftech={seReftech}
          refetch={fetcher}
          explorePath={`/ExploreScreen?category=console&condition=1`}
        />
      </View>
      <View className="mt-4">
        <Add />
      </View>
      <View className="mt-6">
        <Productcarrd
          title="Popular in Used Components and Accessories"
          productList={componentsUsedData}
          seReftech={seReftech}
          refetch={fetcher}
          explorePath={`/ExploreScreen?category=components&condition=2`}
        />
      </View>
      <View className="mt-6">
        <Productcarrd
          title="Popular in New Components and Accessories"
          productList={componentsNewData}
          seReftech={seReftech}
          refetch={fetcher}
          explorePath={`/ExploreScreen?category=components&condition=1`}
        />
      </View>
    </View>
  );
};

export default PopularMainSection;
