import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {

    apiKey: "AIzaSyAHJRQc-gDV2kaUaBpZzfYXWkrDi5rNomo",
  
    authDomain: "restaurantapp-dfe7e.firebaseapp.com",
  
    databaseURL: "https://restaurantapp-dfe7e-default-rtdb.firebaseio.com",
  
    projectId: "restaurantapp-dfe7e",
  
    storageBucket: "restaurantapp-dfe7e.appspot.com",
  
    messagingSenderId: "66912208721",
  
    appId: "1:66912208721:web:b045cae0f68c908dc9b570"
  
  };
  const app=getApps.length>0?getApp():initializeApp(firebaseConfig);
  const firestore=getFirestore(app)
  const storage=getStorage(app)
  export { app, firestore, storage };
