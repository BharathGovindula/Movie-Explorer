import React from 'react';

const MovieCard = ({ movie }) => {
  const posterPath = movie.Poster && movie.Poster !== 'N/A'
    ? movie.Poster
    : 'https://via.placeholder.com/300x450?text=No+Image+Available';
  
  const releaseYear = movie.Year || 'N/A';

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-md movie-card-hover fade-in h-full flex flex-col">
      <div className="relative pb-[140%]">
        <img 
          src={posterPath} 
          alt={`${movie.Title} poster`}
          className="absolute top-0 left-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-2 flex-grow">
        <h3 className="text-sm font-semibold text-white truncate">{movie.Title}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-400">{releaseYear}</p>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-0.5 text-xs">★</span>
            <span className="text-xs text-gray-300">{movie.imdbRating || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;