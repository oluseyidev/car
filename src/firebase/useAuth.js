// useAuth.js
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config';

const adminEmails = ['oluseyiolalere@gmail.com'];

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const isAdmin = adminEmails.includes(firebaseUser.email);
        setUser({ ...firebaseUser, isAdmin });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
}
