import React, { useState, useEffect, useContext } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/profile.scss";
import ButtonComponent from "../components/Button/Button";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import {
  faUser,
  faLock,
  faIdCard,
  faAddressBook,
  faPhone,
  faMapPin,
  faCity,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import CartContext from "../context/cart/CartContext";

const Profile = () => {
  const { cartItemsContext } = useContext(CartContext);

  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    getData();
    return () => {
      setFormData([]);
    };
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
    window.location.reload();
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <div className="buttons">
          <Link to="/edit-email">
            <ButtonComponent style={{ marginRight: "0.5rem" }}>
              Change Email
            </ButtonComponent>
          </Link>

          <ButtonComponent
            type="button"
            className="logOut"
            onClick={() => onLogout()}
          >
            Logout
          </ButtonComponent>
        </div>
      </header>
      <main>
        <UserData>
          <span>
            <FontAwesomeIcon
              icon={faIdCard}
              style={{ fontSize: "1rem", marginRight: "0.5rem" }}
            />{" "}
            Email -{" "}
          </span>{" "}
          {formData.email}
        </UserData>
        <UserDataContainer>
          <UserData>
            <FontAwesomeIcon
              icon={faUser}
              style={{ fontSize: "1rem", marginRight: "0.5rem" }}
            />{" "}
            Name - <span></span>
            {formData.name}
          </UserData>
          <UserData>
            <span>
              <FontAwesomeIcon
                icon={faCity}
                style={{ fontSize: "1rem", marginRight: "0.5rem" }}
              />{" "}
              City -{" "}
            </span>{" "}
            {formData.city}
          </UserData>
          <UserData>
            <span>
              <FontAwesomeIcon
                icon={faAddressBook}
                style={{ fontSize: "1rem", marginRight: "0.5rem" }}
              />{" "}
              Address -{" "}
            </span>{" "}
            {formData.address}
          </UserData>

          <UserData>
            <span>
              <FontAwesomeIcon
                icon={faMapPin}
                style={{ fontSize: "1rem", marginRight: "0.5rem" }}
              />{" "}
              Zipcode -{" "}
            </span>
            {formData.zipcode}
          </UserData>
          <UserData>
            <FontAwesomeIcon
              icon={faPhone}
              style={{
                fontSize: "1rem",
                marginRight: "0.5rem",
              }}
            />{" "}
            <span>Phone Number - </span>
            {formData.phoneNumber}
          </UserData>
          <Link to="/update-profile">
            <ButtonComponent>Edit Profile Data</ButtonComponent>
          </Link>
        </UserDataContainer>
      </main>
    </div>
  );
};

export default Profile;

const UserData = styled.p`
  border: 1px solid black;
  font-size: 1.6rem;
  font-weight: 600;
  padding-bottom: 0.25rem;
  width: 20rem;
  margin: 1rem 0;

  span {
    font-size: 1.3rem;
    padding: 0 0.25rem;
  }
`;
const UserDataContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
