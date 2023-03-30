import React, { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AddTask() {
  const [file, setFile] = useState(null);
  const [title, SetTitle] = useState("");
  const [description, SetDescription] = useState("");
  const [status, SetStatus] = useState("");
  const [date, SetDate] = useState("");
  const [ categoyList, setCategoryList ] = useState([]);
  const [ categoryid, setCategoryId ] = useState("");

  const getAllCategories = async () => {

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/category`, {
        method: "GET",
        headers: { jwtToken: localStorage.jwtToken }
      });

      const categoryData = await res.json();

      console.log(categoryData);

      setCategoryList(categoryData);

    } catch (error) {
      console.log(error);
    }
  };

useEffect(()=>{
  getAllCategories();
},[]);


  const [imagedescription, SetImagedescription] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const propertyid = id;

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    console.log(`File selected: ${file}`);
  };
  const handletitleInputChange = (event) => {
    SetTitle(event.target.value);
  };
  const handledescriptionInputChange = (event) => {
    SetDescription(event.target.value);
  };
  const handlestatusInputChange = (event) => {
    SetStatus(event.target.value);
  };
  const handledateInputChange = (event) => {
    SetDate(event.target.value);
  };

  const handleSelectInputChange = (event) => {
    setCategoryId(event.target.value);

  };
  // const handlepropertyidInputChange = (event) => {
  //   SetPropertyid(event.target.value);
  // };
  const handleimagedescriptionInputChange = (event) => {
    SetImagedescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("date", date);
    formData.append("propertyid", propertyid);
    formData.append("imagedescription", imagedescription);
    formData.append("categories", categoryid);
    console.log(categoryid);
    console.log("********");
    console.log(formData);
    console.log("********");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/task/add`,
        formData
      );
      console.log(response.data.secureUrl);

      setFile(null);
      SetTitle("");
      SetStatus("");
      SetDescription("");
      SetDate("");
      SetImagedescription("");

      // Navigate(`/task/${response.data.}`);
      navigate(`/manage-tasks/${propertyid}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=> {
    console.log(categoryid);
  },[categoryid]);


  // const { id } = useParams();
  // const propertyid = id;

  return (
    <div className="container justify-content-center d-flex align-items-center">
      <div className="has-max-width mt-5">
        <div className=" p-4">
          <h3 className="font-primary h4 pb-4">Add a new Task</h3>
          <form onSubmit={handleSubmit}>
            <h3 className="opensans font-primary h4 mt-3 text-start"></h3>
            <label for="title" className="label mt-3">
              Title:
            </label>
            <input
              type="text"
              placeholder="title Name"
              className="form-control"
              name="title"
              value={title}
              onChange={handletitleInputChange}
            />
            <label for="Description" className="label mt-3">
              Description:
            </label>
            <input
              type="text"
              placeholder="Description name"
              className="form-control"
              name="description"
              value={description}
              onChange={handledescriptionInputChange}
            />
            <label for="status" className="label mt-3">
              status:
            </label>
            <input
              type="text"
              placeholder="status"
              className="form-control"
              name="status"
              value={status}
              onChange={handlestatusInputChange}
            />
            <label for="date" className="label mt-3">
              date:
            </label>
            <input
              type="date"
              placeholder="date"
              className="form-control"
              name="date"
              value={date}
              onChange={handledateInputChange}
            />

            <select name="categories" id="categories" onChange={handleSelectInputChange} value={categoryid}>
              <option value="">Please Select a Category</option>
              {categoyList && categoyList.map((category) => (<option value={category?.categoryid}>{category?.category}</option>) )}
            </select>

            <label for="image" className="label mt-3">
              Image File:
              <input
                className="form-control"
                type="file"
                onChange={handleFileInputChange}
              />
            </label>
            <label for="imagedescription" className="label mt-3">
              imagedescription:
              <input
                type="text"
                placeholder="imagedescription"
                className="form-control"
                name="imagedescription"
                value={imagedescription}
                onChange={handleimagedescriptionInputChange}
              />
            </label>

            <input
              type="hidden"
              className="form-control"
              name="propertyid"
              value={propertyid}
            />
            {/* <label for="propertyid" className="label mt-3">
              propertyid:
            </label>
            <input
              type="text"
              placeholder="propertyid"
              className="form-control mb-3"
              name="propertyid"
              value={propertyData.propertyid}
              onChange={handlepropertyidInputChange}
            /> */}
            <br></br>
            <button type="submit" className="btn btn-primary mt-3">
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
