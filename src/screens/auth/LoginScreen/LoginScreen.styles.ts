import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1E293B',
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748B',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    textAlign: 'center',
    marginTop: 24,
    color: '#2563EB',
    fontWeight: '500',
  },
});
