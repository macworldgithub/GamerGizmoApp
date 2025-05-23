import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ToastAndroid,
  Platform,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";
import { useRouter } from "expo-router";
import { Link } from "expo-router";

import { useDispatch, useSelector } from "react-redux";
import { setDetails } from "../../store/slice/adSlice";
import { RootState } from "../../store/store";

interface OptionType {
  id: number;
  name: string;
}


const Tell = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [brandId, setBrandId] = useState<number | null>(null);
  const [model, setModel] = useState("");
  const [modelId, setModelId] = useState<number | null>(null);
  const [condition, setCondition] = useState("");
  const [conditionId, setConditionId] = useState<number | null>(null);
  const [location, setLocation] = useState("");
  const [locationId, setLocationId] = useState<number | null>(null);

  const [brands, setBrands] = useState<OptionType[]>([]);
  const [models, setModels] = useState<OptionType[]>([]);
  const [conditions, setConditions] = useState<OptionType[]>([]);
  const [locations, setLocations] = useState<OptionType[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const selectedCategory = useSelector(
    (state: RootState) => state.ad.category?.name
  );

  const isComponentsAndAccessories =
    selectedCategory === "Components and Accessories";

  useEffect(() => {
    if (!isComponentsAndAccessories) {
      axios
        .get(`${API_BASE_URL}/brands/getAll?category=1`)
        .then((res) => setBrands(res.data?.data || []))
        .catch((e) => console.error("Failed to fetch brands:", e));
    }
  }, [isComponentsAndAccessories]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/conditions/getAll`)
      .then((res) => setConditions(res.data?.data || []))
      .catch((e) => console.error("Failed to fetch conditions:", e));
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/location/getAll`)
      .then((res) => setLocations(res.data?.data || []))
      .catch((e) => console.error("Failed to fetch locations:", e));
  }, []);

  useEffect(() => {
    if (!brandId || isComponentsAndAccessories) {
      setModels([]);
      return;
    }
    axios
      .get(`${API_BASE_URL}/models/getAll?brand=${brandId}`)
      .then((res) => setModels(res.data?.data || []))
      .catch((e) => console.error("Failed to fetch models:", e));
  }, [brandId]);
  
  const handleNext = () => {
    if (!title.trim()) {
      return Platform.OS === "android"
        ? ToastAndroid.show("Title is required.", ToastAndroid.SHORT)
        : Alert.alert("Validation Error", "Title is required.");
    }

    if (!description.trim()) {
      return Platform.OS === "android"
        ? ToastAndroid.show("Description is required.", ToastAndroid.SHORT)
        : Alert.alert("Validation Error", "Description is required.");
    }

    if (!isComponentsAndAccessories) {
      if (!brand || !brandId) {
        return Platform.OS === "android"
          ? ToastAndroid.show("Please select a brand.", ToastAndroid.SHORT)
          : Alert.alert("Validation Error", "Please select a brand.");
      }

      if (!model || !modelId) {
        return Platform.OS === "android"
          ? ToastAndroid.show("Please select a model.", ToastAndroid.SHORT)
          : Alert.alert("Validation Error", "Please select a model.");
      }
    }

    if (!condition || !conditionId) {
      return Platform.OS === "android"
        ? ToastAndroid.show("Please select a condition.", ToastAndroid.SHORT)
        : Alert.alert("Validation Error", "Please select a condition.");
    }

    if (!location || !locationId) {
      return Platform.OS === "android"
        ? ToastAndroid.show("Please select a location.", ToastAndroid.SHORT)
        : Alert.alert("Validation Error", "Please select a location.");
    }

    const formData = {
      title,
      brand: isComponentsAndAccessories ? null : brand,
      brandId: isComponentsAndAccessories ? 0 : brandId,
      model: isComponentsAndAccessories ? null : model,
      modelId: isComponentsAndAccessories ? 0 : modelId,
      condition,
      conditionId,
      location,
      locationId,
      description,
    };

    console.log("Form Data:", formData);

    dispatch(setDetails(formData));

    if (isComponentsAndAccessories) {
      router.push("/chooseType");
    } else {
      router.push("/set");
    }
  };


  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <View>
        <Link href="/category" asChild>
          <TouchableOpacity>
            <Image source={require("../../assets/images/left.png")} />
          </TouchableOpacity>
        </Link>
        <View className="items-center -mt-6">
          <Text className="text-black font-semibold text-lg">
            Tell us about your PC
          </Text>
        </View>
      </View>

      <View className="border border-gray-200 p-3 mb-4 shadow-sm mt-10">
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          className="text-base text-black"
        />
      </View>

      {!isComponentsAndAccessories && (
        <>
          <View className="border border-gray-200 mb-4">
            <Picker
              selectedValue={brand}
              onValueChange={(itemValue, index) => {
                const selected = brands[index - 1];
                setBrand(itemValue);
                setBrandId(selected?.id ?? null);
                setModel("");
              }}
            >
              <Picker.Item label="Brand" value="" />
              {brands.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item.name} />
              ))}
            </Picker>
          </View>

          <View className="border border-gray-200 mb-4">
            <Picker
              selectedValue={model}
              onValueChange={(itemValue, index) => {
                const selected = models[index - 1];
                setModel(itemValue);
                setModelId(selected?.id ?? null);
              }}
              enabled={models.length > 0}
            >
              <Picker.Item label="Model" value="" />
              {models.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item.name} />
              ))}
            </Picker>
          </View>
        </>
      )}

      <View className="border border-gray-200 mb-4">
        <Picker
          selectedValue={condition}
          onValueChange={(itemValue, index) => {
            const selected = conditions[index - 1];
            setCondition(itemValue);
            setConditionId(selected?.id ?? null);
          }}
        >
          <Picker.Item label="Condition" value="" />
          {conditions.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View>

      <View className="border border-gray-200 mb-4">
        <Picker
          selectedValue={location}
          onValueChange={(itemValue, index) => {
            const selected = locations[index - 1];
            setLocation(itemValue);
            setLocationId(selected?.id ?? null);
          }}
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
          value={description}
          onChangeText={setDescription}
          className="text-base text-black"
        />
      </View>

      <TouchableOpacity onPress={handleNext}>
        <Image
          source={require("../../assets/images/next1.png")}
          className="ml-20"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Tell;
