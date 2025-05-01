import React, { useState, useCallback, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { API_BASE_URL } from "@/utils/config";
import axios from "axios";
import { useRouter } from "expo-router"; // ✅ useRouter instead of navigation

const Placead = () => {
  const [visible, setVisible] = useState(false);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅

  useFocusEffect(
    useCallback(() => {
      setVisible(true);
    }, [])
  );

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/location/getAll`);
        if (response.data?.data) {
          setCities(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleCitySelect = (city: any) => {
    console.log("Selected city:", city);
    setVisible(false);

   
    router.push({
      pathname: "/category",
      params: { city },
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView className="flex-1 bg-white">
       
        <View className="border-b border-gray-200 pb-4">
          <View className="px-4 mt-4 py-4 flex-row items-center">
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                source={require("../../assets/images/cross.png")}
                className="w-5 h-5"
              />
            </TouchableOpacity>
            <View className="flex-1 items-center -ml-5">
              <Text className="text-black font-semibold text-lg">
                Select a City
              </Text>
              <Text className="text-gray-400 text-sm">
                Where should we place your ad?
              </Text>
            </View>
          </View>
        </View>

        {/* City List */}
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <ScrollView>
            {cities.map((city: any) => (
              <TouchableOpacity
                key={city.id}
                className="border-b border-gray-200 px-4 py-4"
                onPress={() => handleCitySelect(city.name)}
              >
                <Text className="text-black text-base ml-2">{city.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default Placead;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   SafeAreaView,
//   ActivityIndicator,
// } from "react-native";
// import { API_BASE_URL } from "@/utils/config";
// import axios from "axios";

// const Placead = ({ navigation }: any) => {
//   const [cities, setCities] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/location/getAll`);
//         if (response.data?.data) {
//           setCities(response.data.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch cities:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCities();
//   }, []);

//   const handleCitySelect = (cityName: string) => {
//     navigation.navigate("Category", { city: cityName });
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       {/* Header */}
//       <View className="border-b border-gray-200 pb-4">
//         <View className="px-4 mt-4 py-4 flex-row items-center">
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Image
//               source={require("../../assets/images/cross.png")}
//               className="w-5 h-5"
//             />
//           </TouchableOpacity>
//           <View className="flex-1 items-center -ml-5">
//             <Text className="text-black font-semibold text-lg">
//               Select a City
//             </Text>
//             <Text className="text-gray-400 text-sm">
//               Where should we place your ad?
//             </Text>
//           </View>
//         </View>
//       </View>

//       {/* City List */}
//       {loading ? (
//         <View className="flex-1 justify-center items-center">
//           <ActivityIndicator size="large" color="#000" />
//         </View>
//       ) : (
//         <ScrollView>
//           {cities.map((city: any) => (
//             <TouchableOpacity
//               key={city.id}
//               className="border-b border-gray-200 px-4 py-4"
//               onPress={() => handleCitySelect(city.name)}
//             >
//               <Text className="text-black text-base ml-2">{city.name}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       )}
//     </SafeAreaView>
//   );
// };

// export default Placead;
