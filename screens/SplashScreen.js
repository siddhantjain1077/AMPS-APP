// Import necessary modules and components from React and React Native
import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, ImageBackground } from 'react-native';

// SplashScreen component
const SplashScreen = ({ navigation }) => {
  // useEffect runs once when component mounts
  useEffect(() => {
    // Set a timer to automatically navigate to Login screen after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Replace SplashScreen with Login screen
    }, 2000);

    // Clear timer on unmount to avoid memory leaks
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    // Full-screen background image
    <ImageBackground
      source={require('../assets/splashscreen_bg.jpeg')} // Set splash background
      style={styles.background}
      resizeMode="cover" // Cover the full screen
    >
      <View style={styles.overlay}>
        {/* Centered logo image */}
        <Image
          source={require('../assets/BijliSevaKendra_withoutBG.png')} // App logo
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

// Styles for the SplashScreen
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    // backgroundColor: '#000000ff', // Optional fallback color (currently commented out)
  },
  overlay: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
  },
  logo: {
    width: 390,               // Width of the logo image
    height: 390,              // Height of the logo image
    marginBottom: 20,         // Spacing below the logo (if text added later)
  },
  text: {
    fontSize: 20,             // Font size for text (unused currently)
    color: '#360000ff',       // Text color
    fontWeight: 'bold',       // Bold font
    marginBottom: 0,
  },
});
