import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMO2tI_Vv_LRYLKKL3Io_1GjxdYfCtx3g",
  authDomain: "fake-store-app-9a2fd.firebaseapp.com",
  projectId: "fake-store-app-9a2fd",
  storageBucket: "fake-store-app-9a2fd.appspot.com",
  messagingSenderId: "829166266122",
  appId: "1:829166266122:web:939a4eb8bf1fabb509fcf3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
