import { Tabs } from "expo-router";
import CustomTabBar from "@/components/CustomTabBar";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="favorite" options={{ title: "Favorites" }} />
      <Tabs.Screen name="placead" options={{ title: "Place Ad" }} />
      <Tabs.Screen name="chat" options={{ title: "Chat" }} />
      <Tabs.Screen name="profile" options={{ title: "Menu" }} />
    </Tabs>
  );
}
