import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: CustomTabBarProps) => {
  const tabOrder = ["home", "favorite", "placead", "chat", "profile"];

  return (
    <View style={styles.tabBar}>
      {tabOrder.map((tabName, index) => {
        const routeIndex = state.routes.findIndex(
          (r: any) => r.name === tabName
        );
        const route = state.routes[routeIndex];
        if (!route) return null;

        const { options } = descriptors[route?.key] || {};
        const isFocused = state.index === routeIndex;
        const isPlaceAd = tabName === "placead";

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
            style={isPlaceAd ? styles.placeAdButtonContainer : styles.tabButton}
            activeOpacity={0.8}
          >
            {isPlaceAd ? (
              <View style={styles.placeAdWrapper}>
                <View style={styles.placeAdButton}>
                  <Ionicons name="add" size={30} color="white" />
                </View>
                <Text
                  style={[
                    styles.placeAdLabel,
                    isFocused && styles.activePlaceAd,
                  ]}
                >
                  Place an Ad
                </Text>
              </View>
            ) : (
              <View style={[styles.tabItem, isFocused && styles.activeTabItem]}>
                <Ionicons
                  name={getIconName(route.name)}
                  size={24}
                  color={isFocused ? "#6345ED" : "#888"}
                  style={isFocused ? styles.iconShadow : undefined}
                />
                <Text
                  style={[styles.tabLabel, isFocused && styles.activeLabel]}
                >
                  {options?.title}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
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
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 80,
    backgroundColor: "#fff",
    paddingHorizontal: 3,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 5,
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
  placeAdButtonContainer: {
    position: "absolute",
    bottom: 30,
    left: "50%",
    transform: [{ translateX: -40 }],
    zIndex: 10,
    alignItems: "center",
  },
  placeAdWrapper: {
    alignItems: "center",
  },
  placeAdButton: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: "#6345ED",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6345ED",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  placeAdLabel: {
    marginTop: 6,
    fontSize: 12,
    color: "#888",
    fontWeight: "bold",
  },
  activePlaceAd: {
    color: "#6345ED",
    fontWeight: "bold",
  },
});

export default CustomTabBar;
