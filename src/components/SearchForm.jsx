import { debounce } from "lodash";
import React, { useEffect, useState, useRef } from "react";
import { actionType } from "../context/reducer";
import { useGlobalState } from "../context/stateProvider";

const SearchForm = () => {
  const [, dispatch] = useGlobalState();
  const [query, setQuery] = useState("");
  const searchValue = useRef("");

  // Debounced search function
  const debouncedSearch = debounce((searchText) => {
    dispatch({
      type: actionType.SET_SEARCH_ITEM,
      searchItem: searchText.toLowerCase(),
    });
  }, 500); // 500ms delay

  // Handle input change with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  // Prevent default form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Auto-focus input on mount
  useEffect(() => {
    searchValue.current.focus();
  }, []);

  return (
    <section className="flex items-center justify-center my-6 w-full h-20 py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex items-center bg-orange-500 px-6 py-3 rounded-lg shadow-md">
          <label htmlFor="search" className="text-white text-sm font-semibold mr-3">
            Search:
          </label>
          <input
            className="flex-1 p-2 rounded-md border-none outline-none text-gray-900"
            type="text"
            name="search"
            id="search"
            placeholder="Search food..."
            ref={searchValue}
            value={query}
            onChange={handleSearchChange}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
