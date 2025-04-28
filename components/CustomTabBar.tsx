import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const CustomTabBar = ({ state, descriptors, navigation }: CustomTabBarProps) => {
  const leftTabs = ["home", "favorite"];
  const rightTabs = ["chat", "profile"];

  const renderTab = (tabName: string) => {
    const routeIndex = state.routes.findIndex((r: any) => r.name === tabName);
    const route = state.routes[routeIndex];
    if (!route) return null;

    const { options } = descriptors[route?.key] || {};
    const isFocused = state.index === routeIndex;

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route?.key,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    return (
      <TouchableOpacity
        key={route.key}
        onPress={onPress}
        style={styles.tabButton}
        activeOpacity={0.8}
      >
        <View style={[styles.tabItem, isFocused && styles.activeTabItem]}>
          <Ionicons
            name={getIconName(route.name)}
            size={24}
            color={isFocused ? "#6345ED" : "#888"}
            style={isFocused ? styles.iconShadow : undefined}
          />
          <Text style={[styles.tabLabel, isFocused && styles.activeLabel]}>
            {options?.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.tabBar}>
      {/* Left Tabs */}
      <View style={styles.sideTabs}>
        {leftTabs.map(renderTab)}
      </View>

      {/* Center Button */}
      <View style={styles.centerTab}>
        <TouchableOpacity
          onPress={() => navigation.navigate("placead")}
          activeOpacity={0.8}
        >
          <View style={styles.placeAdButton}>
            <Ionicons name="add" size={30} color="white" />
          </View>
          <Text style={styles.placeAdLabel}>Place an Ad</Text>
        </TouchableOpacity>
      </View>

      {/* Right Tabs */}
      <View style={styles.sideTabs}>
        {rightTabs.map(renderTab)}
      </View>
    </View>
  );
};

const getIconName = (routeName: string) => {
  switch (routeName) {
    case "home":
      return "home-outline";
    case "favorite":
      return "heart-outline";
    case "chat":
      return "chatbubble-ellipses-outline";
    case "profile":
      return "menu-outline";
    default:
      return "ellipse-outline";
  }
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
  },
  sideTabs: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
  },
  centerTab: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconShadow: {
    shadowColor: "#6345ED",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
  },
  tabLabel: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },
  activeLabel: {
    color: "#6345ED",
    fontWeight: "bold",
  },
  placeAdButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6345ED",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    shadowColor: "#6345ED",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  placeAdLabel: {
    fontSize: 12,
    color: "#888",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CustomTabBar;
