import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { RadioButton } from "react-native-paper";
import {useRouter} from "expo-router";
import DatePicker from "react-native-date-picker";

const myprofile = () => {
  const [dob, setDob] = useState(null);
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState("male");
  const [nationality, setNationality] = useState("");
  const router = useRouter();
  return (
    <View className="p-5 bg-white h-full px-8">
      {/* Header */}
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() =>router.push('/file')}>
          <Image source={require("../../assets/images/arrow.png")} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold ml-24">My Profile</Text>
      </View>

     
      <Text className="text-gray-700 font-semibold mt-5">Profile Name</Text>
      <TextInput
        placeholder="Michel"
        className="border border-gray-300 p-3 rounded-lg mb-3"
      />
      <TextInput
        placeholder="Smith"
        className="border border-gray-300 p-3 rounded-lg mb-3"
      />

    
      <Text className="text-gray-700 font-semibold">Account details</Text>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        className="border border-gray-300 p-3 rounded-lg mb-3"
      >
        {/* <Text className="text-gray-500">
          {dob ? dob.toDateString() : "MM / DD / YYYY"}
        </Text> */}
        <Image
          source={require("../../assets/images/calender.png")}
          className="w-5 h-5"
        />
      </TouchableOpacity>
      {/* <DatePicker
        modal
        open={open}
        date={dob || new Date()}
        mode="date"
        onConfirm={(date) => {
          setOpen(false);
          setDob(date);
        }}
        onCancel={() => setOpen(false)}
      /> */}

      {/* Gender Selection */}
      <Text className="text-gray-700 font-semibold">Gender</Text>
      <View className="flex-row items-center mt-2">
        <RadioButton
          value="male"
          status={gender === "male" ? "checked" : "unchecked"}
          onPress={() => setGender("male")}
          color="#6C63FF"
        />
        <Text className="mr-5">Male</Text>
        <RadioButton
          value="female"
          status={gender === "female" ? "checked" : "unchecked"}
          onPress={() => setGender("female")}
          color="#6C63FF"
        />
        <Text>Female</Text>
      </View>

      {/* Save Button */}
      <TouchableOpacity>
        <Image
          source={require("../../assets/images/save.png")}
          className="mt-12 ml-10"
        />
      </TouchableOpacity>
    </View>
  );
};

export default myprofile;
