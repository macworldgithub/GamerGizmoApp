// import React from "react";
// import { View, Text, TouchableOpacity, ScrollView } from "react-native";
// import { useSelector } from "react-redux";
// import { useRouter } from "expo-router";

// const UserInfoScreen = () => {
//   const router = useRouter();

//   // Select user details from Redux
//   const {
//     first_name,
//     last_name,
//     phone,
//     dob,
//     gender,
//     address,
//   } = useSelector((state: any) => state.user); // 🔁 Adjust slice name if not `user`

//   return (
//     <ScrollView className="flex-1 bg-white px-4 py-6">
//       <Text className="text-xl font-bold text-black mb-4">My Profile</Text>

//       <View className="space-y-4">
//         <Text className="text-base text-black">
//           <Text className="font-semibold">First Name: </Text>{first_name || "N/A"}
//         </Text>

//         <Text className="text-base text-black">
//           <Text className="font-semibold">Last Name: </Text>{last_name || "N/A"}
//         </Text>

//         <Text className="text-base text-black">
//           <Text className="font-semibold">Phone: </Text>{phone || "N/A"}
//         </Text>

//         <Text className="text-base text-black">
//           <Text className="font-semibold">Date of Birth: </Text>{dob || "N/A"}
//         </Text>

//         <Text className="text-base text-black">
//           <Text className="font-semibold">Gender: </Text>{gender || "N/A"}
//         </Text>

//         <Text className="text-base text-black">
//           <Text className="font-semibold">Address: </Text>{address || "N/A"}
//         </Text>
//       </View>

//       <TouchableOpacity
//         onPress={() => router.push("/myprofile")} // 🔁 replace with your edit screen route
//         className="bg-blue-600 mt-10 py-3 rounded-lg items-center"
//       >
//         <Text className="text-white font-semibold">Edit</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default UserInfoScreen;


import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";

const UserInfoScreen = () => {
  const router = useRouter();

  const {
    first_name,
    last_name,
    phone,
    dob,
    profile,
    gender,
    address,
  } = useSelector((state: any) => state.user);
// console.log(profile,"any")
  return (
    <ScrollView className="flex-1 bg-white px-5 pt-5">
      {/* Header */}
      <View className="flex-row items-center pb-4 mb-4">
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Image source={require("../../assets/images/arrow.png")} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold ml-28">My Profile</Text>
      </View>

      {/* Profile Avatar & Name */}
      <View className="items-center mb-6">
        <Image
     src={profile}
          className="w-20 h-20 rounded-full mb-2"
        />
        <Text className="text-xl font-semibold text-black">
          {first_name || "User"} {last_name || ""}
        </Text>
      </View>

      {/* Profile Details Cards */}
      <View className="space-y-4">
        <ProfileCard label="Phone" value={phone} />
        <ProfileCard label="Date of Birth" value={dob} />
        <ProfileCard label="Gender" value={gender} />
        <ProfileCard label="Address" value={address} />
      </View>

      {/* Edit Button */}
      <View className="mt-10 items-center">
        <TouchableOpacity
          onPress={() => router.push("/myprofile")}
          className="bg-purple-700 px-6 py-3 rounded-full shadow-md w-1/2 items-center"
        >
          <Text className="text-white font-bold text-base">Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Beautiful card-style field display
const ProfileCard = ({ label, value }: { label: string; value: string | null }) => (
  <View className="bg-gray-50 p-4 rounded-2xl shadow-sm">
    <Text className="text-sm text-gray-500 mb-1">{label}</Text>
    <Text className="text-base text-black font-medium">{value || "N/A"}</Text>
  </View>
);

export default UserInfoScreen;
