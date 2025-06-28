import React, { useState } from 'react';
import foodData from './data/food_data.json';
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

  function handleSearch(term) {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) {
      setShowWarning("Please enter a search term");
      setResults([]);
      setHasSearched(false);
    } else {
      setShowWarning("");
      const lowercasedTerm = trimmedTerm.toLowerCase();
      const matchedResults = foodData.Food_Display_Table.filter(food => {
        const displayName = food.Display_Name || food.display_name;
        return displayName && displayName.toLowerCase().includes(lowercasedTerm);
      });
      setLength(matchedResults.length);
      setResults(matchedResults.slice(0, 25));
      setHasSearched(true);
    }
  }

  function handleClear() {
    setSearchTerm("");
    setResults([]);
    setShowWarning("");
    setHasSearched(false);
  }

  function addToCache(food) {
    const newCachedItem = { ...food, uniqueId: Date.now(), servings: 1 };
    setCache([...cache, newCachedItem]);
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
          {showWarning && <WarningMessage message={showWarning} />}
          {hasSearched && <ResultsList results={results} length={resultsLength} actualLength={results.length} onAdd={addToCache} />}
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