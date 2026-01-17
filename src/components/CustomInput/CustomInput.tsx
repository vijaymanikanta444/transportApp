import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, TextInputProps, Animated } from 'react-native';
import { styles } from './CustomInput.styles';

interface CustomInputProps extends TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'decimal-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search';
  maxLength?: number;
  editable?: boolean;
}

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  keyboardType = 'default',
  maxLength,
  editable = true,
  ...rest
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPositionAnim = useRef(new Animated.Value(0)).current;
  const labelColorAnim = useRef(new Animated.Value(0)).current;

  const labelOpacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shouldAnimate = isFocused || value;
    Animated.parallel([
      Animated.timing(labelPositionAnim, {
        toValue: shouldAnimate ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(labelColorAnim, {
        toValue: shouldAnimate ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(labelOpacityAnim, {
        toValue: shouldAnimate ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isFocused, value, labelPositionAnim, labelColorAnim, labelOpacityAnim]);

  const labelColor = labelColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#64748B', '#2563EB'],
  });

  const labelTransform = {
    translateY: labelPositionAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0],
    }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Animated.Text
          style={[
            styles.label,
            {
              color: labelColor,
              opacity: labelOpacityAnim,
            },
          ]}
        >
          {label}
        </Animated.Text>
        <TextInput
          placeholder={!isFocused && !value ? placeholder : ''}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          maxLength={maxLength}
          editable={editable}
          placeholderTextColor="#999"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            error && styles.errorInput,
          ]}
          {...rest}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default CustomInput;
