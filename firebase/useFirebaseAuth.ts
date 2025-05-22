import { useState, useEffect } from 'react';
import { auth, db } from './firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from 'firebase/auth';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { AppUser } from '@/types';

export function useFirebaseAuth() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const signUp = async (
    name: string,
    emailOrPhone: string,
    password: string
  ) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      emailOrPhone,
      password
    );
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name });
    }
    const token = await userCredential.user.getIdToken();
    setCookie(null, 'firebaseToken', token, {
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    // Add user to Firestore with isAdmin: false by default
    const userRef = doc(db, 'users', userCredential.user.uid);
    await getDoc(userRef).then(async (docSnap) => {
      if (!docSnap.exists()) {
        await setDoc(userRef, { isAdmin: false });
      }
    });
    return userCredential;
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    destroyCookie(null, 'firebaseToken');
    destroyCookie(null, 'userData');
    return signOut(auth);
  };

  // Send password reset email
  const forgotPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Reset password with code from email
  const resetPassword = (oobCode: string, newPassword: string) => {
    return confirmPasswordReset(auth, oobCode, newPassword);
  };

  useEffect(() => {
    setLoading(true);

    // 1. Try to get userData from cookies
    const cookies = parseCookies();
    const userData = cookies.userData ? JSON.parse(cookies.userData) : null;

    if (userData?.uid && typeof userData?.isAdmin !== 'undefined') {
      // Use cookie data immediately
      setUser(userData as AppUser);
      setIsAdmin(userData.isAdmin);
      setLoading(false);
    } else {
      // No cookie, fall back to Firebase listener
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          // Fetch isAdmin from Firestore
          const userRef = doc(db, 'users', firebaseUser.uid);
          const userSnap = await getDoc(userRef);
          const isAdmin = userSnap.exists() ? !!userSnap.data().isAdmin : false;
          const appUser = { ...(firebaseUser as AppUser), isAdmin };
          setUser(appUser);
          setIsAdmin(isAdmin);
          // Set userData cookie for middleware
          setCookie(null, 'userData', JSON.stringify({ ...firebaseUser }), {
            path: '/',
            maxAge: 60 * 60 * 24,
          });
          const token = await firebaseUser.getIdToken();
          setCookie(null, 'firebaseToken', token, {
            path: '/',
            maxAge: 60 * 60 * 24,
          });
        } else {
          setUser(null);
          setIsAdmin(false);
          destroyCookie(null, 'userData');
        }
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, []);

  return {
    user,
    isAdmin,
    loading,
    signUp,
    signIn,
    logOut,
    forgotPassword,
    resetPassword,
  };
}
