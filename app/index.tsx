import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { useRouter, useNavigationContainerRef } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from "react-redux";

export default function Splash() {
  const router = useRouter();
  const token = useSelector((state: any) => state?.user?.token);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

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

  useEffect(() => {
    if (isReady && progress >= 1.2) {
      if (token) {
        router.replace("/home");
      } else {
        router.replace("/getStart");
      }
    }
  }, [isReady, progress]);

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 24,
  },
});
