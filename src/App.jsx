import React, { useState } from 'react';
import SearchPanel from './components/SearchPanel';
import ResultsList from './components/ResultsList';
import CachedFoods from './components/CachedFoods';
import WarningMessage from './components/WarningMessage';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showWarning, setShowWarning] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [resultsLength, setLength] = useState(0);
  const [cache, setCache] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 25;

  const handleSearch = async (term) => {
    if (!term.trim()) {
      setShowWarning('Please enter a search term. ');
      setResults([]);
      return;
    }
    setIsLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(`/api/foods?query=${term}&limit=${limit}`);
      const data = await res.json();
      setShowWarning('')
      setResults(data.results);
      setLength(data.total);
    }
    catch (error) {
      console.error('Search failed:', error);
      setShowWarning('Server error. ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/foods?query=${searchTerm}&offset=${results.length}&limit=${limit}`);
      const data = await res.json();
      setResults(prev => [...prev, ...data.results]);
    } catch (error) {
      console.error('Failed to load more:', error);
    } finally {
      setIsLoading(false);
    }
  };
  function handleClear() {
    setSearchTerm("");
    setResults([]);
    setShowWarning("");
    setHasSearched(false);
  }

  function addToCache(food) {
    const existingFood = cache.find((item) => item.Food_Code === food.Food_Code);
    if (existingFood) {
      const newServingValue = (existingFood.servings || 0) + 1;
      handleServingChange(existingFood.uniqueId, newServingValue)
    }
    else {
      const newCachedItem = { ...food, uniqueId: Date.now(), servings: 1 };
      setCache([...cache, newCachedItem]);
    }

  }

  function removeFromCache(uniqueId) {
    setCache(cache.filter(item => item.uniqueId !== uniqueId));
  }

  function handleServingChange(uniqueId, newServingValue) {
    setCache(cache.map(item =>
      item.uniqueId === uniqueId ? { ...item, servings: newServingValue } : item
    ));
  }

  return (
    <div className="app-container">
      <h1>Calorie Counter</h1>
      <div className="main-layout">
        <div className="search-section">
          <SearchPanel
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            clear={handleClear}
          />
          {isLoading && <p>Loading...</p>}
          {showWarning &&
            <WarningMessage
              message={showWarning} />}
          {hasSearched && (
            <>
              <ResultsList
                results={results}
                length={resultsLength}
                actualLength={results.length}
                onAdd={addToCache}
              />
              {results.length < resultsLength && (
                <button onClick={handleLoadMore} className="load-more-btn">
                  Load More
                </button>
              )}
            </>
          )}
        </div>
        <div className="list-section">
          <CachedFoods
            cache={cache}
            onRemove={removeFromCache}
            onServingChange={handleServingChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;