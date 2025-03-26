import { motion } from "framer-motion";
import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { actionType } from "../context/reducer";
import { useGlobalState } from "../context/stateProvider";
const CartItem = ({ item, flag, setFlag }) => {
  const [{ cartItems }, dispatch] = useGlobalState();
  const [qty, setQty] = useState(item.qty);
  let items = [];
  const CartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
  };
  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
        return item;
      });
      CartDispatch();
    } else {
      //initial state value is one ww have to check if 1 then remove it.
      if (qty === 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        CartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(qty + 1);
          }
          return item;
        });
        CartDispatch();
      }
    }
  };

  return (
    <div
      key={item.id}
      className="w-full gap-4  px-2 flex items-center justify-between bg-slate-700 rounded-md mb-1"
    >
      <img
        src={item?.imageURL}
        alt=""
        className="w-20 h-20 max-w-[60px] rounded-lg object-contain"
      />
      {/*details section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-200"> {item.title}</p>
        <p className="text-sm block text-gray-200 font-semibold">
          ${parseFloat(item?.price) * qty}
        </p>
      </div>
      {/*button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item.id)}
        >
          <BiMinus className="text-gray-50" />
        </motion.div>
        <p className="w-5 h-5 rounded-sm bg-slate-400 flex items-center justify-center">
          {item?.qty}
        </p>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item.id)}
        >
          <BiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
