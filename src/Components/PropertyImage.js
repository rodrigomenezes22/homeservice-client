import React, { useState } from "react";
import axios from "axios";

function ImageUploadForm() {
  const [file, setFile] = useState(null);
  const [altdescription, setAltdescription] = useState("");
  const [propertyid, setPropertyid] = useState(10);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitleInputChange = (event) => {
    setAltdescription(event.target.value);
  };

  const handlePropertyIdInputChange = (event) => {
    setPropertyid(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("altdescription", altdescription);
    formData.append("propertyid", propertyid);
    console.log("********");
    console.log(formData);
    console.log("********");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/propertyImage/upload-image`,
        formData
      );
      console.log(response.data.secureUrl);
      console.log(response.data.altdescription);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Image File:
        <input type="file" onChange={handleFileInputChange} />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={altdescription}
          onChange={handleTitleInputChange}
        />
      </label>
      <label>
        PropertyID:
        <input
          type="text"
          value={propertyid}
          onChange={handlePropertyIdInputChange}
        />
      </label>
      <br />
      <button type="submit">Upload Image</button>
    </form>
  );
}

export default ImageUploadForm;
