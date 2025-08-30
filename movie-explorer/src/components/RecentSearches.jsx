import React from 'react';

const RecentSearches = ({ searches, onSearchClick }) => {
  if (!searches || searches.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="text-sm text-gray-400 mb-2">Recent Searches:</h3>
      <div className="flex flex-wrap gap-2">
        {searches.map((search, index) => (
          <button
            key={index}
            onClick={() => onSearchClick(search)}
            className="bg-slate-700 hover:bg-slate-600 text-sm text-gray-200 px-3 py-1 rounded-full transition-colors"
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;