// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQ_aPGXwpshJrfQFFBvaAj9VCx6RIZLhU",
  authDomain: "gamergizmo-e9d00.firebaseapp.com",
  projectId: "gamergizmo-e9d00",
  storageBucket: "gamergizmo-e9d00.appspot.com",
  messagingSenderId: "100147817359",
  appId: "1:100147817359:android:2d484e70a04f8fa79ef9fa",
};

const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
