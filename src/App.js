import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { CartContainer, CreateContainer, Footer, Header, MainContainer } from "./components";
import { actionType } from "./context/reducer";
import { useGlobalState } from "./context/stateProvider";
import Menu from "./pages/Menu";
import { getAllData } from "./utils/firebaseFunctions";
const App = () => {
  const [{cartShow}, dispatch] = useGlobalState();
  const fetchAllData = async () => {
    await getAllData().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchAllData();
  });

  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-auto flex flex-col">
        <Header />
        <main className="mt-14 px-4 py-4 md:mt-20 md:px-16 w-full bg-slate-100">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </main>
        <Footer />
        {cartShow && <CartContainer />}
      </div>
    </AnimatePresence>
  );
};
export default App;
