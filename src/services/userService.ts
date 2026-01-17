import { firebaseFirestore } from './firebase';
import firestore from '@react-native-firebase/firestore';

export const getUserByEmail = async (email: string) => {
  const snapshot = await firebaseFirestore
    .collection('users')
    .where('email', '==', email)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

export const registerUser = async (email: string) => {
  return firebaseFirestore.collection('users').add({
    email,
    approved: false,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};
