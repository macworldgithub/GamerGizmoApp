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
import { Ionicons } from "@expo/vector-icons";

type ProcessorVariant = {
  id: number;
  name: string;
};

type Processor = {
  id: number;
  name: string;
};

const System = () => {
  const [processorVariant, setProcessorVariant] = useState("");
  const [processorVariantId, setProcessorVariantId] = useState<number | null>(null);
  const [processorVariants, setProcessorVariants] = useState<ProcessorVariant[]>([]);

  const [processor, setProcessor] = useState("");
  const [processors, setProcessors] = useState<Processor[]>([]);

  const [ram, setRam] = useState("");
  const [storageType, setStorageType] = useState("");
  const [storage, setStorage] = useState("");
  const [gpu, setGpu] = useState("");
  const [graphics, setGraphics] = useState("");
  const [ports, setPorts] = useState("");

  useEffect(() => {
    const fetchProcessorVariants = async () => {
      try {
        const response = await fetch("https://backend.gamergizmo.com/processor/getProcessorVariant");
        const data = await response.json();
        setProcessorVariants(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch processor variants:", error);
      }
    };

    fetchProcessorVariants();
  }, []);

  useEffect(() => {
    if (processorVariantId !== null) {
      const fetchProcessors = async () => {
        try {
          const response = await fetch(`https://backend.gamergizmo.com/processor/getProcessor?variant=${processorVariantId}`);
          const data = await response.json();
          setProcessors(data?.data || []);
        } catch (error) {
          console.error("Failed to fetch processors:", error);
        }
      };

      fetchProcessors();
    } else {
      setProcessors([]);
    }
  }, [processorVariantId]);

  const handleProcessorVariantChange = (val: string, id: number) => {
    setProcessorVariant(val);
    setProcessorVariantId(id);
    setProcessor(""); // reset processor when variant changes
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6 pb-24">
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-black font-semibold text-lg text-center flex-1 -ml-6">
          System Specifications
        </Text>
      </View>

      <View className="border border-gray-200 mb-4 mt-7">
        <Picker
          selectedValue={processorVariant}
          onValueChange={(val, index) => {
            const selected = processorVariants.find((v) => v.name === val);
            handleProcessorVariantChange(val, selected?.id ?? 0);
          }}
        >
          <Picker.Item label="Processor Variant" value="" />
          {processorVariants.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View>

      <View className="border border-gray-200 mb-4">
        <Picker
          selectedValue={processor}
          onValueChange={(val) => setProcessor(val)}
        >
          <Picker.Item label="Processor" value="" />
          {processors.map((item) => (
            <Picker.Item key={item.id} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View>

      <View className="border border-gray-200 mb-4">
        <Picker selectedValue={ram} onValueChange={(val) => setRam(val)}>
          <Picker.Item label="Ram" value="" />
          <Picker.Item label="4 GB" value="4gb" />
          <Picker.Item label="8 GB" value="8gb" />
          <Picker.Item label="16 GB" value="16gb" />
        </Picker>
      </View>

      <View className="border border-gray-200 mb-4">
        <Picker
          selectedValue={storageType}
          onValueChange={(val) => setStorageType(val)}
        >
          <Picker.Item label="Storage Type" value="" />
          <Picker.Item label="HDD" value="hdd" />
          <Picker.Item label="SSD" value="ssd" />
        </Picker>
      </View>

      <View className="border border-gray-200 mb-4">
        <Picker
          selectedValue={storage}
          onValueChange={(val) => setStorage(val)}
        >
          <Picker.Item label="Storage" value="" />
          <Picker.Item label="256 GB" value="256" />
          <Picker.Item label="512 GB" value="512" />
          <Picker.Item label="1 TB" value="1024" />
        </Picker>
      </View>

      <View className="border border-gray-200 mb-4">
        <Picker selectedValue={gpu} onValueChange={(val) => setGpu(val)}>
          <Picker.Item label="GPU" value="" />
          <Picker.Item label="Integrated" value="integrated" />
          <Picker.Item label="Dedicated" value="dedicated" />
        </Picker>
      </View>

      <TextInput
        placeholder="Graphics"
        value={graphics}
        onChangeText={setGraphics}
        className="border border-gray-200 mb-4 px-4 py-3 text-black"
      />

      <TextInput
        placeholder="Ports"
        value={ports}
        onChangeText={setPorts}
        className="border border-gray-200 mb-6 px-4 py-3 text-black"
      />

      <TouchableOpacity className="items-center -mt-15 mb-10">
        <Image
          source={require("../../assets/images/next1.png")}
          className=" "
          resizeMode="contain"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default System;
