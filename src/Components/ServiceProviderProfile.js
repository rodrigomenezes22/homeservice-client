import React from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

function ServiceProviderProfile() {

    const { id } = useParams();

    const serviceproviderid = id;

    const [ profile, setProfile ] = useState({});


    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/serviceProviders/${serviceproviderid}`)
          .then((res) => {
            setProfile(res.data);
            console.log(res.data);
          })
          .catch((e) => console.log(e));
      }, []);
    

  return (
    <section>
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-md-6 col-lg-4 image-profile-column'>
                    <div className='profile-picture'>
                    <img src={profile?.image} className="img-fluid mt-5" />
                    </div>
                    <div className='button-organizer mt-3'><h3 className='font-primary h4'>{profile?.category}</h3><span class="material-symbols-rounded icon-large">{profile?.categoryimage}</span></div>
                </div>
                <div className='col-12 col-md-6 col-lg-8 content-profile'>
                    <h1 className='trykker mt-5 font-primary'>{profile?.firstname}&nbsp;{profile?.lastname}</h1>
                    <p>{profile?.description}</p>
                    <h2 className='opensans h5 mt-4'>Location covered:</h2>
                    <div className='button-organizer'>
                    <h3 className='font-primary'>{profile?.city}</h3><span class="material-symbols-rounded icon-large">location_pin</span>
                    </div>
                    <h4></h4>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ServiceProviderProfile
