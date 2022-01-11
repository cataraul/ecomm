import React from "react";
import styled from "styled-components";
import {
  faCreditCard,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";

const CardInfo = ({ paymentHandler }) => {
  return (
    <CardInfoContainer>
      <h2>
        Enter Card Details <FontAwesomeIcon icon={faCreditCard} />
      </h2>
      <form onSubmit={(e) => paymentHandler(e)}>
        <label htmlFor="card-number">Enter Card Number</label>
        <input
          id="card-number"
          type="tel"
          inputMode="numeric"
          pattern="[0-9\s]{13,19}"
          autoComplete="cc-number"
          maxLength="19"
          placeholder="xxxx xxxx xxxx xxxx"
          required
        />
        <label htmlFor="card-name">Card Holder</label>
        <input
          type="text"
          id="card-name"
          placeholder="Please enter your full name"
          required
        />
        <div className="expiration-date">
          <div className="expiration-container">
            <label htmlFor="year">Expiration Year</label>
            <select name="year" id="year">
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </div>
          <div className="expiration-container">
            <label htmlFor="month">Month</label>
            <select name="month" id="month">
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">January</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          <div className="expiration-container">
            <label htmlFor="cvv"> Cvv</label>
            <input
              type="number"
              maxLength="4"
              placeholder="CVV"
              id="cvv"
              required
            />
          </div>
        </div>
        <Button type="submit">Pay</Button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        <FontAwesomeIcon icon={faExclamationTriangle} />
        Plase make sure that the data introduced is correct.
      </p>
    </CardInfoContainer>
  );
};

export default CardInfo;

const CardInfoContainer = styled.div`
  border: 1px solid black;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 30rem;
  form {
    display: flex;
    flex-direction: column;
    width: 25rem;
    label {
      margin: 0.2rem 0;
    }
    input,
    select {
      height: 2rem;
      background-color: #fefefe;
      color: #000000;
      border: 1px solid black;
      border-radius: 0.4rem;
    }
    .expiration-date {
      display: flex;
      justify-content: space-between;
      margin: 0.5rem 0;
    }
    button {
      height: 2rem;
      background-color: #fefefe;
      color: #000000;
      border: 1px solid black;
      border-radius: 0.4rem;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
