import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    Platform,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { API_BASE_URL } from "@/utils/config";
import { Image } from "react-native";

import { useDispatch } from "react-redux";
import { setDetails } from "../../store/slice/adSlice";

const ChooseType = () => {
    const [type, setType] = useState("");
    const dispatch = useDispatch();
    const [componentType, setComponentType] = useState(""); // name
    const [componentTypeId, setComponentTypeId] = useState<number | null>(null); // id
    const [accessoryType, setAccessoryType] = useState("");
    const [componentCategories, setComponentCategories] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (type === "components") {
            axios
                .get(`${API_BASE_URL}/component-category/getAll?pageNo=1`)
                .then((res) => {
                    const fetched = res.data?.data || [];
                    setComponentCategories(fetched);
                })
                .catch((e) => console.error("Component categories error:", e));
        }
    }, [type]);

    const handleNext = () => {
        if (type === "") {
            return ToastAndroid.show("Please select a type.", ToastAndroid.SHORT);
        }

        if (type === "components" && (!componentType || !componentTypeId)) {
            return ToastAndroid.show("Please select component category.", ToastAndroid.SHORT);
        }

        if (type === "accessories" && !accessoryType.trim()) {
            return ToastAndroid.show("Please enter accessory type.", ToastAndroid.SHORT);
        }

        dispatch(
            setDetails({
                itemType: type as "" | "accessories" | "components",
                componentType: type === "components" ? componentType : undefined,
                componentTypeId: type === "components" ? componentTypeId! : 0, 
                accessoryType: type === "accessories" ? accessoryType : undefined,
            })
        );

        console.log({
            itemType: type,
            componentType,
            componentTypeId,
            accessoryType,
        });

        router.push("/set");
    };

    return (
        <ScrollView className="flex-1 bg-white px-4 py-6">
            <Text className="text-lg font-semibold mb-2">Choose Type: Component or Accessories</Text>
            <View className="border border-gray-300 mb-4">
                <Picker selectedValue={type} onValueChange={(value) => setType(value)}>
                    <Picker.Item label="Type" value="" />
                    <Picker.Item label="Components" value="components" />
                    <Picker.Item label="Accessories" value="accessories" />
                </Picker>
            </View>

            {type === "components" && (
                <View className="border border-gray-300 mb-4">
                    <Picker
                        selectedValue={componentTypeId}
                        onValueChange={(value) => {
                            const selected = componentCategories.find((item: any) => item.id === value);
                            //@ts-ignore
                            setComponentType(selected?.name || "");
                            setComponentTypeId(value);
                        }}
                    >
                        <Picker.Item label="Category" value="" />
                        {componentCategories.map((item: any) => (
                            <Picker.Item key={item.id} label={item.name} value={item.id} />
                        ))}
                    </Picker>
                </View>
            )}

            {type === "accessories" && (
                <View className="border border-gray-300 mb-4">
                    <TextInput
                        placeholder="Accessory Type"
                        value={accessoryType}
                        onChangeText={setAccessoryType}
                        className="text-base text-black p-2"
                    />
                </View>
            )}

            <TouchableOpacity onPress={handleNext}>
                <Image
                    source={require("../../assets/images/next1.png")}
                    className="ml-20"
                />
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ChooseType;
