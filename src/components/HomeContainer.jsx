import { motion } from "framer-motion";
import React from "react";
import delivery from "../img/delivery.png";
import HomeBg from "../img/heroBg.png";
import { cardData } from "./cardData";
const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 md:gap-2 w-full"
      id="home"
    >
      <div className="py-2 flex flex-col items-center md:items-start gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-200 rounded-full pl-2 py-1">
          <p className="text-base text-orange-500 font-semibold ">
            Bike Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img src={delivery} alt="img" />
          </div>
        </div>
        <p className="text-center text-[2.5rem] md:text-[3.8rem] font-bold tracking-wide text-heading">
          The Fastest Delivery In{" "}
          <span className="text-orange-600 text-[3rem] md:text-[4.2rem]">
            Your City
          </span>
        </p>
        <p className="text-base text-textColor text-justify ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          hic nesciunt numquam! Magni ullam veritatis dolorem dignissimos
          provident. Numquam temporibus omnis vitae inventore quae repellendus,
          nihil velit modi perferendis commodi?
        </p>
        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 py-2 text-white font-bold rounded-lg px-4 hover:shadow-lg transition-all ease-in-out duration-100 hover:"
        >
          Order Now
        </button>
      </div>
      <div className="flex flex-1 py-2 items-center justify-center relative">
        <img
          src={HomeBg}
          className="items-center md:ml-auto h-450 md:h-650"
          alt=""
        />
        <div
          className="w-full h-full absolute flex items-center justify-center gap-2 top-0 left-0 py-4 drop-shadow-lg px-10 md:px-10"
          id="cardData"
        >
          {cardData.map((el) => {
            const { id, name, price, desc, imgSrc } = el;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, x: 400 }}
                animate={{ opacity: 1, x: 1 }}
                exit={{ opacity: 0, x: 400 }}
                className="md:w-190 min-w-[130px] p-2 flex flex-col items-center justify-center bg-cardOverlay backdrop-blur-lg rounded-xl duration-100 ease-in-out"
              >
                <img
                  src={imgSrc}
                  alt="img"
                  className="-mt-10 xl:-mt-20 w-20 lg:w-40 h-30 hover:scale-125 transition-all duration-100 ease-in-out"
                />
                <p className="text-uppercase">{name}</p>
                <small className="text-gray-500">{desc}</small>
                <p className="text-sm text-gray-600">
                  <span>$</span>
                  {price}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default HomeContainer;
