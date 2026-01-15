import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { styles } from './SplashScreen.styles';

const SplashScreen = ({ navigation }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // final opacity
      duration: 1500, // 1 second fade
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../../assets/images/college-logo.png')}
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
      <Text style={styles.text}>College Transport</Text>
    </View>
  );
};

export default SplashScreen;
