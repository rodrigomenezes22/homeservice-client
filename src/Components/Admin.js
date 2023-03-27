import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = ({ setAuth, userid, name, setName }) => {

  const [ userData, setUserData ] = useState({});

  const [ incompleteRegis, setIncompleteRegis ] = useState(true)

  const [formError, setFormError] = useState("");

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
      .then((res) => navigate("/admin"))
      .catch((e) => console.log(e));
  };


  return (
    <section className="admin-panel">
      <div className="container mt-5">

        <h2 className="opensans font-primary">Welcome {name}</h2>
        { incompleteRegis ? (
          <div>
            <form onSubmit={handleSubmit}>
            <h3>Update your Contact Details</h3>
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
          </div>
        ) : (
          <div>
            <h2 className="opensans primary-color">{userData?.firstname}</h2>
            <p>Last Name: {userData?.lastname}</p>
            <p>E-mail: {userData?.email}</p>
            <p>Phone: {userData?.phone}</p>
            <div className="alert alert-warning"> Updated Data.</div>
          </div>)  }

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
    </section>
  );
};

export default Admin;