import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/profile.scss";
import ButtonComponent from "../components/Button/Button";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    address: auth.currentUser.address,
    phoneNumber: auth.currentUser.phoneNumber,
  });
  const getData = async () => {
    // const q = query(collection(db, "users")) ;

    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    //   if (doc.id === auth.currentUser.uid) {
    //     console.log(true);
    //   }
    // });

    const docRef = doc(db, "users", `${auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      setFormData(() => ({ ...data }));
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <ButtonComponent type="button" className="logOut" onClick={onLogout}>
          Logout
        </ButtonComponent>
      </header>
      <main>
        Name: <h2>{formData.name}</h2>
        Email: <h2>{formData.email}</h2>
        Address: <h2>{formData.address}</h2>
        Phone Number: <h2>{formData.phoneNumber}</h2>
      </main>
    </div>
  );
};

export default Profile;
