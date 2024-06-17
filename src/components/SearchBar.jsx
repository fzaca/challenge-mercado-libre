import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <label className="input input-bordered flex items-center gap-2">
        <input 
          type="text" 
          className="grow" 
          value={query}
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search" 
        />
        <kbd className="kbd kbd-sm">⌘</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
      </label>
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;
