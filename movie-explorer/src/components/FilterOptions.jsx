import React, { useState } from 'react';

const FilterOptions = ({ onFilterChange }) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  
  // Generate year options (from 2000 to current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1979 }, (_, i) => currentYear - i);
  
  // Predefined genres for OMDB
  const genres = [
    { id: 'action', name: 'Action' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'animation', name: 'Animation' },
    { id: 'comedy', name: 'Comedy' },
    { id: 'crime', name: 'Crime' },
    { id: 'documentary', name: 'Documentary' },
    { id: 'drama', name: 'Drama' },
    { id: 'family', name: 'Family' },
    { id: 'fantasy', name: 'Fantasy' },
    { id: 'horror', name: 'Horror' },
    { id: 'mystery', name: 'Mystery' },
    { id: 'sci-fi', name: 'Sci-Fi' },
    { id: 'thriller', name: 'Thriller' }
  ];
  
  // Handle filter changes
  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    onFilterChange({ year, genre: selectedGenre });
  };
  
  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    onFilterChange({ year: selectedYear, genre });
  };
  
  const clearFilters = () => {
    setSelectedYear('');
    setSelectedGenre('');
    onFilterChange({});
  };
  
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
      <div className="flex items-center">
        <label htmlFor="year-filter" className="mr-2 text-sm text-gray-300">Year:</label>
        <select
          id="year-filter"
          value={selectedYear}
          onChange={handleYearChange}
          className="bg-slate-700 text-white text-sm rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center">
        <label htmlFor="genre-filter" className="mr-2 text-sm text-gray-300">Genre:</label>
        <select
          id="genre-filter"
          value={selectedGenre}
          onChange={handleGenreChange}
          className="bg-slate-700 text-white text-sm rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
      
      {(selectedYear || selectedGenre) && (
        <button
          onClick={clearFilters}
          className="text-sm bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default FilterOptions;