// Re-export everything from auth slice
export { default as authReducer } from './authSlice';
export { clearError, resetOtpState } from './authSlice';
export type { AuthState } from './authSlice';

// Re-export actions
export {
  sendOTPAsync,
  verifyOTPAsync,
  loginAsync,
  logoutAsync,
} from './authActions';

// Re-export selectors
export {
  selectIsLoggedIn,
  selectUser,
  selectToken,
  selectAuthLoading,
  selectAuthError,
  selectOtpSent,
  selectOtpVerified,
  selectUserEmail,
  selectAuthStatus,
} from './authSelectors';
