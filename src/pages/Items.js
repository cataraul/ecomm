import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import SHOP_DATA from "../shopData";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase.config";
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import { toast } from "react-toastify";
import CollectionItem from "../components/Collection/CollectionItem";

const Items = () => {
  //Getting the collection item that the user clicked
  const location = useLocation();
  // Removing non-alphanumeric characters from the string
  const itemsName = location.pathname.replace(/\W/g, "");
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
    <ItemsContainer>
      {SHOP_DATA.filter((item) => item.title.toLowerCase() == itemsName).map(
        (item) => {
          return item.items.map((clothingItem) => {
            return (
              <CollectionItem
                key={clothingItem.id}
                item={clothingItem}
                checkIfItemExists={checkIfItemExists}
              ></CollectionItem>
            );
          });
        }
      )}
    </ItemsContainer>
  );
};

export default Items;

const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  row-gap: 1rem;
`;
