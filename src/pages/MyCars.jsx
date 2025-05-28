



// import React, { useEffect, useState } from 'react';
// import { getDocs, query, where, collection, deleteDoc, doc } from 'firebase/firestore';
// import { db } from '../firebase/config';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../firebase/config';
// import AddCarForm from '../components/AddCarForm';

// const MyCars = () => {
//   const [user] = useAuthState(auth);
//   const [cars, setCars] = useState([]);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     if (!user) return;

//     const fetchMyCars = async () => {
//       const q = query(collection(db, 'cars'), where('ownerId', '==', user.uid));
//       const snapshot = await getDocs(q);
//       setCars(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     };

//     fetchMyCars();
//   }, [user]);

//   const handleDelete = async (carId) => {
//     try {
//       await deleteDoc(doc(db, 'cars', carId));
//       setCars(prev => prev.filter(car => car.id !== carId));
//     } catch (err) {
//       console.error('Failed to delete car:', err);
//     }
//   };

//   const handleAddCar = (newCar) => {
//     setCars(prev => [...prev, newCar]);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">My Listed Cars</h2>

//       <button
//         onClick={() => setShowForm(prev => !prev)}
//         className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         {showForm ? 'Close Add Car Form' : 'Add Car'}
//       </button>

//       {showForm && <AddCarForm onAdd={handleAddCar} />}

//       <ul className="space-y-4">
//         {cars.map(car => (
//           <li key={car.id} className="bg-gray-100 p-4 rounded shadow">
//             <div className="flex justify-between items-center">
//               <span>{car.name} - ${car.price}</span>
//               <div className="space-x-2">
//                 {/* Placeholder: You can add an Edit handler here */}
//                 <button
//                   className="bg-yellow-500 text-white px-3 py-1 rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(car.id)}
//                   className="bg-red-600 text-white px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MyCars;



// pages/MyCars.jsx
import React, { useEffect, useState } from 'react';
import { getDocs, query, where, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import EditCarForm from '../components/EditCarForm';

const MyCars = () => {
  const [user] = useAuthState(auth);
  const [cars, setCars] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchMyCars = async () => {
    if (!user) return;
    const q = query(collection(db, 'cars'), where('ownerId', '==', user.uid));
    const snapshot = await getDocs(q);
    setCars(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchMyCars();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;
    await deleteDoc(doc(db, 'cars', id));
    fetchMyCars();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Listed Cars</h2>
      <ul className="space-y-4">
        {cars.map(car => (
          <li key={car.id} className="border p-4 rounded bg-white shadow-sm">
            {editingId === car.id ? (
              <EditCarForm
                car={car}
                onCancel={() => setEditingId(null)}
                onSave={() => {
                  setEditingId(null);
                  fetchMyCars();
                }}
              />
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <div>
                    <strong>{car.name}</strong> – ${car.price}
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => setEditingId(car.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCars;
