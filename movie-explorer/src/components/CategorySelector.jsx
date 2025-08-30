import React from 'react';

const CategorySelector = ({ currentCategory, onCategoryChange }) => {
  const categories = [
    { id: 'action', name: 'Action' },
    { id: 'comedy', name: 'Comedy' },
    { id: 'drama', name: 'Drama' },
    { id: 'thriller', name: 'Thriller' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full transition-colors ${
            currentCategory === category.id
              ? 'bg-blue-600 text-white'
              : 'bg-slate-700 text-gray-200 hover:bg-slate-600'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;