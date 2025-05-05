import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Productcarrd from "./Productcarrd";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";
import Add from "./add";

const PopularMainSection = () => {
  const [LaptopUsedData, setLaptopUsedData] = useState([
    {
      id: 1,
      name: "Radeon RX 580 OC...",
      description: "Powerful graphics card for gaming...",
      price: "AED 551.00",
      images: [
        {
          id: 1,
          product_id: 1,
          image_url: "../../assets/images/default.png",
          created_at: "",
        },
      ],
    },
  ]);
  const [LaptopNewData, setLaptopNewData] = useState([
    {
      id: 1,
      name: "Radeon RX 580 OC...",
      description: "Powerful graphics card for gaming...",
      price: "AED 551.00",
      // images: ["/images/gpu.png"],
    },
  ]);
  const [consolesNewData, setConsolesNewData] = useState([
    {
      id: 1,
      name: "Radeon RX 580 OC...",
      description: "Powerful graphics card for gaming...",
      price: "AED 551.00",
      // images: ["/images/gpu.png"],
    },
  ]);
  const [consolesUsedData, setConsolesUsedData] = useState([
    {
      id: 1,
      name: "Radeon RX 580 OC...",
      description: "Powerful graphics card for gaming...",
      price: "AED 551.00",
      // images: ["/images/gpu.png"],
    },
  ]);
  const [desktopNewData, setDesktopNewData] = useState([
    {
      id: 1,
      name: "Radeon RX 580 OC...",
      description: "Powerful graphics card for gaming...",
      price: "AED 551.00",
      // images: ["/images/gpu.png"],
    },
  ]);
  const [desktopUsedData, setDesktopUsedData] = useState([
    {
      id: 1,
      name: "Radeon RX 580 OC...",
      description: "Powerful graphics card for gaming...",
      price: "AED 551.00",
      // images: ["/images/gpu.png"],
    },
  ]);

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
      const conditions = [2, 3, 4];
      const promises = conditions.map((cond) =>
        axios.get(
          `${API_BASE_URL}/products/getAll?category_id=2&condition=${cond}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      );

      const responses = await Promise.all(promises);
      const allData = responses.flatMap((res) => res?.data?.data || []);
      setDesktopUsedData(allData);
    } catch (err) {
      console.error("Failed to fetch used desktops.");
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
      console.error("Failed to fetch models.");
    }
  };
  const fetchUsedConsoles = async () => {
    try {
      const conditions = [2, 3, 4];
      const promises = conditions.map((cond) =>
        axios.get(
          `${API_BASE_URL}/products/getAll?category_id=4&condition=${cond}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      );

      const responses = await Promise.all(promises);
      const allData = responses.flatMap((res) => res?.data?.data || []);
      setConsolesUsedData(allData);
    } catch (err) {
      console.error("Failed to fetch used consoles.");
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
      const conditions = [2, 3, 4]; // all conditions considered as "used"
      const promises = conditions.map((cond) =>
        axios.get(
          `${API_BASE_URL}/products/getAll?category_id=1&condition=${cond}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      );

      const responses = await Promise.all(promises);
      const allData = responses.flatMap((res) => res?.data?.data || []);
      setLaptopUsedData(allData);
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
      const conditions = [2, 3, 4];
      const promises = conditions.map((cond) =>
        axios.get(
          `${API_BASE_URL}/products/getAll?category_id=3&condition=${cond}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      );

      const responses = await Promise.all(promises);
      const allData = responses.flatMap((res) => res?.data?.data || []);
      //@ts-ignore
      setComponentsUsedData(allData);
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
      console.error("Failed to fetch models.");
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
          // seReftech={seReftech}
          // refetch={fetcher}
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
          // seReftech={seReftech}
          // refetch={fetcher}
          explorePath={`/ExploreScreen?category=components&condition=2`}
        />
      </View>
      <View className="mt-6">
        <Productcarrd
          title="Popular in New Components and Accessories"
          productList={componentsNewData}
          // seReftech={seReftech}
          // refetch={fetcher}
          explorePath={`/ExploreScreen?category=components&condition=1`}
        />
      </View>
    </View>
  );
};

export default PopularMainSection;
