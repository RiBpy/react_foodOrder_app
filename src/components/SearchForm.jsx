import React, { useEffect, useRef } from "react";
import { actionType } from "../context/reducer";
import { useGlobalState } from "../context/stateProvider";

const SearchForm = () => {
  const [, dispatch] = useGlobalState();
  const searchValue = useRef("");
  function searchMeal(e) {
    dispatch({
      type: actionType.SET_SEARCH_ITEM,
      searchItem: e.target.value,
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    searchValue.current.focus(); //result will be changed when values of input change
  });
  return (
    <section className="flex items-center justify-center my-6 w-full h-20 py-8 ">
      <form className="" onSubmit={handleSubmit}>
        <div className="py-4 flex gap-2 flex-row bg-orange-500 px-8 rounded-md ">
          <label htmlFor="name" className="text-sm text-white w-[50%] ">
            Search your food item
          </label>
          <div className="flex flex-col items-center justify-center">
            <input
              className="appearance-none rounded-sm border-none w-full text-gray-700 px-2"
              type="text"
              name="name"
              id="name"
              placeholder="Banana"
              ref={searchValue}
              onChange={searchMeal}
            />
            <span className="text-gray-300 text-xs mt-2">
              First Letter capital
            </span>
          </div>
        </div>
      </form>
    </section>
  );
};
export default SearchForm;
