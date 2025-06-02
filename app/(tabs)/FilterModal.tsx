import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Modal as RNModal } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import CityModal from './CityModal';
import Modal from "react-native-modal";

type FilterModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onApplyFilters: () => void;
};

// First create AdsPostedModal component inline
const AdsPostedModal = ({ 
  isVisible, 
  onClose, 
  selected,
  onSelect 
}: {
  isVisible: boolean;
  onClose: () => void;
  selected: string;
  onSelect: (option: string) => void;
}) => {
  const ADS_POSTED_OPTIONS = [
    "Newest to Oldest",
    "Oldest to Newest",
  ];

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      swipeDirection={["down"]}
      onSwipeComplete={onClose}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View className="bg-white rounded-t-2xl p-4">
        {/* Handle Bar */}
        <View className="items-center mb-4">
          <View className="w-10 h-1.5 rounded-full bg-gray-300" />
        </View>

        <Text className="text-xl font-semibold mb-4">Ads Posted</Text>

        {ADS_POSTED_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => onSelect(option)}
            className="flex-row items-center justify-between py-3 border-b border-gray-100"
          >
            <Text className="text-base text-gray-800">{option}</Text>
            {selected === option && (
              <MaterialIcons name="check" size={20} color="#ef4444" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

// Main FilterModal component
const FilterModal: React.FC<FilterModalProps> = ({
  isVisible,
  onClose,
  onApplyFilters,
}) => {
  const [isCityModalVisible, setIsCityModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [isAdsPostedModalVisible, setAdsPostedModalVisible] = useState(false);
  const [selectedAdsPosted, setSelectedAdsPosted] = useState('');

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
            <TouchableOpacity onPress={() => {
              setSelectedCity('');
              setSelectedAdsPosted('');
            }}>
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
                <Text className="text-gray-500">{selectedCity || 'Select City'}</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
            </TouchableOpacity>

            {/* Price */}
            <View className="p-4 border-b border-gray-100">
              <Text className="text-base font-medium mb-3">Price (AED)</Text>
              <View className="flex-row space-x-4">
                <TextInput
                  className="flex-1 border border-gray-300 rounded-lg p-3"
                  placeholder="Min"
                  keyboardType="numeric"
                />
                <TextInput
                  className="flex-1 border border-gray-300 rounded-lg p-3"
                  placeholder="Max"
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Ads Posted */}
            <TouchableOpacity 
              className="flex-row justify-between items-center p-4 border-b border-gray-100"
              onPress={() => setAdsPostedModalVisible(true)}
            >
              <View>
                <Text className="text-base font-medium">Ads Posted</Text>
                {selectedAdsPosted && (
                  <Text className="text-gray-500">{selectedAdsPosted}</Text>
                )}
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
            </TouchableOpacity>
          </ScrollView>

          {/* Show Results Button */}
          <View className="p-4">
            <TouchableOpacity 
              className="bg-red-600 rounded-lg py-4"
              onPress={onApplyFilters}
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
        selectedCity={selectedCity}
        onSelect={(city: string) => {
          setSelectedCity(city);
          setIsCityModalVisible(false);
        }}
      />

      {/* Ads Posted Modal */}
      <AdsPostedModal
        isVisible={isAdsPostedModalVisible}
        onClose={() => setAdsPostedModalVisible(false)}
        selected={selectedAdsPosted}
        onSelect={(option) => {
          setSelectedAdsPosted(option);
          setAdsPostedModalVisible(false);
        }}
      />
    </>
  );
};

export default FilterModal;
