// // auth.js – Authentication helpers
// import { auth } from './config';
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
// } from 'firebase/auth';

// export const loginUser = (email, password) =>
//   signInWithEmailAndPassword(auth, email, password);

// export const signUpUser = (email, password) =>
//   createUserWithEmailAndPassword(auth, email, password);

// export const logoutUser = () => signOut(auth);




// src/firebase/useAuth.js
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth } from './config';
import { db } from './firestore';

const useAuth = () => {
  const [user, setUser] = useState(null);        // Firebase Auth user
  const [role, setRole] = useState(null);        // Firestore role
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // Get role from Firestore
        const docRef = doc(db, 'users', authUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(authUser);
          setRole(docSnap.data().role); // e.g. 'seller'
        } else {
          console.warn("User role not found in Firestore.");
          setUser(authUser);
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, role, loading };
};

export default useAuth;

