// import React, { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase';

// const Signup = ({ onSignup }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       onSignup(userCredential.user);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto border rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Sign Up</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}
//       <form onSubmit={handleSignup} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;



// import React, { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { auth } from '../firebase/config';
// import { auth, db } from '../firebase/config';



// const Signup = ({ onSignup }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('buyer'); // Default role
//   const [error, setError] = useState('');

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Save user data including role to Firestore
//       await setDoc(doc(db, 'users', user.uid), {
//         uid: user.uid,
//         email: user.email,
//         role: role,
//       });

//       onSignup(user);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto border rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Sign Up</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}
//       <form onSubmit={handleSignup} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option value="buyer">Buyer</option>
//           <option value="seller">Seller</option>
//         </select>
//         <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;


// import React, { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { auth, db } from '../firebase/config';  // fixed import: auth and db from config

// const Signup = ({ onSignup }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('buyer'); // Default role
//   const [error, setError] = useState('');

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Save user data including role to Firestore
//       await setDoc(doc(db, 'users', user.uid), {
//         uid: user.uid,
//         email: user.email,
//         role: role,
//       });

//       // If role is seller, add to sellers collection as well
//       if (role === 'seller') {
//         await setDoc(doc(db, 'sellers', user.uid), {
//           email: user.email,
//           appliedAt: new Date(),  // timestamp of application
//         });
//       }

//       onSignup(user);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto border rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Sign Up</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}
//       <form onSubmit={handleSignup} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option value="buyer">Buyer</option>
//           <option value="seller">Seller</option>
//         </select>
//         <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;





// import React, { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { auth } from '../firebase/config';
// // import { auth, db } from '../firebase/config';



// const Signup = ({ onSignup }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('buyer'); // Default role
//   const [error, setError] = useState('');

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Save user data including role to Firestore
//       await setDoc(doc(db, 'users', user.uid), {
//         uid: user.uid,
//         email: user.email,
//         role: role,
//       });

//       onSignup(user);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto border rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Sign Up</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}
//       <form onSubmit={handleSignup} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option value="buyer">Buyer</option>
//           <option value="seller">Seller</option>
//         </select>
//         <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;




import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config'; // ✅ Fix: Import db properly

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer'); // Default role
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Save user data including role to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        role: role,
      });

      // ✅ Call parent handler with full user + role info
      onSignup({
        uid: user.uid,
        email: user.email,
        role: role,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;

