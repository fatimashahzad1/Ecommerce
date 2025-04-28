'use client';
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { User, UserCredential } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '@/store/authSlice';
import { useFirebaseAuth } from '@/firebase/useFirebaseAuth';


interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (name: string, email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (oobCode: string, newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading, signIn, signUp, logOut, forgotPassword,
    resetPassword, } = useFirebaseAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser(user));
    dispatch(setLoading(loading));
  }, [user, loading, dispatch]);

  const memoizedValue = useMemo(
    () => ({
      user, loading, signIn, signUp, signOut: logOut, forgotPassword,
      resetPassword,
    }),
    [user, loading, signIn, signUp, logOut, forgotPassword,
      resetPassword,]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
