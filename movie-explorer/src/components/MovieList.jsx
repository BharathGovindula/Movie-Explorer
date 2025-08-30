import React, { useState, useEffect, useRef, useCallback } from 'react';
import MovieCard from './MovieCard';
import { getMovies, searchMovies, MyFilter } from '../services/api';

const MovieList = ({ category, searchQuery, filters }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  
  const observer = useRef();
  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    }, { threshold: 0.5 });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Reset page when category or search query changes
  useEffect(() => {
    setPage(1);
    setMovies([]);
  }, [category, searchQuery]);

  // Fetch movies based on category or search query
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let data;
        if (searchQuery) {
          data = await searchMovies(searchQuery, page);
        } else {
          data = await getMovies(category, page);
        }
        
        if (data.Response === "False") {
          setError(data.Error || 'No movies found');
          setHasMore(false);
        } else {
          if (page === 1) {
            setMovies(data.Search || []);
          } else {
            setMovies(prevMovies => [...prevMovies, ...(data.Search || [])]);
          }
          
          // OMDB API returns 10 results per page, if we got 10 results, assume there might be more
          setHasMore((data.Search || []).length === 10);
        }
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [category, searchQuery, page]);

  // Apply filters when movies or filters change
  useEffect(() => {
    if (filters && (filters.year || filters.genre)) {
      const filtered = MyFilter(movies, filters);
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [movies, filters]);

  // Display appropriate message when no movies are found
  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (filteredMovies.length === 0 && !loading) {
    return <div className="text-center py-10 text-gray-400">No movies found. Try adjusting your filters or search query.</div>;
  }

  return (
    <div className="w-full px-2">
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px'}}>
        {filteredMovies.map((movie, index) => {
          if (filteredMovies.length === index + 1) {
            return (
              <div ref={lastMovieElementRef} key={movie.imdbID} className="h-full">
                <MovieCard movie={movie} />
              </div>
            );
          } else {
            return (
              <div key={movie.imdbID} className="h-full">
                <MovieCard movie={movie} />
              </div>
            );
          }
        })}
      </div>
      
      {loading && (
        <div className="text-center py-6">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-gray-400">Loading more movies...</p>
        </div>
      )}
    </div>
  );
};

export default MovieList;