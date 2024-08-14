
import React, { useCallback } from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search transactions"
        aria-label="Search transactions"
      />
      {searchTerm && (
        <button onClick={handleClear} aria-label="Clear search">
          X
        </button>
      )}
    </div>
  );
};

export default React.memo(SearchBar);
