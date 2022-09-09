import React from "react";
import {
  MdFacebook,
  MdLocationPin,
  MdMobileFriendly,
  MdOutgoingMail,
  MdYoutubeSearchedFor,
} from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../img/food.png";
const Footer = () => {
  return (
    <div className="w-full h-auto  flex flex-row justify-between bg-gray-200 py-8 px-14 gap-4 ">
      <div className="flex flex-col  md:w-60">
        <Link to="/">
          {" "}
          <img src={Logo} alt="logo" className="w-16 h-16 rounded-lg" />
        </Link>
        <p className="text-sm align-justify ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Pariatur,dolorem!
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className=" hidden md:block">
          <div className="flex">
            <MdMobileFriendly className="text-xl mx-2" />
            <h3>0123456789</h3>
          </div>
          <div className="flex items-center">
            <MdLocationPin className="text-xl mx-2" />
            <h3>Noakhali,Bangladesh</h3>
          </div>
          <div className="mx-2">
            <h4 className=" md:ml-1">
              &copy;
              <Link to="https//:wwww.linkedin.com/in/ribpy">Riaz Bappy</Link>
            </h4>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center ">
        <h3 className="my-2">Find Us On</h3>
        <div className="flex flex-row gap-2 text-white">
          <div className="w-10 h-10 bg-orange-500 rounded-full drop-shadow-lg p-2 hover:bg-orange-600">
            <MdFacebook className="text-2xl cursor-pointer" />
          </div>
          <div className="w-10 h-10 bg-orange-500 rounded-full drop-shadow-lg p-2 hover:bg-orange-600">
            <MdOutgoingMail className="text-2xl cursor-pointer " />
          </div>
          <div className="w-10 h-10 bg-orange-500 rounded-full drop-shadow-lg p-2 hover:bg-orange-600">
            <MdYoutubeSearchedFor className="text-2xl cursor-pointer " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
