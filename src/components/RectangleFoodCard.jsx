import { motion } from "framer-motion";
import { MdShoppingBasket } from "react-icons/md";
const RectangleFoodCard = ({ item, cartItems, setItems }) => {
  const { price, imageURL, title } = item;

  return (
    <div className="w-[350px] min-w-[300px] md:min-w-[380px] md:my-10 backdrop-blur-lg mx-1 my-2 lg:mx-2">
      <div className="w-full flex flex-row items-center justify-between bg-white rounded-lg shadow-md py-2 px-4 hover:bg-gray-100 min-h-[150px]">
        <motion.img
          whileHover={{ scale: 1.2 }}
          src={imageURL}
          alt="Food"
          className="w-30 max-h-40 -mt-8 duration-100 drop-shadow-2xl"
        />
        <div className="flex flex-col items-end justify-end gap-4">
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-md bg-orange-500 hover:bg-orange-600 flex items-center justify-center"
            onClick={() => setItems([...new Set(cartItems), item])}
          >
            <MdShoppingBasket className="text-white text-2xl" />
          </motion.button>
          <div className="text-right">
            <p className="text-gray-800 md:text-lg text-base">{title}</p>
            <p className="text-sm text-gray-500">
              <span className="text-orange-600">$</span> {price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RectangleFoodCard;
