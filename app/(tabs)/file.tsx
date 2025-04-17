// import { View, Text, TouchableOpacity, Image } from "react-native";

// export default function file() {
//   return (
//     <View className="flex-1 bg-white">
//       {/* Header */}
//       <View className="flex-row items-center p-4 border-b border-gray-200 mt-3">
//         <TouchableOpacity>
//           <Image source={require("../../assets/images/arrow.png")} />
//         </TouchableOpacity>
//         <Text className="text-lg font-semibold ml-32">Profile</Text>
//       </View>

//       {/* Category List */}
//       <View className="mt-2">
//         <TouchableOpacity className="p-4 border-b border-gray-200">
//           <Text className="text-sm text-black ml-4 font-semibold">
//             My Profile
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity className="p-4 border-b border-gray-200">
//           <Text className="text-sm text-black ml-4 font-semibold">
//             My Public Profile
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from 'expo-router'
export default function ProfileScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200 mt-3">
        <TouchableOpacity>
          <Image source={require("../../assets/images/arrow.png")} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold ml-32">Profile</Text>
      </View>

      {/* Category List */}
      <View className="mt-2">
        <TouchableOpacity
        onPress={() => router.push('/myprofile')}
          className="p-4 border-b border-gray-200"
          
        >
          <Text className="text-sm text-black ml-4 font-semibold">
            My Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="p-4 border-b border-gray-200">
          <Text className="text-sm text-black ml-4 font-semibold">
            My Public Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
