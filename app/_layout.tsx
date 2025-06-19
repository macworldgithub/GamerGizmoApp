import "../global.css";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store, persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { StripeProvider } from "@stripe/stripe-react-native";
import { STRIPE_PUBLISHABLE_KEY } from "@/utils/config"; 

export default function RootLayout() {
  return (
    <StripeProvider
      publishableKey={STRIPE_PUBLISHABLE_KEY}
      merchantIdentifier="com.gamergizmo"
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack screenOptions={{ headerShown: false }} />
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
}
