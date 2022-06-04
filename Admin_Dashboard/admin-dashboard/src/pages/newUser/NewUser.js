import React, { useState } from "react";
import "./newUser.css";
import axios from "axios";

export default function NewUser() {
  const [input, setInput] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    product: "",
    tinNumber: "",
    tradingLicenceNo: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function handleClick(event) {
    event.preventDefault();

    axios
      .post("http://localhost:8000/api/v1/exporters/create", {
        name: input.name,
        companyName: input.companyName,
        email: input.email,
        phone: input.phone,
        country: input.country,
        city: input.city,
        product: input.product,
        tinNumber: input.tinNumber,
        tradingLicenceNo: input.tradingLicenceNo,
      })
      .then((res) => {
        console.log(res.input);
      });
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={input.name}
          />
        </div>
        <div className="newUserItem">
          <label>Company Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="companyName"
            value={input.companyName}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={input.email}
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            onChange={handleChange}
            type="text"
            name="phone"
            value={input.phone}
          />
        </div>
        <div className="newUserItem">
          <label>Country</label>
          <input
            onChange={handleChange}
            type="text"
            name="country"
            value={input.country}
          />
        </div>
        <div className="newUserItem">
          <label>City</label>
          <input
            onChange={handleChange}
            type="text"
            name="city"
            value={input.city}
          />
        </div>
        <div className="newUserItem">
          <label>Product</label>
          <input
            onChange={handleChange}
            type="text"
            name="product"
            value={input.product}
          />
        </div>
        <div className="newUserItem">
          <label>Tin Number</label>
          <input
            onChange={handleChange}
            type="text"
            name="tinNumber"
            value={input.tinNumber}
          />
        </div>
        <div className="newUserItem">
          <label>Trading License Number</label>
          <input
            onChange={handleChange}
            type="text"
            name="tradingLicenceNo"
            value={input.tradingLicenceNo}
          />
        </div>
      </form>
      <button onClick={handleClick} className="newUserButton">
        Create
      </button>
    </div>
  );
}
