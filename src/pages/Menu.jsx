import React, { useEffect, useState, useMemo } from "react";
import SearchForm from "../components/SearchForm";
import { actionType } from "../context/reducer";
import { useGlobalState } from "../context/stateProvider";
import NotFound from "../img/NotFound.svg";
import { debounce } from "lodash";
import FoodCard from "../components/FoodCard";

const Menu = () => {
  const [{ foodItems, searchItem, cartShow }, dispatch] = useGlobalState();
  const [filteredItems, setFilteredItems] = useState([]);

  // Function to toggle cart visibility
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

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
  }, [searchItem, foodItems, debouncedSearch]);

  return (
    <div className="w-full flex flex-col">
      <SearchForm />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mt-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <FoodCard key={item.id} item={item} showCart={showCart} />)
        ) : (
          <div className="w-full flex flex-col items-center justify-center col-span-full">
            <img src={NotFound} className="h-340" alt="Not Found" />
            <p className="text-center my-2 text-xl text-red-500">No data found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
