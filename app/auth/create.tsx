import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { Picker } from "@react-native-picker/picker";
// import CheckBox from "@react-native-community/checkbox";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("Select Gender");
  const [dob, setDob] = useState(new Date());
  // const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async () => {
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !username ||
      !gender ||
      !email ||
      !password ||
      !confirmPassword ||
      !acceptTerms
    ) {
      Alert.alert("Error", "All fields are required and Terms must be accepted.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("https://backend.gamergizmo.com/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          username: username.substring(0, 20),
          gender,
          dob: dob.toISOString().split("T")[0],
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Account created successfully!");
        router.push("./otp");
      } else {
        const errorMessage = Array.isArray(data?.message)
          ? data.message[0]
          : data?.message || "Something went wrong";
        Alert.alert("Error", errorMessage);
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-5 py-6">
      <View className="flex-row space-x-2">
        <TextInput
          className="flex-1 bg-violet-100 p-3 rounded-lg mb-3"
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          className="flex-1 bg-violet-100 p-3 rounded-lg mb-3"
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View className="flex-row space-x-2">
        <TextInput
          className="flex-1 bg-violet-100 p-3 rounded-lg mb-3"
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          className="flex-1 bg-violet-100 p-3 rounded-lg mb-3"
          placeholder="User Name"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View className="flex-row space-x-2 mb-3">
        {/* <View className="flex-1 bg-violet-100 rounded-lg">
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={{ height: 50 }}
          >
            <Picker.Item label="Select Gender" value="Select Gender" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View> */}

        <TouchableOpacity
          className="flex-1 bg-violet-100 rounded-lg justify-center px-3"
          // onPress={() => setShowDatePicker(true)}
        >
          <Text>{dob.toDateString()}</Text>
        </TouchableOpacity>
      </View>

      {/* {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === "ios");
            if (selectedDate) setDob(selectedDate);
          }}
        />
      )} */}

      <TextInput
        className="bg-violet-100 p-3 rounded-lg mb-3"
        placeholder="Email Address"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View className="flex-row space-x-2">
        <TextInput
          className="flex-1 bg-violet-100 p-3 rounded-lg mb-3"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          className="flex-1 bg-violet-100 p-3 rounded-lg mb-3"
          placeholder="Re-Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* <View className="flex-row items-center mb-4">
        <CheckBox value={acceptTerms} onValueChange={setAcceptTerms} />
        <Text className="ml-2">
          I accept the{" "}
          <Text className="text-pink-500 underline">Terms and Condition</Text>
        </Text>
      </View> */}

      <TouchableOpacity
        className={`bg-purple-600 p-4 rounded-full items-center ${
          !acceptTerms ? "opacity-50" : ""
        }`}
        disabled={!acceptTerms || loading}
        onPress={handleRegister}
      >
        <Text className="text-white font-bold text-base">
          {loading ? "Registering..." : "Register Now"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}




// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   FlatList,
//   Pressable,
//   Switch,
// } from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { useRouter } from "expo-router";

// export default function RegisterScreen() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [username, setUsername] = useState("");
//   const [gender, setGender] = useState("");
//   const [dob, setDob] = useState(new Date());
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [acceptTerms, setAcceptTerms] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [genderModalVisible, setGenderModalVisible] = useState(false);

//   const router = useRouter();

//   const handleRegister = async () => {
//     if (
//       !firstName ||
//       !lastName ||
//       !phone ||
//       !username ||
//       !gender ||
//       !email ||
//       !password ||
//       !confirmPassword ||
//       !acceptTerms
//     ) {
//       Alert.alert("Error", "All fields are required and Terms must be accepted.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch("https://backend.gamergizmo.com/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           firstName,
//           lastName,
//           phone,
//           username: username.substring(0, 20),
//           gender,
//           dob: dob.toISOString().split("T")[0],
//           email,
//           password,
//           confirmPassword,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert("Success", "Account created successfully!");
//         router.push("./otp");
//       } else {
//         const errorMessage = Array.isArray(data?.message)
//           ? data.message[0]
//           : data?.message || "Something went wrong";
//         Alert.alert("Error", errorMessage);
//       }
//     } catch (error) {
//       Alert.alert("Error", "Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View className="flex-1 bg-white px-5 py-6">
//       <View className="flex-row space-x-2">
//         <TextInput
//           className="flex-1 bg-violet-100 p-3 rounded-lg mb-3"
//           placeholder="First Name"
//           value={firstName}
//           onChangeText={setFirstName}
//         />
//         <TextInput
//           className="flex-1 bg-violet-100 p-3 rounded-lg mb-3"
//           placeholder="Last Name"
//           value={lastName}
//           onChangeText={setLastName}
//         />
//       </View>

//       <View className="flex-row space-x-2">
//         <TextInput
//           className="flex-1 bg-violet-100 p-3 rounded-lg mb-3"
//           placeholder="Phone Number"
//           keyboardType="phone-pad"
//           value={phone}
//           onChangeText={setPhone}
//         />
//         <TextInput
//           className="flex-1 bg-violet-100 p-3 rounded-lg mb-3"
//           placeholder="User Name"
//           value={username}
//           onChangeText={setUsername}
//         />
//       </View>

//       <View className="flex-row space-x-2 mb-3">
//         <TouchableOpacity
//           className="flex-1 bg-violet-100 rounded-lg justify-center px-3 py-3"
//           onPress={() => setGenderModalVisible(true)}
//         >
//           <Text>{gender || "Select Gender"}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           className="flex-1 bg-violet-100 rounded-lg justify-center px-3 py-3"
//           onPress={() => setDatePickerVisibility(true)}
//         >
//           <Text>{dob.toDateString()}</Text>
//         </TouchableOpacity>
//       </View>

//       <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="date"
//         maximumDate={new Date()}
//         onConfirm={(date) => {
//           setDob(date);
//           setDatePickerVisibility(false);
//         }}
//         onCancel={() => setDatePickerVisibility(false)}
//       />

//       <Modal visible={genderModalVisible} transparent animationType="slide">
//         <View className="flex-1 justify-end bg-black bg-opacity-30">
//           <View className="bg-white rounded-t-2xl p-4">
//             <FlatList
//               data={["Male", "Female", "Other"]}
//               keyExtractor={(item) => item}
//               renderItem={({ item }) => (
//                 <Pressable
//                   className="p-3 border-b border-gray-300"
//                   onPress={() => {
//                     setGender(item);
//                     setGenderModalVisible(false);
//                   }}
//                 >
//                   <Text className="text-base">{item}</Text>
//                 </Pressable>
//               )}
//             />
//             <TouchableOpacity
//               className="mt-4 items-center"
//               onPress={() => setGenderModalVisible(false)}
//             >
//               <Text className="text-red-500 font-bold">Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       <TextInput
//         className="bg-violet-100 p-3 rounded-lg mb-3"
//         placeholder="Email Address"
//         keyboardType="email-address"
//         value={email}
//         onChangeText={setEmail}
//       />

//       <View className="flex-row space-x-2">
//         <TextInput
//           className="flex-1 bg-violet-100 p-3 rounded-lg mb-3"
//           placeholder="Password"
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />
//         <TextInput
//           className="flex-1 bg-violet-100 p-3 rounded-lg mb-3"
//           placeholder="Re-Password"
//           secureTextEntry
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//         />
//       </View>

//       <View className="flex-row items-center mb-4">
//         <Switch
//           value={acceptTerms}
//           onValueChange={setAcceptTerms}
//           trackColor={{ false: "#ccc", true: "#a855f7" }}
//           thumbColor={acceptTerms ? "#fff" : "#f4f3f4"}
//         />
//         <Text className="ml-2">
//           I accept the{" "}
//           <Text className="text-pink-500 underline">Terms and Condition</Text>
//         </Text>
//       </View>

//       <TouchableOpacity
//         className={`bg-purple-600 p-4 rounded-full items-center ${
//           !acceptTerms ? "opacity-50" : ""
//         }`}
//         disabled={!acceptTerms || loading}
//         onPress={handleRegister}
//       >
//         <Text className="text-white font-bold text-base">
//           {loading ? "Registering..." : "Register Now"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
