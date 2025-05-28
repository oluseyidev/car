// import React, { useEffect, useState } from 'react';
// import { fetchCars } from '../api/carService';

// export default function AdminCarPage() {
//   const [cars, setCars] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCars()
//       .then(setCars)
//       .catch(() => setError('Failed to load cars'))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Admin – Manage All Cars</h1>
//       {loading && <p>Loading cars...</p>}
//       {error && <p className="text-red-600">{error}</p>}
//       {!loading && !cars.length && <p>No cars found.</p>}
//       <ul className="space-y-4">
//         {cars.map((car) => (
//           <li key={car.id} className="bg-gray-50 p-4 border rounded shadow-sm">
//             <div className="flex justify-between items-center">
//               <span>{car.name}</span>
//               <div className="space-x-2">
//                 <button className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
//                 <button className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }




// import React, { useEffect, useState } from 'react';
// import { fetchCars } from '../api/carService';
// import useAuth from '../firebase/useAuth'; // import the hook
// import AddCarForm from '../components/AddCarForm';
// import ChatAssistant from '../components/ChatAssistant';

// export default function AdminCarPage() {
//   const user = useAuth();
//   const [cars, setCars] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user?.isAdmin) return; // Prevent fetch if not admin

//     fetchCars()
//       .then(setCars)
//       .catch(() => setError('Failed to load cars'))
//       .finally(() => setLoading(false));
//   }, [user]);

//   if (!user) {
//     return <p className="text-center text-red-600 mt-10">You must be logged in to access this page.</p>;
//   }

//   if (!user.isAdmin) {
//     return <p className="text-center text-red-600 mt-10">Access denied: Admins only.</p>;
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
        
//         <h1 className="text-2xl font-bold mb-6">Admin – Manage All Cars</h1>
//         {loading && <p>Loading cars...</p>}
//         {error && <p className="text-red-600">{error}</p>}
//         {!loading && !cars.length && <p>No cars found.</p>}
//         <ul className="space-y-4">
//           {cars.map((car) => (
//             <li key={car.id} className="bg-gray-50 p-4 border rounded shadow-sm">
//               <div className="flex justify-between items-center">
//                 <span>{car.name}</span>
//                 <div className="space-x-2">
//                   <button className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
//                   <button className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//     </div>
//   );
// }



import React, { useEffect, useState } from 'react';
import { fetchCars } from '../api/carService';
import useAuth from '../firebase/useAuth';
import AddCarForm from '../components/AddCarForm';
// import ChatAssistant from '../components/ChatAssistant'; // optional

export default function AdminCarPage() {
  const user = useAuth();
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!user?.isAdmin) return;
    loadCars();
  }, [user]);

  const loadCars = async () => {
    setLoading(true);
    try {
      const data = await fetchCars();
      setCars(data);
    } catch {
      setError('Failed to load cars');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCar = (newCar) => {
    setCars((prev) => [...prev, newCar]);
    setShowForm(false);
  };

  const handleDeleteCar = (id) => {
    if (!window.confirm('Delete this car?')) return;
    setCars((prev) => prev.filter((car) => car.id !== id));
    // TODO: also delete from backend
  };

  const handleEditCar = (car) => {
    // TODO: implement edit logic
    alert(`Edit car: ${car.name}`);
  };

  if (!user) {
    return <p className="text-center text-red-600 mt-10">You must be logged in to access this page.</p>;
  }

  if (!user.isAdmin) {
    return <p className="text-center text-red-600 mt-10">Access denied: Admins only.</p>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin – Manage All Cars</h1>

      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {showForm ? 'Close Add Car Form' : 'Add Car'}
      </button>

      {showForm && <AddCarForm onAdd={handleAddCar} />}

      {loading && <p>Loading cars...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !cars.length && <p>No cars found.</p>}

      <ul className="space-y-4">
        {cars.map((car) => (
          <li key={car.id} className="bg-gray-50 p-4 border rounded shadow-sm">
            <div className="flex justify-between items-center">
              <span>{car.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditCar(car)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCar(car.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Optional AI Assistant */}
      {/* <ChatAssistant /> */}
    </div>
  );
}
