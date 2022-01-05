import React from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "../../styles/collection.scss";
import CollectionItem from "./CollectionItem";

const PreviewCollection = ({ title, items }) => {
  const auth = getAuth();
  const getData = async (item) => {
    const docRef = doc(db, "users", `${auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let prevItems = [...docSnap.data().cartItems];
      await updateDoc(doc(db, "users", `${auth.currentUser.uid}`), {
        cartItems: [...prevItems, item],
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  const addItemsToUsersDatabase = async (prevItems) => {};
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
              <CollectionItem key={item.id} item={item} getData={getData} />
            );
          })}
      </div>
    </div>
  );
};

export default PreviewCollection;
