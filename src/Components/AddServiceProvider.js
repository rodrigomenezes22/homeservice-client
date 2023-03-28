import React, { useState } from "react";
import axios from "axios";

function AddServiceProviderForm() {
  const [file, setFile] = useState(null);
  const [firstname, SetFirstname] = useState("");
  const [lastname, SetLastname] = useState("");
  const [email, SetEmail] = useState("");
  const [username, SetUsername] = useState("");
  const [phone, SetPhone] = useState("");
  const [city, SetCity] = useState("");
  const [categoryid, SetCategoryid] = useState("");
  const [description, SetDescription] = useState("");

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleFirstNameInputChange = (event) => {
    SetFirstname(event.target.value);
  };
  const handleLastNameInputChange = (event) => {
    SetLastname(event.target.value);
  };
  const handleEmailInputChange = (event) => {
    SetEmail(event.target.value);
  };
  const handleUserNameInputChange = (event) => {
    SetUsername(event.target.value);
  };
  const handlePhoneInputChange = (event) => {
    SetPhone(event.target.value);
  };
  const handleCityInputChange = (event) => {
    SetCity(event.target.value);
  };
  const handleDescriptionInputChange = (event) => {
    SetDescription(event.target.value);
  };
  const handleCategoryIDInputChange = (event) => {
    SetCategoryid(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("phone", phone);
    formData.append("city", city);
    formData.append("categoryid", categoryid);
    formData.append("description", description);

    console.log("********");
    console.log(formData);
    console.log("********");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/serviceProviders/add`,
        formData
      );
      console.log(response.data.secureUrl);

      setFile(null);
      SetUsername("");
      SetFirstname("");
      SetLastname("");
      SetEmail("");
      SetPhone("");
      SetCity("");
      SetCategoryid("");
      SetDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2> Add Service Provider </h2>
      <form onSubmit={handleSubmit}>
        <label className="col-12 form-label">
          Image File:
          <input
            className="form-control"
            type="file"
            onChange={handleFileInputChange}
          />
        </label>

        <label className="col-12 form-label">
          Username:
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={handleUserNameInputChange}
          />
        </label>

        <label className="col-12 form-label">
          First name:
          <input
            className="form-control"
            type="text"
            value={firstname}
            onChange={handleFirstNameInputChange}
          />
        </label>
        <label className="col-12 form-label">
          Last name:
          <input
            className="form-control"
            type="text"
            value={lastname}
            onChange={handleLastNameInputChange}
          />
        </label>
        <label className="col-12 form-label">
          Email:
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={handleEmailInputChange}
          />
        </label>

        <label className="col-12 form-label">
          Phone:
          <input
            className="form-control"
            type="text"
            value={phone}
            onChange={handlePhoneInputChange}
          />
        </label>

        <label className="col-12 form-label">
          City:
          <input
            className="form-control"
            type="text"
            value={city}
            onChange={handleCityInputChange}
          />
        </label>

        <label className="col-12 form-label">
          Description:
          <input
            className="form-control"
            type="text"
            value={description}
            onChange={handleDescriptionInputChange}
          />
        </label>

        <label className="col-12 form-label">
          Category:
          <input
            className="form-control"
            type="text"
            value={categoryid}
            onChange={handleCategoryIDInputChange}
          />
        </label>

        <br />
        <button type="submit" className="btn btn-primary">
          Create Service Provider
        </button>
      </form>
    </>
  );
}

export default AddServiceProviderForm;
