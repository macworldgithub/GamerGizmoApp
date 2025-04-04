import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import file from "./app/(tabs)/favorite"; 
import myprofile from "./app/(tabs)/myprofile";
import login from "./app/(tabs)/login";
import create from "./app/(tabs)/create";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfileScreen" component={file} />
        <Stack.Screen name="ProfileForm" component={myprofile} />
      </Stack.Navigator>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
