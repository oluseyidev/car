



import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import AdminCarPage from './pages/AdminCarPage';
import ApiCars from './pages/ApiCars';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyCars from './pages/MyCars';
import Orders from './pages/Orders';

import { signOut } from 'firebase/auth';
import { auth, db } from './firebase/config';
import { fetchAllCars } from './firebase/firestore';

import useAuth from './firebase/useAuth';
import Navbar from './components/Navbar';
import ChatAssistant from './components/ChatAssistant';
import AddCarForm from './components/AddCarForm';

import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';

function App() {
  const user = useAuth(); // handles user and isAdmin
  const [cars, setCars] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activePage, setActivePage] = useState('home');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authMode, setAuthMode] = useState('login');
  const [isSeller, setIsSeller] = useState(false);

  // Determine seller status
  useEffect(() => {
    if (user?.uid) {
      if (user.isAdmin) {
        setIsSeller(true); // Admin is always a seller
      } else {
        const unsub = onSnapshot(doc(db, 'sellers', user.uid), (docSnap) => {
          setIsSeller(docSnap.exists());
        });
        return () => unsub();
      }
    } else {
      setIsSeller(false);
    }
  }, [user]);

  // Apply as seller logic
  const applyAsSeller = async () => {
    try {
      if (!user || !user.uid) {
        alert('You must be logged in to apply as a seller.');
        return;
      }

      await setDoc(doc(db, 'sellers', user.uid), {
        email: user.email || '',
        appliedAt: serverTimestamp(),
      });

      alert('You are now a seller! You can now list your cars.');
    } catch (error) {
      console.error('Apply as seller error:', error.message || error);
      alert('Failed to apply as seller. Try again.');
    }
  };

  // Load cars from Firestore
  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      try {
        const carList = await fetchAllCars();
        setCars(carList);
        localStorage.setItem('cars', JSON.stringify(carList));
      } catch (err) {
        console.error('Error loading cars:', err);
        setError('Failed to load car listings.');
      } finally {
        setLoading(false);
      }
    };
    loadCars();
  }, []);

  // Load wishlist from localStorage
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (car) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === car.id);
      return exists ? prev.filter((item) => item.id !== car.id) : [...prev, car];
    });
  };

  const addCar = (newCar) => {
    setCars((prev) => [newCar, ...prev]);
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading cars...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        wishlistLength={wishlist.length}
      />

      {/* Become a Seller button */}
      {user && !user.isAdmin && !isSeller && (
        <div className="text-center mt-6">
          <button
            onClick={applyAsSeller}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
          >
            Become a Seller
          </button>
        </div>
      )}

      {/* Main page switcher */}
      <main className="max-w-7xl mx-auto px-4 pb-10 min-h-[70vh]">
        {activePage === 'home' && (
          <Home
            cars={cars}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            loading={loading}
            error={error}
          />
        )}

        {activePage === 'wishlist' && (
          <Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} />
        )}

      {activePage === 'mycars' && user && isSeller && (
        <>
          <AddCarForm onAddCar={addCar} sellerId={user.uid} />
          <MyCars />
        </>
      )}


        {activePage === 'admin' &&
          (user?.isAdmin || isSeller ? (
            <AdminCarPage onAddCar={addCar} cars={cars} setCars={setCars} />
          ) : (
            <p className="text-center text-red-600 font-semibold mt-6">
              {user
                ? 'You do not have permission to access Admin Panel.'
                : 'Please log in as a seller or admin to access Admin Panel.'}
            </p>
          ))}

        {activePage === 'api' && <ApiCars />}
        {activePage === 'orders' && <Orders />}

        {activePage === 'login' && !user && (
          <div className="max-w-md mx-auto mt-8">
            {authMode === 'login' ? (
              <>
                <Login onLogin={() => {}} />
                <p className="mt-4 text-center text-gray-700">
                  Don't have an account?{' '}
                  <button
                    className="text-blue-600 underline hover:text-blue-800"
                    onClick={() => setAuthMode('signup')}
                  >
                    Sign Up
                  </button>
                </p>
              </>
            ) : (
              <>
                <Signup onSignup={() => {}} />
                <p className="mt-4 text-center text-gray-700">
                  Already have an account?{' '}
                  <button
                    className="text-blue-600 underline hover:text-blue-800"
                    onClick={() => setAuthMode('login')}
                  >
                    Log In
                  </button>
                </p>
              </>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 py-6 mt-12 text-center text-sm text-gray-700">
        <p>
          &copy; {new Date().getFullYear()} CarNest – Ultimate Auto Trade Hub. All rights reserved.
        </p>
        <p className="mt-2">
          Built with 💙 by <span className="font-medium text-blue-700">Oluseyi Olalere</span>
        </p>
      </footer>

      {/* Chat Assistant */}
      <div className="fixed bottom-4 right-4 z-50 bg-white shadow-xl rounded-xl p-4 w-80">
        <ChatAssistant />
      </div>
    </div>
  );
}

export default App;
