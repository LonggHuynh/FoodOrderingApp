import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC3ARs4_WXOWVLfKM1NFdeaBqli1DWW4Ik",
    authDomain: "restaurant-de740.firebaseapp.com",
    databaseURL: "https://restaurant-de740-default-rtdb.firebaseio.com",
    projectId: "restaurant-de740",
    storageBucket: "restaurant-de740.appspot.com",
    messagingSenderId: "992483210634",
    appId: "1:992483210634:web:50c90939845c82265b4473"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };