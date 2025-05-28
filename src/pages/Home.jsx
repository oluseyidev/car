import React, { useState } from 'react';
import ListComponent from '../components/ListComponent';
import CarCard from '../components/CarCard';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase/config';


const WelcomeBanner = () => (
  <div className="bg-blue-50 border border-blue-300 text-blue-900 p-6 rounded-2xl shadow mb-8">
    <h2 className="text-2xl font-bold mb-3">🚗 Welcome to CarNest – Powering the Future of Automotive Commerce 🚗</h2>
    <p className="mb-3">Greetings, sellers & buyers!</p>
    <p className="mb-3">
      Whether you're here to sell your vehicle or find the perfect ride, you've come to the right place.
      At <span className="font-semibold text-blue-800">CarNest</span>, we make auto trading seamless, secure, and <span className="font-semibold">100% FREE</span>!
    </p>
    <ul className="list-disc list-inside space-y-2 mb-4">
      <li>✅ <span className="font-medium">Sellers:</span> List your vehicles with ease and connect with serious buyers—<span className="text-blue-800 font-semibold">at no cost</span>.</li>
      <li>✅ <span className="font-medium">Buyers:</span> Discover top-quality cars at competitive prices, with <span className="font-semibold">no hidden fees</span>.</li>
      <li>✅ <span className="font-medium">Fast, Safe, Reliable:</span> Enjoy a trusted marketplace designed for smooth, free transactions.</li>
    </ul>
    <p className="font-medium">
    o  Start your journey now—because at <span className="font-semibold text-blue-800">CarNest</span>, the road to a great deal begins here, with <span className="text-blue-700 font-semibold">ZERO fees</span>! 🚀
    </p>
  </div>
);

const Home = ({ cars, wishlist, toggleWishlist, loading, error }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [user] = useAuthState(auth);

  const handleBuy = async (car) => {
    if (!user) {
      alert('Please log in to purchase a car.');
      return;
    }

    const confirmed = window.confirm(`Do you want to purchase "${car.name}" for $${car.price}?`);
    if (!confirmed) return;

    try {
      // Simulate processing delay
    alert("Processing payment...");

    await new Promise((resolve) => setTimeout(resolve, 1500)); // fake delay
      
      await addDoc(collection(db, 'orders'), {
        buyerId: user.uid,
        carId: car.id,
        carName: car.name,
        price: car.price,
        image: car.image,
        purchasedAt: serverTimestamp()
      });
      alert(`Purchase successful: ${car.name}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('❌ Something went wrong. Please try again.');
    }
  };

  const filteredCars = cars.filter((car) =>
    car.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onBuyCar = (car) => {
    console.log('Attempting to buy car:', car);
    // You’ll implement Firestore logic here later
    alert(`Buy button clicked for: ${car.name}`);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <WelcomeBanner />

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-300 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> */}
        <ListComponent
          items={filteredCars}
          renderItem={(car) => (
            <div key={car.id} className="bg-white shadow rounded p-4 mb-4 hover:shadow-lg transition-shadow duration-200">
              <CarCard
                car={car}
                toggleWishlist={toggleWishlist}
                isWishlisted={wishlist.some((c) => c.id === car.id)}
                onBuy={handleBuy} // 👈 Add this line
              />
            </div>
          )}
          loading={loading}
          error={error}
          emptyMessage="No matching cars found."
        />
      
      </div>
     
  );
};

export default Home;
