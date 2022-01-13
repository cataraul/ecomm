import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import ButtonComponent from "../components/Button/Button";
import "../styles/signin.scss";

const EditProfileData = () => {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    city: "",
    address: "",
    zipcode: "",
    phoneNumber: "",
  });
  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  //Destructuring from the form data the email and password
  const { city, address, zipcode, phoneNumber } = formData;
  const onSubmitHandler = async (e) => {
    e.preventDefault(e);
    try {
      await updateProfile(auth.currentUser, {
        city: city,
        address: address,
        zipcode: zipcode,
        phoneNumber: phoneNumber,
      });

      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        city: city,
        address: address,
        zipcode: zipcode,
        phoneNumber: phoneNumber,
      });
      toast.success("Data Updated!");
    } catch (error) {
      toast.error(
        "Could not update profile details. Please log in if you're not already."
      );
    }
  };
  return (
    <div className="sign-in-container">
      <h2>Profile Update</h2>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <div className="input-container">
          <label htmlFor="city">New City</label>
          <input
            type="text"
            id="city"
            placeholder="New City..."
            onChange={onChangeHandler}
          />
        </div>
        <div className="input-container">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="New Address..."
            onChange={onChangeHandler}
          />
        </div>
        <div className="input-container">
          <label htmlFor="zipcode">Zipcode</label>
          <input
            type="text"
            id="zipcode"
            placeholder="New Zipcode..."
            onChange={onChangeHandler}
          />
        </div>
        <div
          className="input-container"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label htmlFor="phone-number">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            placeholder="New Phone Number..."
            onChange={onChangeHandler}
          />
        </div>
        <ButtonComponent>Update Profile </ButtonComponent>
      </form>
    </div>
  );
};

export default EditProfileData;
