// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import CustomTabBar from "@/components/CustomTabBar";
// import HomeScreen from "./index"; 
// import Favorite from "./favorite";

// import MenuScreen from "./menu";
// import Chat from "./chat";
// import getStart from "./getStart";
// import login from "./login";
// import Results from "./results";
// import Processor from "./processor";
// import Profile from "./profile";
// import Part from "./part";
// import Model from "./model";
// import MyProfile from "./myprofile";
// import Splash from "./splash";
// import Home from "./home";
// import File from "./file";
// import Create from "./create";

// const Tabs = createBottomTabNavigator();
// <Tabs.Screen
//   name="login"
//   component={login} // Provide the component here
//   options={{ title: "LOGIN" }}
// />;

// export default function MyTabs() {
//   return (
//     // <Tabs.Navigator
//     //   tabBar={(props) => <CustomTabBar {...props} />}
//     //   screenOptions={{
//     //     tabBarActiveTintColor: "#ffd33d", // Active tab color
//     //   }}
//     // >
//     //   <Tabs.Screen
//     //     name="getStart"
//     //     component={getStart} // Provide the component here
//     //     options={{ title: "GetStart" }}
//     //   />
//     //   <Tabs.Screen
//     //     name="splash"
//     //     component={Splash} // Provide the component here
//     //     options={{ title: "Splash" }}
//     //   />
//     //   {/* <Tabs.Screen
//     //     name="login"
//     //     component={login} // Provide the component here
//     //     options={{ title: "LOGIN" }}
//     //   /> */}
//     //   {/* <Tabs.Screen
//     //     name="results"
//     //     component={Results} // Provide the component here
//     //     options={{ title: "RESULTS" }}
//     //   />  */}
//     //   {/* <Tabs.Screen
//     //     name="processor"
//     //     component={Processor} // Provide the component here
//     //     options={{ title: "Processor" }}
//     //   /> */}
//     //   <Tabs.Screen
//     //     name="create"
//     //     component={Create} // Provide the component here
//     //     options={{ title: "Create" }}
//     //   />
//     //   {/* <Tabs.Screen
//     //     name="favorite"
//     //     component={Favorite} // Provide the component here
//     //     options={{ title: "Favorite" }}
//     //   /> */}
//     //   {/* <Tabs.Screen
//     //     name="chat"
//     //     component={Chat} // Provide the component here
//     //     options={{ title: "Chat" }}
//     //   /> */}
//     //   <Tabs.Screen
//     //     name="profile"
//     //     component={Profile} // Provide the component here
//     //     options={{ title: "Profile" }}
//     //   />
//     //   {/* <Tabs.Screen
//     //     name="part"
//     //     component={Part} // Provide the component here
//     //     options={{ title: "Part" }}
//     //   /> */}
//     //   {/* <Tabs.Screen
//     //     name="model"\
//     //     component={Model} // Provide the component here
//     //     options={{ title: "Model" }}
//     //   />  */}
//     //   <Tabs.Screen
//     //     name="myprofile"
//     //     component={MyProfile} // Provide the component here
//     //     options={{ title: "My Profile" }}
//     //   />
//     //   {/* <Tabs.Screen
//     //     name="splash"
//     //     component={Splash} // Provide the component here
//     //     options={{ title: "Splash" }}
//     //   />  */}
//     //   {/* <Tabs.Screen
//     //     name="home"
//     //     component={Home} // Provide the component here
//     //     options={{ title: "Home" }}
//     //   /> */}
//     //   <Tabs.Screen
//     //     name="file"
//     //     component={File} // Provide the component here
//     //     options={{ title: "File" }}
//     //   />
//     // </Tabs.Navigator>

// <Tabs.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
//   <Tabs.Screen name="Home" component={HomeScreen} />
//   <Tabs.Screen name="Favorite" component={Favorite} />
//   <Tabs.Screen name="Create" component={Create} />
//   <Tabs.Screen name="Chat" component={Chat} />
//   <Tabs.Screen name="Menu" component={MenuScreen} />
// </Tabs.Navigator>

//   );
// }



// app/_layout.tsx or wherever your Tabs layout is defined



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
