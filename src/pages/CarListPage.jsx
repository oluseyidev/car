// import React, { useEffect, useState } from 'react';
// import ListComponent from '../components/ListComponent';
// import { fetchCars } from '../api/carService';

// export default function CarListPage() {
//   const [cars, setCars] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCars()
//       .then(setCars)
//       .catch(() => setError('Failed to load cars'))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;
//   if (!cars.length) return <p>No cars available</p>;

//   return <ListComponent items={cars} renderItem={(car) => <li key={car.id}>{car.name}</li>} />;
// }



import React, { useEffect, useState } from 'react';
import ListComponent from '../components/ListComponent';
import CarCard from '../components/CarCard';
import { fetchCars } from '../api/carService';

export default function CarListPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCars()
      .then(setCars)
      .catch(() => setError('Failed to load cars'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Browse All Cars</h1>

      <ListComponent
        items={cars}
        loading={loading}
        error={error}
        emptyMessage="No cars available."
        renderItem={(car) => (
          <div className="bg-white shadow rounded p-4 mb-4 hover:shadow-lg transition-shadow duration-200">
            <CarCard car={car} />
          </div>
        )}
      />
    </div>
  );
}
