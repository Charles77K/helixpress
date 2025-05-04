import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();
export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <SearchContext.Provider value={{ isSearchOpen, toggleSearchBar }}>
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
