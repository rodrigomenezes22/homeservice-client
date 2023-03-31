import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

const responsive = {
  widescreen: {
    breakpoint: { max: 3000, min: 1600 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },

  desktop: {
    breakpoint: { max: 1600, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const ServiceProviderCarousel = () => {
  const [service, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/serviceProviders`)
      .then((res) => {
        setServices(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  // update category when category id changes
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/category/`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const filteredCategories = service.map((e) => ({
    ...e,
    category: categories.filter((item) => item.categoryid === e.categoryid)[0],
  }));

  const customTransition = (e) => {
    e.style.transition = "transform 0.5s ease 0s";
  };

  const viewProfile = (value) => {
    navigate(`/service-provider-profile/${value}`);
  }

  return (
    <>
      <section className="bg-light">
        <div className="container">
        <br></br>
        <h1 className="pacifico mt-5 mb-5 font-tertiary">Service providers</h1>
        <div className="row">
        <Carousel responsive={responsive}>
            {service && service.map((provider)=> 
            ( 
                <div className="col-11 col-md-11 col-lg-11">
                    <div key={provider?.serviceproviderid} className="card-admin-properties ">
                        <div className="card-header capitalize">{provider?.username.substring(0, 30) }{provider?.username.length > 30 ? "..." : "" }</div>
                        <div className="card-with-image">
                            <div className="image-thumb-card ps-3 pt-3">
                                <img src={provider?.image} className="img-fluid" />
                            </div>
                            <div className="content-card">
      
                            <p className="m-0 ps-3 opensans font-primary bolder">Service Category:  &nbsp;</p>
                            <div className="service-cat-card">
                                
                                <span class="material-symbols-rounded icon-medium ps-2 font-primary">
                                {provider?.categoryimage}
                                </span>
                                &nbsp;
                                <p className="font-primary m-0">{provider?.category}</p>
                            </div>
                           
                            </div>

                        </div>
                        <div className="card-desc p-1">

                            <p className="opensans font-gray pe-2 ps-3">{provider?.description.substring(0, 120) }{provider?.description.length > 120 ? "..." : "" }</p>

                        </div>
                        <div className="buttons-card">


                            <button className="card-button button-primary" >
                            <span class="material-symbols-rounded">
                            call
                            </span>
                            <p>CALL</p>
                            <p>NOW!</p>
                            </button>


                            <button className="card-button button-primary" onClick={()=>viewProfile(provider?.serviceproviderid)}>
                            <span class="material-symbols-rounded">
                            person
                            </span>
                            <p>Visit our</p>
                            <p>profile</p>
                            </button>

                            <button className="card-button button-primary">
                            <span class="material-symbols-rounded">
                            chat
                            </span>
                            <p>Send us</p>
                            <p>a message</p>
                            </button>

                            <button className="card-button button-primary">
                            <span class="material-symbols-rounded">
                            request_quote
                            </span>
                            <p>Request a</p>
                            <p>Quote</p>
                            </button>
                        </div>
                    </div>

                </div>
            ))}
            </Carousel>
            </div>
        <div className="search service-pro-search my-3">
          <Link
            to={`/service-providers`}
            className="btn btn-search color-white rounded-pill"
            type="button"
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <div className="button-organizer">
            Search service provider
            <span className="material-symbols-rounded icon-medium">search</span>
            </div>
          </Link>
        </div>
        <br></br>
        </div>
      </section>
    </>
  );
};

export default ServiceProviderCarousel;
