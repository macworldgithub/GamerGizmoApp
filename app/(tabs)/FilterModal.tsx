import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Modal as RNModal } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import CityModal from './CityModal';
import Modal from "react-native-modal";
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';
import { useRouter } from 'expo-router';

type FilterModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onApplyFilter: (filters: { location_id?: number }) => void;
};

type Location = {
  id: number;
  name: string;
};

const FilterModal: React.FC<FilterModalProps> = ({
  isVisible,
  onClose,
  onApplyFilter,
}) => {
  const [isCityModalVisible, setIsCityModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState<Location | null>(null);
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
        console.error('Failed to fetch locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleApplyFilters = async () => {
    console.log('Selected City:', selectedCity);
    
    const filters = {
      location_id: selectedCity?.id,
    };
    
    console.log('Applying filters:', filters);
    onApplyFilter(filters);
  };

  const handleReset = () => {
    setSelectedCity(null);
  };

  return (
    <>
      <RNModal
        visible={isVisible}
        animationType="slide"
        transparent={false}
      >
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
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
                <Text className="text-gray-500">{selectedCity?.name || 'Select City'}</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
            </TouchableOpacity>
          </ScrollView>

          {/* Show Results Button */}
          <View className="p-4">
            <TouchableOpacity 
              className="bg-red-600 rounded-lg py-4"
              onPress={handleApplyFilters}
            >
              <Text className="text-white text-center font-semibold text-lg">
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
        selectedCity={selectedCity?.name || ''}
        onSelect={(cityName: string) => {
          const city = locations.find(loc => loc.name === cityName);
          if (city) {
            console.log('Selected city with ID:', city.id);
            setSelectedCity(city);
          }
          setIsCityModalVisible(false);
        }}
      />
    </>
  );
};

export default FilterModal;
