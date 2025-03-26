
import React, { useEffect, useRef, useState, useCallback } from "react";
import { actionType } from "../context/reducer";
import { useGlobalState } from "../context/stateProvider";
import NotFound from "../img/NotFound.svg";
import RectangleFoodCard from "./RectangleFoodCard";

const RowContainer = ({ flag, data = [], scrollValue = 0 }) => {
  const [{ cartItems }, dispatch] = useGlobalState();
  const [items, setItems] = useState([]);
  const rowContainer = useRef(null);

  // Memoized function to add items to cart
  const addToCart = useCallback(() => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items, dispatch]);

  useEffect(() => {
    addToCart();
  }, [addToCart]);

  useEffect(() => {
    if (rowContainer.current) {
      rowContainer.current.scrollLeft += scrollValue;
    }
  }, [scrollValue]);

  return (
    <div
      ref={rowContainer}
      className={`w-full my-12 flex items-center ${
        flag
          ? "overflow-x-scroll scrollbar-none scroll-smooth"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data.length > 0 ? (
        data.map((item) => <RectangleFoodCard key={item.id} item={item} cartItems={cartItems} setItems={setItems} />)
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" alt="Not Found" />
          <p className="text-center my-2 text-xl text-red-500">No data found</p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
