import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { actionType } from "../context/reducer";
import { useGlobalState } from "../context/stateProvider";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";
const CartContainer = () => {
  const [tot, setTot] = useState(0);
  const [flag, setFlag] = useState(1);
  const [{ user, cartShow, cartItems }, dispatch] = useGlobalState();
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });
    localStorage.setItem("cartItems", JSON.stringify([]));
  };
  useEffect(() => {
    let totalPrice = cartItems.reduce((acc, item) => {
      return acc + item.qty * item.price;
    }, 0); //initial value of acc=0
    setTot(totalPrice);
  }, [tot, flag, cartItems]); //

  // hide card on outside click
  useEffect(() => {
    const hideCart = (event) => {
      const cartContainer = document.querySelector(".cart-container");
      const cartIcon = document.querySelector(".cart-icon");
      if (
        cartContainer &&
        !cartContainer.contains(event.target) &&
        cartIcon &&
        !cartIcon.contains(event.target)
      ) {
        dispatch({
          type: actionType.SET_CART_SHOW,
          cartShow: false,
        });
      }
    };
    window.addEventListener("click", hideCart);
    return () => {
      window.removeEventListener("click", hideCart);
    };
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 1 }}
      exit={{ opacity: 0, x: 300 }}
      className="w-full fixed z-[101] bg-white md:w-350 h-screen top-0 right-0 cart-container"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer bg-gradient-to-tr from-orange-400 to-orange-600">
        <motion.div whileTap={{ scale: 0.77 }} onClick={showCart}>
          <MdKeyboardBackspace className="text-3xl text-textColor" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.77 }}
          className="flex items-center gap-2 bg-orange-100 rounded-lg hover:shadow-lg cursor-pointer text-base px-1"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {cartItems.length > 0 ? (
        <div className="w-full h-full bg-slate-900 flex flex-col">
          {/* all cart item */}
          <div className="w-full px-6 py-4 flex flex-col overflow-y-scroll scrollbar-none ">
            {/* every cart item */}
            {cartItems &&
              cartItems.map((item) => (
                <CartItem
                  item={item}
                  key={item.index}
                  flag={flag}
                  setFlag={setFlag}
                />
              ))}
          </div>
          {/*cart total section */}
          <div className="w-full flex-1 bg-slate-700 rounded-t-[2rem] flex flex-col items-center justify-center px-8 py-16">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-300 text-lg">Sub Total</p>
              <p className="text-gray-300 text-lg"> {tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-300 text-lg">Delivery</p>
              <p className="text-gray-300 text-lg">$2</p>
            </div>
            <div className="w-full border-b border-gray-500 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-300 text-lg">Total</p>
              <p className="text-gray-300 text-lg">${tot + 2}</p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="w-full p-2 rounded-lg bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-100 text-lg my-2 hover:shadow-lg "
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="w-full p-2 rounded-lg bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-100 text-lg my-2 hover:shadow-lg capitalize"
              >
                Please Login first
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} alt="" className="w-300" />
          <p className="text-xl text-textColor fn-semibold my-2">
            Add Some Items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
