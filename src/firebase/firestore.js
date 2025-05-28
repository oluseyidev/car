// // firestore.js – Firestore car collection helpers
// import { db } from './config';
// import { collection, addDoc, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';


// import { getFirestore } from 'firebase/firestore';
// import { app } from './config';

// const carsRef = collection(db, 'cars');

// export const addCar = async (car, userId) => {
//     const newCar = { ...car, ownerId: userId, createdAt: new Date() };
//     return await addDoc(carsRef, newCar);
// };

// export const updateCar = (carId, updatedData) => {
//   const carDoc = doc(db, 'cars', carId);
//   return updateDoc(carDoc, updatedData);
// };

// export const deleteCar = (carId) => {
//   const carDoc = doc(db, 'cars', carId);
//   return deleteDoc(carDoc);
// };

// export const fetchAllCars = async () => {
//   const snapshot = await getDocs(carsRef);
//   return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// };

// export const db = getFirestore(app);


// firestore.js – Firestore car collection helpers
import { db } from './config';
import { collection, addDoc, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const carsRef = collection(db, 'cars');

export const addCar = async (car, userId) => {
  const newCar = { ...car, ownerId: userId, createdAt: new Date() };
  return await addDoc(carsRef, newCar);
};

export const updateCar = (carId, updatedData) => {
  const carDoc = doc(db, 'cars', carId);
  return updateDoc(carDoc, updatedData);
};

export const deleteCar = (carId) => {
  const carDoc = doc(db, 'cars', carId);
  return deleteDoc(carDoc);
};

export const fetchAllCars = async () => {
  const snapshot = await getDocs(carsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
