import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './components/MovieList'
import CategorySelector from './components/CategorySelector'
import SearchBar from './components/SearchBar'
import FilterOptions from './components/FilterOptions'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import RecentSearches from './components/RecentSearches'
import BackToTop from './components/BackToTop'

function App() {
  const [category, setCategory] = useState('action');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState(null);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSearchQuery(''); // Clear search when changing category
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCategory(''); // Clear category when searching
  };

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle clicking on a recent search
  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    setCategory('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-800 shadow-md py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-6">Movie Explorer</h1>
          
          <SearchBar 
            onSearch={handleSearch} 
            setRecentSearches={setRecentSearches} 
          />
          
          <RecentSearches 
            searches={recentSearches} 
            onSearchClick={handleRecentSearchClick} 
          />
          
          {!searchQuery && (
            <CategorySelector 
              currentCategory={category} 
              onCategoryChange={handleCategoryChange} 
            />
          )}
          
          <FilterOptions onFilterChange={handleFilterChange} />
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {error ? (
          <ErrorMessage message={error} />
        ) : isLoading ? (
          <LoadingSpinner />
        ) : (
          <MovieList 
            category={category} 
            searchQuery={searchQuery} 
            filters={filters} 
          />
        )}
      </main>
      
      <BackToTop />
    </div>
  )
}

export default App
