// components/EditCarForm.jsx
import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const EditCarForm = ({ car, onCancel, onSave }) => {
  const [name, setName] = useState(car.name);
  const [price, setPrice] = useState(car.price);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const carRef = doc(db, 'cars', car.id);
      await updateDoc(carRef, { name, price });
      onSave(); // callback to refresh UI
    } catch (err) {
      setError('Failed to update car');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 bg-gray-100 p-4 rounded mt-2">
      <div>
        <label className="block font-semibold">Car Name:</label>
        <input
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold">Price:</label>
        <input
          className="border p-2 w-full"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-1 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button type="button" onClick={onCancel} className="text-gray-500 underline">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditCarForm;
