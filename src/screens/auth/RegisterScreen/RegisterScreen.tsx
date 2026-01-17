import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { styles } from './RegisterScreen.styles';
import { registerUser } from '../../../services/userService';
import CustomInput from '../../../components/CustomInput';

type RegisterScreenProps = {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
  };
};

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phoneNumber?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // Validation functions
  const validateEmail = (input: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(input);
  };

  const validatePhoneNumber = (input: string) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(input);
  };

  const validateForm = () => {
    const newErrors: {
      fullName?: string;
      email?: string;
      phoneNumber?: string;
    } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    setServerError('');

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      await registerUser(email);
      // Navigate to login screen with email
      navigation.navigate('Login');
    } catch (error) {
      console.log('Registration error:', error);
      setServerError('Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'fullName') setFullName(value);
    if (field === 'email') setEmail(value);
    if (field === 'phoneNumber') setPhoneNumber(value);

    // Clear error for this field
    setErrors(prev => ({ ...prev, [field]: undefined }));
    setServerError('');
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      )}

      <Image
        source={require('../../../assets/images/college-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Register to book your rides</Text>

      <View style={styles.inputContainer}>
        <CustomInput
          label="Full Name"
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={value => handleInputChange('fullName', value)}
          error={errors.fullName}
          editable={!isLoading}
        />

        <CustomInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={value => handleInputChange('email', value)}
          keyboardType="email-address"
          error={errors.email}
          editable={!isLoading}
        />

        <CustomInput
          label="Phone Number"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={value => handleInputChange('phoneNumber', value)}
          keyboardType="phone-pad"
          maxLength={10}
          error={errors.phoneNumber}
          editable={!isLoading}
        />

        {serverError ? (
          <Text style={styles.errorText}>{serverError}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={[
          styles.primaryButton,
          isLoading && styles.primaryButtonDisabled,
        ]}
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Text style={styles.primaryButtonText}>
          {isLoading ? 'Registering...' : 'Register'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.goBack()}
        disabled={isLoading}
      >
        <Text style={styles.secondaryButtonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
