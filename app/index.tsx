import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Splash() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

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
    if (progress >= 1.2) {
      router.replace('/getStart');
    }
  }, [progress]);

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


