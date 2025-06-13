import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { useRouter, useNavigationContainerRef } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import "react-native-url-polyfill/auto";
import { supabase } from "../lib/supabase";
import Auth from "../components/Auth";

import { Session } from "@supabase/supabase-js";

export default function Splash() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  // Wait for the layout to mount before allowing navigation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 100); // Small delay for layout to mount
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1.2) {
          clearInterval(interval);
          return 1.2;
        }
        return prev + 0.08;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Supabase session handling
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Only proceed with routing if both splash screen is ready and progress is complete
    // And if the session has been determined (i.e., not undefined, but null or a session object)
    if (isReady && progress >= 1.2 && session !== undefined) {
      if (session) { // If a session object exists, user is logged in
        router.replace("/home");
      } else { // If session is null, user is not logged in
        router.replace("/getStart");
      }
    }
  }, [isReady, progress, session]); // Depend on session to trigger routing when it changes

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Progress.Bar progress={progress} width={200} color="purple" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 24,
  },
});
