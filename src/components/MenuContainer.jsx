import { motion } from "framer-motion";
import React, { useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { useGlobalState } from "../context/stateProvider";
import { categories } from "../utils/data";
import RowContainer from "./RowContainer";
const MenuContainer = () => {
  const [filter, setFilter] = useState("chicken");
  const [{ foodItems }] = useGlobalState();
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="text-2xl font-semibold capitalize text-gray-700 relative before:absolute before:rounded-lg before:content before:w-20 before:bottom-0 before:left-0 before:h-1 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 pb-2">
        Our Hot Dishes
      </p>
      <div className="w-full flex justify-start items-center lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
        {categories &&
          categories.map((category) => (
            <motion.div
              whileTap={{ scale: 0.75 }}
              key={category.id}
              className={`group ${
                filter === category.urlParamName ? "bg-orange-500" : "bg-white"
              } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-lg flex flex-col gap-3 items-center justify-center hover:bg-orange-500`}
              onClick={() => setFilter(category.urlParamName)}
            >
              <div
                className={`w-10 h-10 rounded-full ${
                  filter === category.urlParamName
                    ? "bg-white"
                    : "bg-orange-500"
                } group-hover:bg-white flex items-center justify-center`}
              >
                <IoFastFood
                  className={`text-xl group-hover:text-black ${
                    filter === category.urlParamName
                      ? "text-black"
                      : "text-white"
                  }`}
                />
              </div>
              <p
                className={`text-sm font-semibold group-hover:text-white ${
                  filter === category.urlParamName
                    ? "text-white"
                    : "text-textColor"
                }`}
              >
                {category.name}
              </p>
            </motion.div>
          ))}
      </div>
      <RowContainer
        flag={false}
        data={foodItems?.filter((item) => item.category === filter)}
      />
    </div>
  );
};

export default MenuContainer;
