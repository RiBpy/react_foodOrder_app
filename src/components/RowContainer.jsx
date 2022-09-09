import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { actionType } from "../context/reducer";
import { useGlobalState } from "../context/stateProvider";
import NotFound from "../img/NotFound.svg";
const RowContainer = ({ flag, data, scrollValue }) => {
  const [{ cartItems }, dispatch] = useGlobalState();
  const [items, setItems] = useState([]);

  const rowContainer = useRef();
  const addToCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };
  useEffect(() => {
    addToCart();
  }, [items]);
  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
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
      {data && data.length > 0 ? (
        data.map((item) => {
          const { id, price, imageURL, calories, title } = item;
          return (
            <div
              key={id}
              className="w-350 min-w-[300px] md:min-w-[380px] md:my-10  backdrop-blur-lg mx-1 my-2 lg:mx-2  "
            >
              <div className="w-full flex flex-row items-center justify-between bg-white rounded-lg drop-shadow-lg py-2 px-4 hover:bg-whiteAlpha min-h-[150px]">
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  src={imageURL}
                  alt="img"
                  className="w-30 max-h-40 -mt-8 duration-100  drop-shadow-2xl"
                />
                <div className="flex flex-col items-end justify-end gap-4">
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    className="w-8 h-8 rounded-md bg-orange-500 hover:bg-orange-600 "
                    onClick={() => setItems([...new Set(cartItems), item])}
                  >
                    <MdShoppingBasket className="text-white text-2xl m-1" />
                  </motion.div>
                  <div className=" w-full">
                    <p className="text-gray-800 md:text-lg text-base text-right">
                      {title}
                    </p>
                    <p className="text-sm text-gray-500 text-right">
                      <span className="text-orange-600">$</span> {price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" alt="" />
          <p className="text-center my-2 text-xl text-red-500">No data found</p>
        </div>
      )}
    </div>
  );
};
export default RowContainer;
