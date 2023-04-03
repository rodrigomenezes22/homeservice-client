import React from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import LeafletMap from './LeafletMap';


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

                </div>
                <div className='col-12 col-md-6 col-lg-8 content-profile'>
                    <h1 className='trykker mt-5 font-primary'>{profile?.firstname}&nbsp;{profile?.lastname} |  {profile?.city} <span class="material-symbols-rounded icon-large">location_pin</span></h1>
                    <div className='button-organizer mt-3'>
                        <h3 className='font-primary h5'>{profile?.category} </h3>
                        <span class="material-symbols-rounded  icon-large">
                            {profile?.categoryimage}
                        </span>
                    </div>
                    <p>{profile?.description}</p> 
                </div>
            </div>
        </div>
        <div className='container-fluid bg-light inner-shadow'>
            <div className='container'>
                <div  className='row p-3 text-center'>
                    <div className='buttons-profie'>
                    <button className="btn btn-primary rounded-pill button-organizer color-primary text-uppercase me-3">
                    Call
                    <span className="material-symbols-rounded">
                        phone_in_talk
                    </span>
                    </button>

                    <button className="btn btn-primary rounded-pill button-organizer color-primary text-uppercase  me-3">
                    Visit our Website
                    <span className="material-symbols-rounded">
                        globe_uk
                    </span>
                    </button>

                    <button className="btn btn-primary rounded-pill button-organizer color-primary text-uppercase me-3">
                    Message
                    <span className="material-symbols-rounded">
                        message
                    </span>
                    </button>

                    <button className="btn btn-primary rounded-pill button-organizer color-primary text-uppercase me-3">
                    Share
                    <span className="material-symbols-rounded">
                        share
                    </span>
                    </button>

                    <button className="btn btn-primary rounded-pill button-organizer color-green text-uppercase me-3">
                    Request Quote
                    <span className="material-symbols-rounded">
                        request_quote
                    </span>
                    </button>
                    </div>
                </div>
            </div>
        </div>
        <LeafletMap name={profile?.firstname} lastname={profile?.lastname} city={profile?.city} />
    </section>
  )
}

export default ServiceProviderProfile
