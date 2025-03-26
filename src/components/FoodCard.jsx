import React from "react";
import { useGlobalState } from "../context/stateProvider";
import { actionType } from "../context/reducer";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";

const FoodCard = ({ item }) => {
  const [{ cartItems }, dispatch] = useGlobalState();

  const addToCart = () => {
    const updatedCart = [...new Set(cartItems), item];
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: updatedCart,
    });
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between items-center hover:shadow-lg transition-all">
      <motion.img
        whileHover={{ scale: 1.2 }}
        src={item.imageURL}
        alt="img"
        className="w-full h-40 object-contain mb-4"
      />
      <p className="text-gray-800 text-lg text-center">{item.title}</p>
      <p className="text-sm text-gray-500">
        <span className="text-orange-600">$</span> {item.price}
      </p>
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center mt-3"
        onClick={() => addToCart()}
      >
        <MdShoppingBasket className="mr-2" />
        Add to Cart
      </motion.button>
    </div>
  );
};
export default FoodCard;
