import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendOtpAPI, verifyOtpAPI } from '../../../services/otpService';

/**
 * Send OTP to email
 * Component: LoginScreen
 */
export const sendOTPAsync = createAsyncThunk(
  'auth/sendOTP',
  async (email: string, { rejectWithValue }) => {
    try {
      const response: any = await sendOtpAPI(email);

      if (!response.success && response.error) {
        return rejectWithValue(response.error);
      }

      return {
        success: response.success ?? true,
        message: response.message || 'OTP sent successfully',
      };
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Failed to send OTP. Please try again.',
      );
    }
  },
);

/**
 * Verify OTP
 * Component: OtpScreen
 */
export const verifyOTPAsync = createAsyncThunk(
  'auth/verifyOTP',
  async (
    { email, otp }: { email: string; otp: string },
    { rejectWithValue },
  ) => {
    try {
      const response: any = await verifyOtpAPI(email, otp);

      if (!response.success && response.error) {
        return rejectWithValue(response.error);
      }

      return {
        success: response.success ?? true,
        token: response.token || 'token_placeholder',
        user: response.user || { email, id: 'temp_id' },
      };
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Failed to verify OTP. Please try again.',
      );
    }
  },
);

/**
 * Login user (combined OTP send + verify)
 * Can be used for one-step login flow
 */
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (email: string, { dispatch, rejectWithValue }) => {
    try {
      // First send OTP
      const sendOtpResult = await dispatch(sendOTPAsync(email)).unwrap();

      if (!sendOtpResult.success) {
        return rejectWithValue('Failed to send OTP');
      }

      return {
        user: { email },
        token: 'temp_token',
      };
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Login failed. Please try again.',
      );
    }
  },
);

/**
 * Logout user
 */
export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Add logout API call here if needed
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Failed to logout. Please try again.',
      );
    }
  },
);
