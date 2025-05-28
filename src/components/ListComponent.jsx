


import React from 'react';

const ListComponent = ({ items, renderItem, loading, error, emptyMessage }) => {
  if (loading) return <p className="text-center text-gray-500 mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;
  if (!items.length) return <p className="text-center text-gray-500 mt-6">{emptyMessage}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <div key={item.id || index}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

export default ListComponent;
