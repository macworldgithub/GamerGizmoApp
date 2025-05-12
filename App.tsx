import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UploadImageScreen from "./app/(tabs)/uploadImage";
import ViewDetails from "./app/(tabs)/ViewDetails";
import Toast from "react-native-toast-message";
// import Login from "./app/auth/login";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="UploadImage">
          <Stack.Screen name="UploadImage" component={UploadImageScreen} />
          <Stack.Screen name="ViewDetails" component={ViewDetails} />
          {/* <Stack.Screen name="Login" component={Login} /> */}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
