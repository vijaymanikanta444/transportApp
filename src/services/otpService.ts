import { REACT_APP_CLOUD_FUNCTION_URL } from '@env';

export const sendOtpAPI = async (email: string) => {
  console.log({ email });
  const res = await fetch(`${REACT_APP_CLOUD_FUNCTION_URL}/sendOTP`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  return res.json();
};

export const verifyOtpAPI = async (email: string, otp: string) => {
  const res = await fetch(`${REACT_APP_CLOUD_FUNCTION_URL}/verifyOTP`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });

  return res.json();
};
