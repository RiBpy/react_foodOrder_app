import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  MdAdd,
  MdAnnouncement,
  MdHome,
  MdLogout,
  MdMenuBook,
  MdMenuOpen,
  MdRestaurant,
  MdShoppingBasket,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { actionType } from "../context/reducer";
import { useGlobalState } from "../context/stateProvider";
import { app } from "../firebase.config";
import avatar from "../img/avatar.png";
import logo from "../img/food.png";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [{ user, cartShow, cartItems }, dispatch] = useGlobalState();
  const [isMenu, setIsMenu] = useState(false);
  const [isMobileMenu, setMobileMenu] = useState();

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const login = async () => {
    if (!user) {
      const { user } = await signInWithPopup(firebaseAuth, provider);
      const { providerData } = user;
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
    navigate("/", { replace: true });
  };
  
  const mobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  };
  return (
    <nav className=" fixed z-50 w-screen bg-slate-200 py-3 px-4 ">
      {/*desktop and tab */}
      <div className="hidden md:flex w-full h-full p-4">
        <Link
          to="/"
          className="flex items-center"
          onClick={() => setIsMenu(false)}
        >
          <img src={logo} alt="logo" className="w-12 object-cover" />
          <p className="text-xl font-bold text-activeText ml-0">Food</p>
        </Link>
        <div className="flex items-center ml-auto gap-8">
          <motion.ul
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 1 }}
            exit={{ opacity: 0, y: 300 }}
            className="flex items-center gap-8"
          >
            <li
              className="text-base text-textColor hover:text-activeText duration-100 transition-all ease-in-out cursor-pointer hover:scale-110"
              onClick={() => setIsMenu(false)}
            >
              <Link to="/"> Home</Link>
            </li>
            <li
              className="text-base text-textColor hover:text-activeText duration-100 transition-all ease-in-out cursor-pointer hover:scale-110"
              onClick={() => setIsMenu(false)}
            >
              <Link to="/menu">Menu</Link>
            </li>
            <li
              className="text-base text-textColor hover:text-activeText duration-100 transition-all ease-in-out cursor-pointer hover:scale-110"
              onClick={() => setIsMenu(false)}
            >
              About Us
            </li>
            <li
              className="text-base text-textColor hover:text-activeText duration-100 transition-all ease-in-out cursor-pointer hover:scale-110"
              onClick={() => setIsMenu(false)}
            >
              Service
            </li>
          </motion.ul>
          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer hover:scale-110 hover:text-activeText" />
            {cartItems && cartItems.length > 0 && (
              <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-activeText flex items-center justify-center">
                <p className="text-sm text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative text-center items-center">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : avatar}
              alt={"avatar"}
              referrerPolicy="no-referrer" /*some time it does not show image if running in localhost */
              className="w-10 min-w-[40px] min-h-[40px] shadow-md rounded-full"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 absolute text-base rounded-lg bg-gray-50 flex flex-col top-10 right-2 shadow-lg"
              >
                {user && user.email === "hackerabcxyz77@gmail.com" && (
                  <Link to="/createItem">
                    <p className="hover:bg-gray-200 rounded-lg px-4 py-2 flex gap-3 cursor-pointer transition-all ease-in-out items-center">
                      New Item
                      <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="hover:bg-gray-200 rounded-lg px-4 py-2 flex gap-3 cursor-pointer transition-all ease-in-out items-center"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/*Mobile */}

      <div className="h-ful md:hidden flex flex-row  justify-between">
        <div className="flex">
          <motion.button
            whileTap={{ scale: 0.7 }}
            className="text-activeText text-[35px] cursor-pinter"
            onClick={mobileMenu}
          >
            <MdMenuOpen />
          </motion.button>
          {isMobileMenu && (
            <div className="absolute top-14 rounded-md shadow-lg bg-slate-100 text-black">
              <ul className="w-40 text-base rounded-lg flex flex-col shadow-lg ">
                <li
                  className="text-base hover:text-activeText duration-100 transition-all ease-in-out cursor-pointer hover:text-lg hover:bg-slate-200 px-4 py-2 flex flex-row items-center gap-4"
                  onClick={() => setMobileMenu(false)}
                >
                  <MdHome className="text-xl" /> Home
                </li>
                <li
                  className="text-base hover:text-activeText duration-100 transition-all ease-in-out cursor-pointer  hover:text-lg hover:bg-slate-200 px-4 py-2 flex flex-row items-center gap-4"
                  onClick={() => setMobileMenu(false)}
                >
                  <MdMenuBook className="text-xl" /> Menu
                </li>
                <li
                  className="text-base hover:text-activeText duration-100 transition-all ease-in-out cursor-pointer  hover:text-lg hover:bg-slate-200 px-4 py-2 flex flex-row items-center gap-4"
                  onClick={() => setMobileMenu(false)}
                >
                  <MdAnnouncement className="text-xl" />
                  About Us
                </li>
                <li
                  className="text-base hover:text-activeText duration-100 transition-all ease-in-out cursor-pointer  hover:text-lg hover:bg-slate-200 px-4 py-2 flex flex-row items-center gap-4"
                  onClick={() => setMobileMenu(false)}
                >
                  <MdRestaurant className="text-xl" /> Service
                </li>
              </ul>
            </div>
          )}
        </div>

        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-12 object-cover" />
          <p className="text-xl font-bold text-activeText ml-0">Food</p>
        </Link>
        <div className="relative text-center items-center">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : avatar}
            alt={"avatar"}
            referrerPolicy="no-referrer"
            className="w-10 min-w-[40px] min-h-[40px] shadow-md rounded-full"
            onClick={login}
          />

          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 absolute text-base rounded-lg bg-gray-50 flex flex-col top-10 right-2 shadow-lg"
            >
              <div
                className="relative flex items-center justify-center py-3"
                onClick={showCart}
              >
                <MdShoppingBasket className="text-textColor text-2xl cursor-pointer hover:scale-110 hover:text-activeText" />
                {cartItems && cartItems.length > 0 && (
                  <div className=" relative -top-1 w-5 h-5 rounded-full bg-activeText flex items-center justify-center">
                    <p className="text-sm text-white font-semibold">
                      {cartItems.length}
                    </p>
                  </div>
                )}
              </div>
              {user && user.email === "hackerabcxyz77@gmail.com" && (
                <Link to="/createItem">
                  <p
                    className="hover:bg-gray-200 rounded-lg px-4 py-2 flex gap-3 cursor-pointer transition-all ease-in-out items-center"
                    onClick={() => setIsMenu(false)}
                  >
                    New Item
                    <MdAdd />
                  </p>
                </Link>
              )}
              <p
                className="hover:bg-gray-200 rounded-lg px-4 py-2 flex gap-3 cursor-pointer transition-all ease-in-out items-center"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Header;
