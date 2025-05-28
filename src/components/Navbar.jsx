// import React, { useState } from 'react';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase/config';
// import useAuth from '../firebase/useAuth';

// export default function Navbar({ onNavigate }) {
//   const user = useAuth(); // { email, uid, isAdmin, role }
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleNav = (page) => {
//     onNavigate(page);
//     setMenuOpen(false); // Close menu on mobile
//   };

//   return (
//     <header className="bg-blue-100 shadow sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 flex-wrap">
//         <h1 className="text-2xl font-extrabold text-blue-700">🚗 CarNest</h1>

//         {/* Hamburger Icon */}
//         <button
//           className="md:hidden text-blue-700 focus:outline-none"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             {menuOpen ? (
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             ) : (
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             )}
//           </svg>
//         </button>

//         {/* Links */}
//         <nav className={`w-full md:flex md:items-center md:w-auto ${menuOpen ? 'block' : 'hidden'} md:block`}>
//           <ul className="md:flex gap-4 mt-4 md:mt-0 text-sm md:text-base font-medium text-blue-800">
//             <li><button onClick={() => handleNav('home')} className="hover:underline">Home</button></li>
//             <li><button onClick={() => handleNav('wishlist')} className="hover:underline">Wishlist</button></li>
//             <li><button onClick={() => handleNav('mycars')} className="hover:underline">My Cars</button></li>
//             <li><button onClick={() => handleNav('api')} className="hover:underline">API Cars</button></li>
//             {user?.isAdmin && (
//               <li><button onClick={() => handleNav('admin')} className="text-green-600 hover:underline">Admin Panel</button></li>
//             )}
//             {!user ? (
//               <li>
//                 <button
//                   onClick={() => handleNav('login')}
//                   className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                 >
//                   Log In / Sign Up
//                 </button>
//               </li>
//             ) : (
//               <li>
//                 <button
//                   onClick={() => signOut(auth)}
//                   className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                 >
//                   Log Out
//                 </button>
//               </li>
//             )}
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// }




// src/components/Navbar.jsx
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import useAuth from '../firebase/useAuth';

export default function Navbar({ activePage, setActivePage, wishlistLength }) {
  const user = useAuth();

  const pages = [
    { label: 'All Cars', page: 'home', color: 'blue' },
    { label: `Wishlist (${wishlistLength})`, page: 'wishlist', color: 'pink' },
    { label: 'My Cars', page: 'mycars', color: 'yellow' },
    { label: 'Admin CarPage', page: 'admin', color: 'green' },
    { label: 'API Cars', page: 'api', color: 'purple' },
    { label: 'Orders', page: 'orders', color: 'blue' }
  ];

  return (
    <header className="bg-blue-100 shadow py-4 px-6 mb-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-extrabold text-blue-700">🚗 CarNest – Ultimate Auto Trade Hub</h1>
        <nav className="flex flex-wrap gap-3 items-center">
          {pages.map(({ label, page, color }) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-full font-semibold shadow-md transition-all duration-300 ${
                activePage === page
                  ? `bg-${color}-600 text-white`
                  : `bg-${color}-200 hover:bg-${color}-300`
              }`}
              onClick={() => setActivePage(page)}
            >
              {label}
            </button>
          ))}
          
          {!user ? (
            <button
              className={`px-4 py-2 rounded-full font-semibold shadow-md transition-colors duration-300 ${
                activePage === 'login' ? 'bg-gray-700 text-white' : 'bg-gray-400 hover:bg-gray-500'
              }`}
              onClick={() => setActivePage('login')}
            >
              Log In / Sign Up
            </button>

          ) : (
            <button
              className="px-4 py-2 rounded-full bg-red-600 text-white font-semibold shadow-md hover:bg-red-700"
              onClick={() => signOut(auth)}
            >
              Log Out
            </button>
          )}

        </nav>
      </div>
    </header>
  );
}
