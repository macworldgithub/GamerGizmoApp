import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

//@ts-ignore
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tabButton, isFocused && styles.activeTab]}
          >
            <Ionicons
              name={
                route.name === "placead"
                  ? "add-circle"
                  : "information-circle-outline"
              }
              size={route.name === "placead" ? 70 : 30}
              color={isFocused ? "#ffd33d" : "#888"}
              style={{
                position: route.name === "placead" ? "absolute" : "relative",
                bottom: route.name === "placead" ? 10 : 0, // Adjust the bottom positioning if needed
                right: route.name === "placead" ? 20 : 0,
              }}
            />
            <Text style={[styles.tabLabel, isFocused && styles.activeLabel]}>
              {options.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    backgroundColor: "#222",
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
  tabButton: {
    alignItems: "center",
    padding: 10,
  },
  activeTab: {
    transform: [{ scale: 1.2 }],
  },
  tabLabel: {
    color: "#888",
    fontSize: 12,
    marginBottom: 20,
  },
  activeLabel: {
    color: "#ffd33d",
  },
});

export default CustomTabBar;
