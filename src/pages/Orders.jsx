import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase/config';

export default function Orders() {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const q = query(collection(db, 'orders'), where('buyerId', '==', user.uid));
      const snapshot = await getDocs(q);
      const userOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(userOrders);
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (!user) return <p className="text-red-600 text-center mt-10">You must be logged in to view your orders.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>You haven’t purchased any cars yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{order.carName}</h3>
              <p>Price: ${order.price}</p>
              <p className="text-sm text-gray-500">Purchased on {new Date(order.purchasedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
