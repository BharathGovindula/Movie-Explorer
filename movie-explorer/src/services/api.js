import axios from 'axios';

const API_KEY = 'ca768b0a'; // OMDB API key for testing purposes
const BASE_URL = 'https://www.omdbapi.com';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

// Get movies by search term and page
export const getMovies = async (category = 'action', page = 1) => {
  try {
    // OMDB doesn't have categories like TMDB, so we'll use the category as a search term
    const response = await api.get('/', {
      params: { 
        s: category,
        type: 'movie',
        page 
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Search movies by query
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/', {
      params: { 
        s: query,
        type: 'movie',
        page 
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// OMDB doesn't have a genres endpoint, so we'll provide some common genres
export const getGenres = async () => {
  // Static list of common movie genres
  const genres = [
    { id: 'action', name: 'Action' },
    { id: 'comedy', name: 'Comedy' },
    { id: 'drama', name: 'Drama' },
    { id: 'horror', name: 'Horror' },
    { id: 'sci-fi', name: 'Sci-Fi' },
    { id: 'thriller', name: 'Thriller' },
    { id: 'romance', name: 'Romance' },
    { id: 'animation', name: 'Animation' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'fantasy', name: 'Fantasy' }
  ];
  
  return genres;
};

// Get detailed movie information by ID
export const getMovieDetails = async (imdbID) => {
  try {
    const response = await api.get('/', {
      params: { 
        i: imdbID,
        plot: 'full'
      },
    });
    
    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'Failed to fetch movie details');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Custom filter function for OMDB data
export const MyFilter = (movies, filters) => {
  if (!movies || !filters) return movies;
  
  return movies.filter(movie => {
    // Filter by year if specified
    if (filters.year && movie.Year) {
      if (!movie.Year.includes(filters.year)) {
        return false;
      }
    }
    
    // Filter by genre if specified
    if (filters.genre && movie.Type) {
      // OMDB doesn't provide genre in search results
      // We're using Type as a fallback, but ideally we'd fetch details for each movie
      if (movie.Type.toLowerCase() !== 'movie') {
        return false;
      }
    }
    
    return true;
  });
};

export default api;