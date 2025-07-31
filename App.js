// React and React Native core imports
import React, { useEffect, useRef } from 'react';
import { Alert, AppState, LogBox } from 'react-native';
//hi this is a comment
// AsyncStorage to store and retrieve tokens
import AsyncStorage from '@react-native-async-storage/async-storage';

// Native splash screen hiding support
import RNBootSplash from 'react-native-splash-screen';

// React Navigation core libraries
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens'; // Improve performance by using native screens

// Screens used in the app
import LoginScreen from './src/screens/LoginScreen';
import ForgetScreen from './src/screens/ForgetScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import DrawerNavigator from './src/Navigation/DrawerNavigator';
import SplashScreen from './src/screens/SplashScreen';

// Theme context and utilities
import { ThemeProvider } from './src/screens/ThemeContext';
import NetworkGuard from './src/components/NetworkGuard';
import { decodeJWT } from './src/utils/jwt';

enableScreens(); // Enable native screen optimization

LogBox.ignoreAllLogs(false); // Disable in production

const Stack = createNativeStackNavigator();

export default function App() {
  const navigationRef = useRef();

  useEffect(() => {
    RNBootSplash.hide(); // ✅ Hide native boot splash when app loads
  }, []);

  useEffect(() => {
    const checkTokenExpiry = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decoded = decodeJWT(token);
        if (decoded?.exp) {
          const currentTime = Math.floor(Date.now() / 1000);
          if (currentTime >= decoded.exp) {
            await AsyncStorage.multiRemove(['token', 'tokenExpiry']);
            Alert.alert('Session Expired', 'Please log in again.');
            if (navigationRef.current) {
              navigationRef.current.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            }
          }
        }
      }
    };

    checkTokenExpiry();
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') checkTokenExpiry();
    });

    return () => subscription.remove();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <NetworkGuard>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              initialRouteName="SplashScreen"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Forget" component={ForgetScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Details" component={DetailScreen} />
              <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </NetworkGuard>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
