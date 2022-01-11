import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/profile.scss";
import ButtonComponent from "../components/Button/Button";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import styled from "styled-components";
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
    zipcode: auth.currentUser.zipcode,
    city: auth.currentUser.city,
  });
  const getData = async () => {
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
        <UserData>
          <span>Name - </span>
          {formData.name}
        </UserData>
        <UserData>
          <span>Email - </span> {formData.email}
        </UserData>
        <UserData>
          <span>Address - </span> {formData.address}
        </UserData>
        <UserData>
          <span>City - </span> {formData.city}
        </UserData>
        <UserData>
          <span>Zipcode - </span>
          {formData.zipcode}
        </UserData>
        <UserData>
          <span>Phone Number - </span>
          {formData.phoneNumber}
        </UserData>
      </main>
    </div>
  );
};

export default Profile;

const UserData = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  margin: 1rem 0;
  span {
    font-size: 1.3rem;
  }
`;
