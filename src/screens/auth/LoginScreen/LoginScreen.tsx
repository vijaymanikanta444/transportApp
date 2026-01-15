import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { styles } from './LoginScreen.styles';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Email validation function
  const validateEmail = (input: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(input);
  };

  const onhandleEmailInput = (input: string) => {
    setEmail(input);
    setError('');
  };

  const handleSendOtp = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    // Navigate to OTP screen with email param
    // navigation.navigate('Otp', { email });
    console.log('OTP sent to:', email);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/college-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>College Transport</Text>
      <Text style={styles.subtitle}>Login with your registered email</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={onhandleEmailInput}
          style={styles.input}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleSendOtp}>
        <Text style={styles.primaryButtonText}>Send OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        // onPress={() => navigation.navigate('Register')}
        onPress={() => console.log('hieer')}
      >
        <Text style={styles.linkText}>New user? Register here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
