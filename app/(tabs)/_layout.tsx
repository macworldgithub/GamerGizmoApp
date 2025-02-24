import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "@/components/CustomTabBar";
import HomeScreen from "./index"; // Import your screen components
import FavouritesScreen from "./favourite";
import PlaceAdScreen from "./placead";
import MenuScreen from "./menu";
import ChatScreen from "./chat";

const Tabs = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tabs.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d", // Active tab color
      }}
    >
      <Tabs.Screen
        name="index"
        component={HomeScreen} // Provide the component here
        options={{ title: "Home" }}
      />
      <Tabs.Screen
        name="favourite"
        component={FavouritesScreen}
        options={{
          title: "Favourites",
          tabBarIcon: ({ color, focused }) => (
            //@ts-ignore
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="placead"
        component={PlaceAdScreen} // Provide the component here
        options={{ title: "Place An Ad" }}
      />
      <Tabs.Screen
        name="chat"
        component={MenuScreen} // Provide the component here
        options={{ title: "Chat" }}
      />
      <Tabs.Screen
        name="menu"
        component={MenuScreen} // Provide the component here
        options={{ title: "Menu" }}
      />
    </Tabs.Navigator>
  );
}
