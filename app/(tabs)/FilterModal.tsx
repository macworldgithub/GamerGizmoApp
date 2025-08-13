import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Modal as RNModal } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import CityModal from "./CityModal";
import Modal from "react-native-modal";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";
import { useRouter } from "expo-router";

type FilterModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onApplyFilter: (filters: {
    location_id?: number;
    priceRange?: { min: number; max: number };
  }) => void;
};

type Location = {
  id: number;
  name: string;
};

type PriceRange = {
  label: string;
  min: number;
  max: number | null;
};

const PRICE_RANGES: PriceRange[] = [
  { label: "Below 500 AED", min: 0, max: 499 },
  { label: "500 - 1000 AED", min: 500, max: 999 },
  { label: "1000 - 3000 AED", min: 1000, max: 2999 },
  { label: "3000 - 5000 AED", min: 3000, max: 4999 },
  { label: "5000+ AED", min: 5000, max: null },
];

const FilterModal: React.FC<FilterModalProps> = ({
  isVisible,
  onClose,
  onApplyFilter,
}) => {
  const [isCityModalVisible, setIsCityModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState<Location | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] =
    useState<PriceRange | null>(null);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/location/getAll`);
        if (response.data?.data) {
          setLocations(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleCitySelect = (cityName: string) => {
    const city = locations.find((loc) => loc.name === cityName);
    if (city) {
      setSelectedCity(city);
    }
    setIsCityModalVisible(false);
  };

  const handlePriceRangeSelect = (range: PriceRange) => {
    setSelectedPriceRange(range);
  };

  const handleApplyFilters = async () => {
    const filters = {
      location_id: selectedCity?.id,
      priceRange: selectedPriceRange
        ? {
            min: selectedPriceRange.min,
            max: selectedPriceRange.max || Number.MAX_SAFE_INTEGER,
          }
        : undefined,
    };

    console.log("Applying filters:", filters);
    onApplyFilter(filters);
    onClose();
  };

  const handleReset = () => {
    setSelectedCity(null);
    setSelectedPriceRange(null);
  };

  return (
    <>
      <RNModal visible={isVisible} animationType="slide" transparent={false}>
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className={`flex-row justify-between items-center p-4 border-b border-gray-200 ${Platform.OS === "ios" ? "mt-16" : "mt-0"}`}>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome name="times" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-xl font-semibold">Filters</Text>
            <TouchableOpacity onPress={handleReset}>
              <Text className="text-gray-400">Reset</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1">
            {/* City */}
            <TouchableOpacity
              className="flex-row justify-between items-center p-4 border-b border-gray-100"
              onPress={() => setIsCityModalVisible(true)}
            >
              <View>
                <Text className="text-base font-medium mb-1">City</Text>
                <Text className="text-gray-500">
                  {selectedCity?.name || "Select City"}
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="gray"
              />
            </TouchableOpacity>

            {/* Price Range */}
            <View className="p-4 border-b border-gray-100">
              <Text className="text-base font-medium mb-3">Price Range</Text>
              <View className="space-y-2">
                {PRICE_RANGES.map((range, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`p-3 rounded-lg border ${
                      selectedPriceRange?.label === range.label
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200"
                    }`}
                    onPress={() => handlePriceRangeSelect(range)}
                  >
                    <Text
                      className={`${
                        selectedPriceRange?.label === range.label
                          ? "text-purple-600"
                          : "text-gray-700"
                      }`}
                    >
                      {range.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Show Results Button */}
          <View className={`p-4 ${Platform.OS === "ios" ? "mb-10" : "mb-0"}`}>
            <TouchableOpacity
              className="bg-purple-700 rounded-lg py-4"
              onPress={handleApplyFilters}
            >
              <Text className="text-white text-center font-semibold text-lg ">
                Show Results
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RNModal>

      {/* City Selection Modal */}
      <CityModal
        visible={isCityModalVisible}
        onClose={() => setIsCityModalVisible(false)}
        selectedCity={selectedCity?.name || ""}
        onSelect={handleCitySelect}
      />
    </>
  );
};

export default FilterModal;
