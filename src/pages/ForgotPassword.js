import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import ButtonComponent from "../components/Button/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const onChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent.");
    } catch {
      toast.error("Could not send reset email.");
    }
  };

  return (
    <PageContainer>
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmitHandler}>
          <input
            type="email"
            value={email}
            id="email"
            className="emailInput"
            onChange={onChangeHandler}
          />
          <div className="buttons-container">
            <Link to="/sign-in"> Sign In Instead</Link>
            <ButtonComponent>Send Reset Link</ButtonComponent>
          </div>
        </form>
      </main>
    </PageContainer>
  );
};

export default ForgotPassword;

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .pageHeader {
    font-size: 2rem;
    margin: 1rem 0;
  }
  main {
    width: 30%;
  }
  input {
    border: 1px solid black;
    border-radius: none;
    height: 2rem;
    width: 10rem;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
  .buttons-container {
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
