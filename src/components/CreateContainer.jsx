import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import {
  MdAttachMoney,
  MdCloudCircle,
  MdDelete,
  MdFastfood,
  MdFoodBank,
} from "react-icons/md";
import { actionType } from "../context/reducer";
import { useGlobalState } from "../context/stateProvider";
import { storage } from "../firebase.config";
import { categories } from "../utils/data";
import { getAllData, saveData } from "../utils/firebaseFunctions";
import Loader from "./Loader";

const CreateContainer = () => {
  const [dispatch] = useGlobalState();
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
    const uploadFile = uploadBytesResumable(storageRef, imageFile);
    //https://firebase.google.com/docs/storage/web/upload-files  //code copy from
    uploadFile.on(
      "state_changed", //three function snapshot ,error ,success
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        setFields(true);
        setAlertStatus("danger");
        setMsg("Something wrong While Uploading");
        setTimeout(() => {
          setIsLoading(false);
          setFields(false);
        }, 5000);
      },
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
        });

        setFields(true);
        setAlertStatus("success");
        setMsg("Upload successful");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 5000);
      }
    );
  };
  const deleteImage = () => {
    setIsLoading(true);
    const deleteImg = ref(storage, imageAsset);
    deleteObject(deleteImg).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setAlertStatus("success");
      setMsg("Delete successful");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 5000);
    });
  };
  const saveDetails = useCallback(() => {
    try {
      if (!title || !price || !calories || !categories || !imageAsset) {
        setFields(true);
        setAlertStatus("danger");
        setMsg("Required fields need to be provided");
        setTimeout(() => {
          setIsLoading(false);
          setFields(false);
        }, 5000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title,
          price,
          calories,
          category,
          qty: 1,
          imageURL: imageAsset,
        };
        const clearData = () => {
          setPrice("");
          setCalories("");
          setImageAsset(null);
          setTitle("");
          setCategory(null);
        };
        const fetchAllData = async () => {
          await getAllData().then((data) => {
            dispatch({
              type: actionType.SET_FOOD_ITEMS,
              foodItems: data,
            });
          });
        };

        saveData(data);
        setIsLoading(false);
        setFields(true);
        setAlertStatus("success");
        setMsg("Item Uploaded successfully");
        clearData();
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 5000);
        fetchAllData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setAlertStatus("danger");
      setMsg("Something wrong While Uploading");
      setTimeout(() => {
        setIsLoading(false);
        setFields(false);
      }, 5000);
    }
  }, [title, calories, category, imageAsset, dispatch, price]);

  return (
    <div className="w-full h-auto md:h-550 bg-gray-100  flex items-center justify-center ">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg flex flex-col items-center justify-center">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full rounded-lg text-center text-lg ${
              alertStatus === "danger"
                ? "text-red-900 bg-red-300 pt-2"
                : "text-emerald-700 bg-emerald-400 pt-2"
            } `}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title.."
            className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400"
          />
        </div>
        <div className="w-full">
          <select
            className="py-2 bg-white w-full rounded-br"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option className="bg-white" value={"other"}>
              Select Category
            </option>
            {categories.map((item) => {
              const { id, name, urlParamName } = item;
              return (
                <option
                  key={id}
                  className="text-base border-0 outline-none capitalize bg-white text-heading "
                  value={urlParamName}
                >
                  {name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="group flex justify-center items-center flex-col border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg ">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudCircle className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                      <input
                        type="file"
                        name="upload-image"
                        accept="image/*"
                        onChange={uploadImage}
                        className="w-0 h-0"
                      />
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute bottom-3 rounded-lg p-2 bg-red-500 text-xl outline-none cursor-pointer hover:shadow-md transition-all ease-in-out duration-100"
                      onClick={deleteImage}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row">
          <div
            className="w-full py-2 border-b border-gray-300   flex items-center gap-2 bg-gray-200 md:border-r
          "
          >
            <MdAttachMoney className="text-xl text-gray-700" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 "
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2 bg-gray-200">
            <MdFoodBank className="text-xl text-gray-700" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className="flex items-center w-full ">
          <button
            className="ml-0 md:ml-auto w-full md:w-auto border-none bg-emerald-500 hover:bg-emerald-700 rounded-b md:rounded-none px-12 py-2 text-lg text-white font-semibold outline-none "
            type="button"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateContainer;
