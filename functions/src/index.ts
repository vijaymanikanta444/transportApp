import { setGlobalOptions } from 'firebase-functions';
import { onRequest } from 'firebase-functions/https';
import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';
import nodemailer from 'nodemailer';
import { defineSecret } from 'firebase-functions/params';

admin.initializeApp();

// Secrets
const EMAIL_USER = defineSecret('EMAIL_USER');
const EMAIL_PASS = defineSecret('EMAIL_PASS');

// Set maximum instances for cost control
setGlobalOptions({ maxInstances: 10 });

export const sendOTP = onRequest(
  {
    secrets: [EMAIL_USER, EMAIL_PASS],
  },
  async (req, res) => {
    try {
      const { email } = req.body;
      console.log('Received email:', email);
      if (!email) {
        res.status(400).json({ error: 'Email is required' });
        return;
      }

      // Check if user exists in Firestore
      const userDoc = await admin
        .firestore()
        .collection('users')
        .doc(email)
        .get();

      if (!userDoc.exists) {
        res.status(404).json({ error: 'Please enter a registered email' });
        return;
      }

      const userData = userDoc.data();

      // Check if user is approved
      if (!userData?.approved) {
        res.status(403).json({ error: 'User approval pending' });
        return;
      }

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Store OTP in Firestore
      await admin.firestore().collection('otps').doc(email).set({
        otp,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      logger.info(`OTP generated for ${email}: ${otp}`);

      // Create transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_USER.value(),
          pass: EMAIL_PASS.value(),
        },
      });

      // Send email
      await transporter.sendMail({
        from: `"Transport App" <${EMAIL_USER.value()}>`,
        to: email,
        subject: 'Your OTP Code',
        html: `
          <h2>Your OTP Code</h2>
          <p><b>${otp}</b></p>
          <p>This OTP is valid for 5 minutes.</p>
        `,
      });

      // Send OTP in response (for testing)
      res.json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
      logger.error('sendOTP error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
);
