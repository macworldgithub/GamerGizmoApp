import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UploadImageScreen from './app/(tabs)/image';
import ViewDetails from './app/(tabs)/ViewDetails';
import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'

const Stack = createNativeStackNavigator();

export default function App() {
   const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  return (
    <NavigationContainer>
       <Auth />
      <Stack.Navigator initialRouteName="UploadImage">
        <Stack.Screen name="UploadImage" component={UploadImageScreen} />
        <Stack.Screen name="ViewDetails" component={ViewDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
