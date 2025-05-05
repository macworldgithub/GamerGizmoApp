import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

const Favorite = () => {
  return (
    <ScrollView>
      <View className="bg-white w-full h-full">
        <View className="border-b border-gray-200 pb-4">
          <View className="px-4  py-4 flex-row items-center">
            <TouchableOpacity>
              <Image source={require("../../assets/images/left.png")} />
            </TouchableOpacity>
            <View className="flex-1 items-center -ml-48">
              <Text className="text-black font-semibold text-lg">Favorite</Text>
            </View>
          </View>
        </View>
        <View className="items-center justify-center p-6">
          <View className="flex-row items-center justify-between w-full mb-6">
            <Text className="text-xl font-bold text-black">All Favorite</Text>
            <Image
              source={require("../../assets/images/default.png")}
              className="mr-40"
            />
          </View>

          <Image source={require("../../assets/images/favorite.png")} />

          <Text className="text-lg font-bold text-black text-center mt-12">
            You have no favorites saved on this list
          </Text>
          <Text className="text-gray-500 text-center mt-2 px-6">
            Use the favorite icon to save ads that you want to check later
          </Text>

          <TouchableOpacity className="bg-white border border-gray-400 px-6 py-3 rounded-md mt-6">
            <Text className="text-black font-semibold">Continue Searching</Text>
          </TouchableOpacity>

          <View className="flex items-center justify-center w-screen h-72 bg-purple-100 mt-6 p-4">
            <View className="bg-white p-4 rounded-xl shadow-lg w-72">
              <Text className="text-sm font-bold text-center text-black">
                Create Your First Personalized List
              </Text>
              <Text className="text-gray-500 text-center mt-2">
                Organize Your Favorites
              </Text>
              <Text className="text-gray-500 text-center mt-1">
                Invite friends to view or collaborate on your list
              </Text>
              <TouchableOpacity className=" mt-4 ml-16">
                <Image source={require("../../assets/images/list.png")} />
                {/* <Text className="text-center text-white font-medium">
                  Make A List
                </Text> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Favorite;
