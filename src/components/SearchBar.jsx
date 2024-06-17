import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <label className="input input-bordered flex items-center gap-2">
        <input 
          type="text" 
          className="grow" 
          value={query}
          onChange={(e) => setQuery(e.target.value)} 
          onKeyPress={handleKeyPress}
          placeholder="Search" 
        />
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 16 16" 
          fill="currentColor" 
          className="w-4 h-4 opacity-70 cursor-pointer"
          onClick={handleSearch}
        >
          <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
        </svg>
      </label>
    </div>
  );
};

export default SearchBar;
