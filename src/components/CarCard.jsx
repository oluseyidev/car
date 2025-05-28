

// import React from 'react';

// const fallbackImage = '/fallback.jpg'; // Your fallback image in /public

// const CarCard = ({ car, toggleWishlist, isWishlisted, onBuy }) => (
//   <div className="border p-4 rounded shadow relative flex flex-col justify-between h-full">
//     {/* Wishlist button in top corner */}
//     <button
//       onClick={() => toggleWishlist(car)}
//       className={`absolute top-2 right-2 text-xl ${
//         isWishlisted ? 'text-red-500' : 'text-gray-400'
//       }`}
//       title="Toggle Wishlist"
//     >
//       ♥
//     </button>

//     {/* Top section: image + info */}
//     <div>
//       <img
//         src={car.image}
//         alt={car.name}
//         onError={(e) => {
//           e.target.onerror = null;
//           e.target.src = fallbackImage;
//         }}
//         className="w-full h-40 object-cover mb-2 rounded"
//       />
//       <h2 className="text-xl font-semibold">{car.name}</h2>
//       <p className="text-gray-600">{car.description || 'No description available'}</p>
//       <p className="text-sm text-gray-500">Vendor: {car.Vendor || 'Unknown vendor'}</p>
//       <p className="text-blue-500 font-bold mt-2">${car.price || 'N/A'}</p>
//     </div>

//     {/* Bottom section: Buy button */}
//     {onBuy && (
//       <div className="mt-4">
//         <button
//           onClick={() => onBuy(car)}
//           className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
//         >
//           Buy
//         </button>
//       </div>
//     )}
//   </div>
// );

// export default CarCard;




import React from 'react';

const fallbackImage = '/fallback.jpg'; // Your fallback image in /public

const CarCard = ({ car, toggleWishlist, isWishlisted, onBuy }) => (
  <div className="flex flex-col justify-between h-full min-h-[440px] bg-white border p-4 rounded shadow relative">
    {/* Wishlist button in top corner */}
    <button
      onClick={() => toggleWishlist(car)}
      className={`absolute top-2 right-2 text-xl ${
        isWishlisted ? 'text-red-500' : 'text-gray-400'
      }`}
      title="Toggle Wishlist"
    >
      ♥
    </button>

    {/* Top section */}
    <div className="mb-4">
      <img
        src={car.image}
        alt={car.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImage;
        }}
        className="w-full h-40 object-cover mb-2 rounded"
      />
      <h2 className="text-xl font-semibold">{car.name}</h2>
      <p className="text-gray-600 line-clamp-3">{car.description || 'No description available'}</p>
      <p className="text-sm text-gray-500">Vendor: {car.Vendor || 'Unknown vendor'}</p>
      <p className="text-blue-500 font-bold mt-2">${car.price || 'N/A'}</p>
    </div>

    {/* Bottom section */}
    {onBuy && (
      <div className="mt-auto">
        <button
          onClick={() => onBuy(car)}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Buy
        </button>
      </div>
    )}
  </div>
);

export default CarCard;
