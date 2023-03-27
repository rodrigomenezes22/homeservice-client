import React, { useState } from "react";
import axios from "axios";

function CategoryUploadForm() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handledescriptionInputChange = (event) => {
    setDescription(event.target.value);
  };

  const handlecategoryInputChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("category", category);
    console.log("********");
    console.log(formData);
    console.log("********");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/category/upload-image`,
        formData
      );
      console.log(response.data.secureUrl);
      console.log(response.data.description);
    } catch (error) {
      console.error(error);
    }
    setDescription("");
    setCategory("");
    setFile(null);
  };

  return (
    <>
      <h2> Category </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Image File:
          <input type="file" onChange={handleFileInputChange} />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={handledescriptionInputChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={handlecategoryInputChange}
          />
        </label>
        <br />
        <button type="submit">Upload Image</button>
      </form>
    </>
  );
}

export default CategoryUploadForm;
