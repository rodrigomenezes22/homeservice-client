import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddServiceProviderForm from './AddServiceProvider';
import axios from 'axios';

function AdminService({setAuthServ, setProviderid , providerid , setName}) {

  console.log(providerid);

  const [ serviceProviderData, setServiceProviderData ] = useState({});

  // Check if contact data is filled up
  const [ incompleteRegis, setIncompleteRegis ] = useState(true)

  const [ formError, setFormError] = useState("");


  const navigate = useNavigate();

  const getServiceProvider = async () => {
    console.log(providerid);
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/adminService/${providerid}`, {
        method: "POST",
        headers: { jwtToken: localStorage.jwtToken }
      });

      const parseData = await res.json();
      console.log(parseData);

      setName(parseData.email);
      // Getting user information.
      setServiceProviderData(parseData);

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

  useEffect(()=>{
    getServiceProvider();
  },[])

  const logout = async e => {
      e.preventDefault();
      try {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userId");
        setAuthServ(false);
        toast.success("Logout successfully");
      } catch (err) {
        console.error(err.message);
      }
    };


  return (
    <section>

      <div className='container'>
      Admin Service Provider Page
      <button onClick={e => logout(e)} className="btn btn-primary color-danger rounded-pill">
              <div className="button-organizer">
              Logout
              <span class="material-symbols-rounded">
                logout
              </span>
              </div>
      </button>
      { incompleteRegis ? (

      <AddServiceProviderForm providerid={providerid} serviceProviderData={serviceProviderData}  />

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
      <button className="card-button button-primary" onClick={goToProperties}>
        <span class="material-symbols-rounded">
        real_estate_agent
        </span>
        <p>Manage</p>
        <p>Properties</p>
      </button>

      <button className="card-button button-primary" onClick={addProperty} >
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

    </div>
    </section>
  )
}

export default AdminService
