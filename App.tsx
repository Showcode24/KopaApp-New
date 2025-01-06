import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

import { Onboarding } from './screens/Onboarding';
import { Register } from './screens/Register';
import { SignIn } from './screens/SignIn';
import { ForgotPassword } from './screens/ForgotPassword';
import { COLORS } from './constants/theme';
import { TabNavigator } from './navigation/TabNavigator';
import HomeScreen from './screens/HomeScreen';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCQ-rlEJGzXgfcpnH3vfmi1i8V_v2AUa1A",
  authDomain: "kopa360-db3ad.firebaseapp.com",
  projectId: "kopa360-db3ad",
  storageBucket: "kopa360-db3ad.appspot.com",
  messagingSenderId: "905234000073",
  appId: "1:905234000073:web:b60d20360327b2caed4c6a",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const Stack = createNativeStackNavigator();

function RootStack({ isNewUser, user }: { isNewUser: boolean; user: User | null }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isNewUser && (
        <>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
      {!user && (
        <>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </>
      )}
      {user && (
        <>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />        
        </>
      )}
    </Stack.Navigator>
  );
}


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
        setIsNewUser(onboardingCompleted !== 'true');
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setUser(firebaseUser);
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          setIsNewUser(!userDoc.exists());
        } else {
          setUser(null);
          await checkOnboardingStatus();
        }
      } catch (error) {
        console.error('Error in onAuthStateChanged:', error);
        setIsNewUser(true);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack isNewUser={isNewUser} user={user} />
    </NavigationContainer>
  );
}
