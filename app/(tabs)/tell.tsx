import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

// Define brand, model, condition, and location types
type Brand = {
  id: number;
  name: string;
  logo: string | null;
  category_id: number;
  status: boolean;
};

type Model = {
  id: number;
  name: string;
  brand_id: number;
  status: boolean;
};

type Condition = {
  id: number;
  name: string;
};

type Location = {
  id: number;
  name: string;
};

const Tell = () => {
  const [brand, setBrand] = useState("");
  const [brandId, setBrandId] = useState<number | null>(null);
  const [model, setModel] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  // Fetch brands on mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          "https://backend.gamergizmo.com/brands/getAll?category=1"
        );
        const data = await response.json();
        setBrands(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };

    fetchBrands();
  }, []);

  // Fetch conditions on mount
  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await fetch(
          "https://backend.gamergizmo.com/conditions/getAll"
        );
        const data = await response.json();
        setConditions(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch conditions:", error);
      }
    };

    fetchConditions();
  }, []);

  // Fetch locations on mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "https://backend.gamergizmo.com/location/getAll"
        );
        const data = await response.json();
        setLocations(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };

    fetchLocations();
  }, []);

  // Fetch models when brandId changes
  useEffect(() => {
    const fetchModels = async () => {
      if (!brandId) {
        setModels([]);
        return;
      }

      try {
        const response = await fetch(
          `https://backend.gamergizmo.com/models/getAll?brand=${brandId}`
        );
        const data = await response.json();
        setModels(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch models:", error);
      }
    };

    fetchModels();
  }, [brandId]);

  const handleBrandChange = (value: string, id: number) => {
    setBrand(value);
    setBrandId(id);
    setModel(""); // reset model when brand changes
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <View>
        <Image source={require("../../assets/images/left.png")} />
        <View className="items-center -mt-6">
          <Text className="text-black font-semibold text-lg">
            Tell us about your PC
          </Text>
        </View>
      </View>

      <View className="border border-gray-200 p-3 mb-4 shadow-sm mt-10">
        <TextInput placeholder="Title" className="text-base text-black" />
      </View>

      {/* Brand Picker */}
      <View className="border border-gray-200 mb-4">
        <Picker
          selectedValue={brand}
          onValueChange={(itemValue, itemIndex) => {
            const selected = brands[itemIndex - 1]; 
            handleBrandChange(itemValue, selected?.id || 0);
          }}
        >
          <Picker.Item label="Brand" value="" />
          {brands.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View>

      {/* Model Picker (based on selected brand) */}
      <View className="border border-gray-200 mb-4">
        <Picker
          selectedValue={model}
          onValueChange={(itemValue) => setModel(itemValue)}
          enabled={models.length > 0}
        >
          <Picker.Item label="Model" value="" />
          {models.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View>

      {/* Condition Picker */}
      <View className="border border-gray-200 mb-4">
        <Picker
          selectedValue={condition}
          onValueChange={(itemValue) => setCondition(itemValue)}
        >
          <Picker.Item label="Condition" value="" />
          {conditions.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View>

      {/* Location Picker */}
      <View className="border border-gray-200 mb-4">
        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => setLocation(itemValue)}
        >
          <Picker.Item label="Location" value="" />
          {locations.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View>

      <View className="border border-gray-200 p-8 mb-6">
        <TextInput
          placeholder="Description"
          multiline
          numberOfLines={4}
          className="text-base text-black"
        />
      </View>

      <TouchableOpacity>
        <Image
          source={require("../../assets/images/next1.png")}
          className="ml-20"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Tell;
