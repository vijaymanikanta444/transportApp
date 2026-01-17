import { RootState } from '../../types';

/**
 * Auth State Selectors
 * Use these in components instead of accessing state directly
 * Benefits: Centralized state shape logic, easier to refactor
 */

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const selectUser = (state: RootState) => state.auth.user;

export const selectToken = (state: RootState) => state.auth.token;

export const selectAuthLoading = (state: RootState) => state.auth.loading;

export const selectAuthError = (state: RootState) => state.auth.error;

export const selectOtpSent = (state: RootState) => state.auth.otpSent;

export const selectOtpVerified = (state: RootState) => state.auth.otpVerified;

/**
 * Derived Selectors
 * Combine multiple state values for specific use cases
 */

export const selectUserEmail = (state: RootState) => state.auth.user?.email;

export const selectAuthStatus = (state: RootState) => {
  if (state.auth.loading) return 'loading';
  if (state.auth.error) return 'error';
  if (state.auth.isLoggedIn) return 'authenticated';
  return 'unauthenticated';
};
