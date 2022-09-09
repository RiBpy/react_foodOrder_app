import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";
//setDoc is used for creating a store in firebase,if its present then it will update it
//set data to firebase
export const saveData=(data)=>{
    const DataRef = collection(firestore, "foodItems");
    setDoc(doc(DataRef,`${Date.now()}`),data,{merger:true})
}

//get data
export const getAllData =async()=>{ 
const q =query(collection(firestore, "foodItems"),orderBy("id","desc")); //last added product will be shown first.
const querySnapshot = await getDocs(q);
return querySnapshot.docs.map(doc=>doc.data());
}
