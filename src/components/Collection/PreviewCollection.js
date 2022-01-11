import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase.config";
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import "../../styles/collection.scss";
import CollectionItem from "./CollectionItem";
import { toast } from "react-toastify";

const PreviewCollection = ({ title, items }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCopy, setCartItemsCopy] = useState([]);

  const auth = getAuth();
  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData();
      }
    });
  };
  const fetchData = async () => {
    const docRef = doc(db, "users", `${auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setCartItems([...docSnap.data().cartItems]);
      setCartItemsCopy([...docSnap.data().cartItems]);
    }
  };

  const checkIfItemExists = (item) => {
    if (cartItems.some((cartItem) => cartItem.name === item.name)) {
      updateItemQuantity(item);
    } else {
      toast.success("Item added to cart!");
      getData(item);
    }
  };
  const setItemToFirestore = async () => {
    await updateDoc(doc(db, "users", `${auth.currentUser.uid}`), {
      cartItems: deleteField(),
    });

    await updateDoc(doc(db, "users", `${auth.currentUser.uid}`), {
      cartItems: [...cartItemsCopy],
    });
  };

  const updateItemQuantity = async (item) => {
    console.log(cartItemsCopy);
    cartItemsCopy.map((cartItemCopy) => {
      if (cartItemCopy.id === item.id) {
        if (cartItemCopy.quantity < 3) {
          cartItemCopy.quantity++;
          setItemToFirestore();
        } else {
          toast.warn("3 items of the same type is the limit.");
        }
      }
    });
  };
  const getData = async (item) => {
    const docRef = doc(db, "users", `${auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let prevItems = docSnap.data().cartItems;
      await updateDoc(doc(db, "users", `${auth.currentUser.uid}`), {
        cartItems: [...prevItems, item],
      });
    }
    fetchData();
  };

  return (
    <div className="collection-preview">
      <Link to={`/${title.toLowerCase()}`} className="title-link">
        <h1 className="title">{title.toUpperCase()}</h1>
      </Link>
      <div className="preview">
        {items
          .filter((item, idx) => idx < 4)
          .map((item) => {
            return (
              <CollectionItem
                key={item.id}
                item={item}
                cartItems={cartItems}
                checkIfItemExists={checkIfItemExists}
              />
            );
          })}
      </div>
    </div>
  );
};

export default PreviewCollection;
