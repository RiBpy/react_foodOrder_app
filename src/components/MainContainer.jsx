import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useGlobalState } from "../context/stateProvider";
import HomeContainer from "./HomeContainer";
import MenuContainer from "./MenuContainer";
import RowContainer from "./RowContainer";
const MainContainer = () => {
  const [{ foodItems }] = useGlobalState();
  const [scrollValue, setScrollValue] = useState(0);
  useEffect(() => {}, [ scrollValue]);
  return (
    <div className="flex flex-col w-full h-auto items-center justify-center">
      <HomeContainer />
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-gray-700 relative before:absolute before:rounded-lg before:content before:w-20 before:bottom-0 before:left-0 before:h-1 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 pb-2">
            our fresh & healthy fruits
          </p>
          <div className="items-center hidden md:flex gap-3">
            <motion.div
              whileTap={{ scale: 0.7 }}
              className="w-6 h-6 rounded-lg bg-orange-300 hover:bg-orange-400 cursor-pointer hover:shadow-lg transition-all ease-in-out duration-100"
            >
              <MdChevronLeft
                className="text-2xl text-white font-semibold "
                onClick={() => setScrollValue(-1000)}
              />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.7 }}
              className="w-6 h-6 rounded-lg bg-orange-300 hover:bg-orange-400 cursor-pointer hover:shadow-lg transition-all ease-in-out duration-100"
            >
              <MdChevronRight
                className="text-2xl text-white font-semibold "
                onClick={() => setScrollValue(1000)}
              />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={
            foodItems
              ? foodItems.filter((el) => el.category === "fruits")
              : console.log("No data found")
          }
        />
      </section>
      <MenuContainer />
    </div>
  );
};
export default MainContainer;
