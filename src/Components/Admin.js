import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = ({ setAuth, userid, name, setName }) => {

  // Sets the user data values
  const [ userData, setUserData ] = useState({});

  // Check if contact data is filled up
  const [ incompleteRegis, setIncompleteRegis ] = useState(true)

  const [ formError, setFormError] = useState("");

  const [ propertyCount, setPropertyCount ] = useState("");

  const navigate = useNavigate();

  const getProfile = async () => {

    try {
      const res = await fetch(`http://localhost:8000/api/admin/${userid}`, {
        method: "POST",
        headers: { jwtToken: localStorage.jwtToken }
      });

      const parseData = await res.json();
      setName(parseData.email);
      // Getting user information.
      setUserData(parseData);

      if(parseData.firstname === null) {
        setIncompleteRegis(true);
      } else if(parseData.firstname !== null ) {
        setIncompleteRegis(false);
        setName(parseData.firstname)
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  const getProperties = async () => {

    try {
      const res = await fetch(`http://localhost:8000/api/property/user/${userid}`, {
        method: "GET",
        headers: { jwtToken: localStorage.jwtToken }
      });

      const propertyData = await res.json();

      console.log(propertyData);
      
      setPropertyCount(propertyData.length +1);


    } catch (error) {
      console.log(error);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    getProperties();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.firstname === null) {
      return setFormError(`Please enter your name`);
    } else {
      console.log("input value is NOT empty");
    }

    if (userData.lastname === null) {
      return setFormError(`Please enter your last name`);
    } else {
      console.log("input value is NOT empty");
    }

    if (userData.email === null) {
      return setFormError(`E-mail can not be empty`);
    } else {
      console.log("input value is NOT empty");
    }

    if (userData.phone === null) {
      return setFormError(`Phone number can not be empty`);
    } else {
      console.log("input value is NOT empty");
    }
    axios
      .put(`${process.env.REACT_APP_SERVER_BASE_URL}/api/users/${userid}`, userData)
      .then((res) => navigate("/login"))
      .catch((e) => console.log(e));
  };

  return (
    <section className="admin-panel">
      <div className="container">
      <div className="container justify-content-center d-flex align-items-center">
        <div className="has-max-width mt-5">
        <h2 className="opensans font-primary">Welcome {name}</h2>
        { incompleteRegis ? (

            <form onSubmit={handleSubmit}>
            <h3 className="opensans font-primary h4 mt-3 text-start">Update Contact Information</h3>
            <label for="firstname" className="label mt-3">First Name</label>
            <input type="text" placeholder="First name" className="form-control" name="firstname" value={userData.firstname} onChange={handleChange} />
            <label for="lastname"  className="label mt-3">Last Name</label>
            <input type="text" placeholder="Last name" className="form-control" name="lastname" value={userData.lastname} onChange={handleChange} />
            <label for="email"  className="label mt-3">Email</label>
            <input type="email"  className="form-control" name="email" value={userData.email} onChange={handleChange} />
            <label for="phone"  className="label mt-3">Phone</label>
            <input type="number"  placeholder="Phone" className="form-control" name="phone" value={userData.phone} onChange={handleChange} />
            <button className="btn btn-primary prirmary-color mt-3 mb-3">Update Info</button>
            </form>

        ) : (
            <>
            <h2 className="opensans font-primary"></h2>
            <div className="card-admin-properties">
                <div className="card-body">
                  <div className="icon-card">
                  <span class="material-symbols-rounded font-primary icon-xxl">
                    real_estate_agent
                  </span>
                  </div>
                  <div className="text">
                    <h3 className="font-primary h4">Your properties</h3>
                    <p>You have {propertyCount} Property</p>
                  </div>
                </div>
                
                <div className="buttons-card">
                  <button className="card-button button-primary">
                    <span class="material-symbols-rounded">
                    real_estate_agent
                    </span>
                    <p>Manage</p>
                    <p>Properties</p>
                  </button>

                  <button className="card-button button-primary">
                    <span class="material-symbols-rounded">
                    add_box
                    </span>
                    <p>Add</p>
                    <p>Property</p>
                  </button>
                </div>
            </div>
            </>
          )  }

                {formError !== "" ? (
                  <div className="alert alert-warning" role="alert">
                    {formError}
                  </div>
                ) : (
                  <></>
                )}

        <button onClick={e => logout(e)} className="btn btn-primary">
   
          Logout
        </button>
          </div>
        </div>      
      </div>
    </section>
  );
};

export default Admin;