import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";
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
import "../styles/signin.scss";
import styled from "styled-components";
// import ButtonComponent from "../components/Button/Button";

const SignUp = () => {
  //This state will hold the form data that user inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    city: "",
    zipcode: "",
    cartItems: [],
  });
  //Destructuring from the form data the email and password
  const { name, email, password, address, phoneNumber, city, zipcode } =
    formData;
  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      //Keeping The previous data that formData had
      ...prevState,
      //[e.target.id] gives us the id of the input that we type in and based on that we set the property(either its nam, email or password) to that inputs value
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
        phoneNumber: phoneNumber,
        address: address,
        city: city,
        zipcode: zipcode,
      });
      // Copying form data and deleting the password so we dont put it in database
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      //adding the User the database
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (err) {
      toast.error("Something went wrong with registration");
    }
  };

  const navigate = useNavigate();
  return (
    <div className="sign-in-container">
      <h1>Welcome!</h1>
      <form onSubmit={onSubmitHandler} id="sign-up-form">
        <div className="input-container">
          <i>
            <FontAwesomeIcon icon={faIdCard} />
          </i>
          <input
            type="text"
            placeholder="Full Name..."
            id="name"
            value={name}
            onChange={onChangeHandler}
          />
        </div>
        <div className="input-container">
          <i>
            <FontAwesomeIcon icon={faUser} />
          </i>
          <input
            type="email"
            placeholder="Email..."
            id="email"
            value={email}
            onChange={onChangeHandler}
          />
        </div>
        <div className="input-container">
          <i>
            <FontAwesomeIcon icon={faLock} />
          </i>
          <input
            type="password"
            placeholder="Password..."
            id="password"
            value={password}
            onChange={onChangeHandler}
          />
        </div>
        <div className="input-container">
          <i>
            <FontAwesomeIcon icon={faAddressBook} />
          </i>
          <input
            type="text"
            placeholder="Address..."
            id="address"
            value={address}
            onChange={onChangeHandler}
          />
        </div>
        <div className="input-container">
          <i>
            <FontAwesomeIcon icon={faCity} />
          </i>
          <input
            type="text"
            placeholder="City..."
            id="city"
            value={city}
            onChange={onChangeHandler}
          />
        </div>
        <div className="input-container">
          <i>
            <FontAwesomeIcon icon={faMapPin} />
          </i>
          <input
            type="text"
            placeholder="Zipcode..."
            id="zipcode"
            value={zipcode}
            onChange={onChangeHandler}
          />
        </div>
        <div className="input-container">
          <i>
            <FontAwesomeIcon icon={faPhone} />
          </i>
          <input
            type="tel"
            placeholder="Phone Number..."
            id="phoneNumber"
            value={phoneNumber}
            onChange={onChangeHandler}
          />
        </div>
        <div className="buttons">
          <ButtonComponent className="button">Sign Up</ButtonComponent>
        </div>
      </form>
      <Link to="/sign-in" className="forgot-password sign-up">
        Sign In Instead
      </Link>
    </div>
  );
};

export default SignUp;

const ButtonComponent = styled.button`
  height: 3rem;
  width: 10rem;
  background-color: #030303;
  color: #fefefe;
  border: none;
  transition: all 0.3s ease;
  text-transform: uppercase;
  border: 1px solid #fefefe;
  cursor: pointer;
  &:hover {
    background-color: #fefefe;
    color: black;
    border: 1px solid black;
  }
`;
