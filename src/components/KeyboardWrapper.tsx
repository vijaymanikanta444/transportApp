import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const KeyboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardWrapper;
