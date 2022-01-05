import React, { useState, useEffect } from "react";
import { db } from "../firebase.config";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  increment,
  collection,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styled from "styled-components";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const auth = getAuth();
  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getData();
      } else {
      }
    });
  };
  const getData = async () => {
    const docRef = doc(db, "users", `${auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCartItems([...docSnap.data().cartItems]);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <div>
      {cartItems.map((item) => {
        return (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <h2>{item.price}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Checkout;
