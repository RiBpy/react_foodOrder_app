import React, { useEffect, useState, useMemo } from "react";
import SearchForm from "../components/SearchForm";
import { debounce } from "lodash";
import { useGlobalState } from "../context/stateProvider";
import NotFound from "../img/NotFound.svg";
import FoodCard from "../components/FoodCard";
import { Loader } from "../components";

const Menu = () => {
  const [{ foodItems, searchItem, loading }] = useGlobalState();
  const [filteredItems, setFilteredItems] = useState([]);

  // Debounced search function (500ms delay)
  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        if (!query) {
          // Show top 10 items if input is empty
          setFilteredItems(foodItems?.slice(0, 10) || []);
        } else {
          // Perform case-insensitive search
          const results = foodItems?.filter((el) =>
            el.title.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredItems(results || []);
        }
      }, 500),
    [foodItems]
  );

  // Trigger search effect whenever searchItem changes
  useEffect(() => {
    debouncedSearch(searchItem);
  }, [searchItem, debouncedSearch]);

  return (
    <div className="w-full flex flex-col">
      <SearchForm />

      {loading ? (
        <div className="h-[30vh]">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mt-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => <FoodCard key={item.id} item={item} />)
          ) : (
            <div className="w-full flex flex-col items-center justify-center col-span-full">
              <img src={NotFound} className="h-340" alt="Not Found" />
              <p className="text-center my-2 text-xl text-red-500">
                No data found
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
