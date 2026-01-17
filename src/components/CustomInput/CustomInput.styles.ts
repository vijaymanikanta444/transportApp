import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    position: 'relative',
  },
  inputWrapper: {
    position: 'relative',
    marginTop: 12,
  },
  label: {
    position: 'absolute',
    left: 14,
    top: -8,
    paddingHorizontal: 4,
    backgroundColor: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    zIndex: 1,
  },
  labelFocused: {
    color: '#2563EB',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingTop: 18,
    paddingBottom: 12,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: '#2563EB',
  },
  errorInput: {
    borderColor: '#DC2626',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    marginTop: 8,
  },
});
