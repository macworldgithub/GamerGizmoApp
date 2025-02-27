import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
export default function Page() {

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Link href="/about">Go to About screen</Link>
        <Text className="text-6xl font-bold underline text-red-700">Hello World</Text>
        <Text className="text-2xl text-green-700">This is Anas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
