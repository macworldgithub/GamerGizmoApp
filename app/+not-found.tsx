// import React from 'react';
// import { Link, Stack } from 'expo-router';
// import { StyleSheet } from 'react-native';

// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// export default function NotFoundScreen() {
//   return (
//     <>
//       <Stack.Screen options={{ title: 'Oops!' }} />
//       <ThemedView style={styles.container}>
//         <ThemedText type="title">This screen doesn't exist.</ThemedText>
//         <Link href="/" style={styles.link}>
//           <ThemedText type="link">Go to home screen!</ThemedText>
//         </Link>
//       </ThemedView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   link: {
//     marginTop: 15,
//     paddingVertical: 15,
//   },
// });



import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Link, Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#D946EF" style={styles.loader} />
        <ThemedText type="title" style={styles.message}>
          Loading... Please wait.
        </ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link" style={styles.linkText}>
            Go to home screen!
          </ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loader: {
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: '#D946EF', // text-fuchsia-500
    marginBottom: 20,
  },
  link: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#D946EF',
    borderRadius: 8,
  },
  linkText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
