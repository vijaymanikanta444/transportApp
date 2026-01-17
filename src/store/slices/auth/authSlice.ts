import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  sendOTPAsync,
  verifyOTPAsync,
  loginAsync,
  logoutAsync,
} from './authActions';

export interface AuthState {
  isLoggedIn: boolean;
  user: {
    id?: string;
    email?: string;
    name?: string;
    approved?: boolean;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
  otpVerified: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
  loading: false,
  error: null,
  otpSent: false,
  otpVerified: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    resetOtpState: state => {
      state.otpSent = false;
      state.otpVerified = false;
    },
  },
  extraReducers: builder => {
    // Send OTP
    builder
      .addCase(sendOTPAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        sendOTPAsync.fulfilled,
        (
          state,
          action: PayloadAction<{ success: boolean; message: string }>,
        ) => {
          state.loading = false;
          state.otpSent = action.payload.success;
        },
      )
      .addCase(sendOTPAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.otpSent = false;
      });

    // Verify OTP
    builder
      .addCase(verifyOTPAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        verifyOTPAsync.fulfilled,
        (
          state,
          action: PayloadAction<{ success: boolean; token: string; user: any }>,
        ) => {
          state.loading = false;
          state.otpVerified = action.payload.success;
          if (action.payload.success) {
            state.token = action.payload.token;
            state.user = action.payload.user;
          }
        },
      )
      .addCase(verifyOTPAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.otpVerified = false;
      });

    // Login
    builder
      .addCase(loginAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginAsync.fulfilled,
        (state, action: PayloadAction<{ user: any; token: string }>) => {
          state.loading = false;
          state.isLoggedIn = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
        },
      )
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isLoggedIn = false;
      });

    // Logout
    builder.addCase(logoutAsync.fulfilled, state => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.otpSent = false;
      state.otpVerified = false;
      state.error = null;
    });
  },
});

export const { clearError, resetOtpState } = authSlice.actions;
export default authSlice.reducer;
