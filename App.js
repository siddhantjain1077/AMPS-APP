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
import LoginScreen from './screens/LoginScreen';
import ForgetScreen from './screens/ForgetScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import DrawerNavigator from './Navigation/DrawerNavigator';
import SplashScreen from './screens/SplashScreen';

// Theme context and utilities
import { ThemeProvider } from './screens/ThemeContext';
import NetworkGuard from './components/NetworkGuard';
import { decodeJWT } from './utils/jwt';

// Enable native screen optimization for better performance
enableScreens();

// Ignore all log warnings (use cautiously in development)
LogBox.ignoreAllLogs(false);

// Create a stack navigator instance
const Stack = createNativeStackNavigator();

export default function App() {
  // Ref to programmatically control navigation (for logout, etc.)
  const navigationRef = useRef();

  // Hide native splash screen once app is ready
  useEffect(() => {
    RNBootSplash.hide(); // ✅ Hide native boot splash when app loads
  }, []);

  // Handle token expiry on app load and when app comes to foreground
  useEffect(() => {
    const checkTokenExpiry = async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        const decoded = decodeJWT(token); // Decode JWT token to check expiry

        if (decoded?.exp) {
          const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
          
          if (currentTime >= decoded.exp) {
            // If token expired
            await AsyncStorage.multiRemove(['token', 'tokenExpiry']); // Clear token from storage
            Alert.alert('Session Expired', 'Please log in again.');

            // Reset navigation to Login screen
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

    // Initial check on load
    checkTokenExpiry();

    // Check token again when app is brought back to foreground
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') checkTokenExpiry();
    });

    // Clean up the event listener
    return () => subscription.remove();
  }, []);

  return (
    // Gesture handler is required at root level for handling navigation gestures
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Wrap app in ThemeProvider to enable dark/light/system theme support */}
      <ThemeProvider>
        {/* NetworkGuard component handles connectivity check and UI fallback */}
        <NetworkGuard>
          {/* Main navigation container for the app */}
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              initialRouteName="SplashScreen"
              screenOptions={{ headerShown: false }} // Hide headers globally
            >
              {/* All screens registered here */}
              <Stack.Screen 
              name="SplashScreen" 
              component={SplashScreen} />
              <Stack.Screen 
              name="Login" 
              component={LoginScreen} />
              <Stack.Screen 
              name="Forget" 
              component={ForgetScreen} />
              <Stack.Screen 
              name="Home" 
              component={HomeScreen} />
              <Stack.Screen 
              name="Details" 
              component={DetailScreen} />
              <Stack.Screen 
              name="DrawerNavigator" 
              component={DrawerNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </NetworkGuard>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
