import React from 'react'
import CategoriesHome from './CategoriesHome'
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Card, Col, Container, Image, Row } from "react-bootstrap";

function ServiceProvidersCategory() {

    const [services, setServices] = useState([]);
    const [category, setCategory] = useState({});
    const navigate = useNavigate();

    const { id } = useParams();

    const categoryid = id;
    

    const viewProfile = (value) => {
      navigate(`/service-provider-profile/${value}`);
    };

    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/serviceProviders/category/${categoryid}`)
        .then((res) => {

            setServices(res.data);
   
        })
        .catch((e) => console.log(e));

        axios
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/category/${categoryid}`)
        .then((res) => {

            setCategory(res.data);
            console.log("category", res.data)
        })
        .catch((e) => console.log(e));
    }, [categoryid]);

  return (
    <section>
        <h2 className='pacifico font-tertiary mt-5 mb-5'>Showing results for {services && services.length !== 0 ?  <span>{category?.category}</span> : "No Results found"}</h2>
        <div className='container mb-5'>
        {services.map((provider) => (
          <div key={provider.serviceproviderid}>
            {provider.category && (
              <Card className="service-provider-card">
                <div className="card-header">
                {provider.firstname} {provider.lastname}
                </div>
                
                <Card.Body>
                  <Row>
                    <Col xs={12} sm={12} md={4} lg={2}>
                      <Image
                        src={provider.image}
                        alt={provider.username}
                        rounded
                        className="servieprovider-profile-pic"
                      ></Image>
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={10}>
                      <Row className="font-primary h4">
                        
                      </Row>

                      <Row>
                      <h2 className='h2 font-primary'>
                      <div className='button-organizer'>
                        <span className="material-symbols-rounded icon-large font-primary">
                          {provider.categoryimage}
                        </span>
                        {provider.category}
                      </div>
                      </h2> 

                        </Row>
                      <Row>
                        <p className="ps-4">{provider.description}</p>
                        </Row>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6}>

                    </Col>
                  </Row>
                  <Row className="mt-3 buttons-card">
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="d-flex justify-content-center my-1"
                        >
                          <button className="btn btn-primary rounded-pill button-organizer color-primary text-uppercase">
                            Call
                            <span className="material-symbols-rounded">
                              phone_in_talk
                            </span>
                          </button>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="d-flex justify-content-center my-1"
                        >
                          <button className="btn btn-primary rounded-pill button-organizer color-primary text-uppercase" onClick={()=>viewProfile(provider?.serviceproviderid)}>
                            View our profile
                            <span className="material-symbols-rounded">
                            person
                            </span>
                          </button>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="d-flex justify-content-center my-1"
                        >
                          <button className="btn btn-primary rounded-pill button-organizer color-primary text-uppercase">
                            Message
                            <span className="material-symbols-rounded">
                              chat
                            </span>
                          </button>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="d-flex justify-content-center my-1"
                        >
                          <button className="btn btn-primary rounded-pill button-organizer color-green text-uppercase">
                            Request Quote
                            <span className="material-symbols-rounded">
                              request_quote
                            </span>
                          </button>
                        </Col>
                      </Row>
                </Card.Body>
              </Card>
            )}
          </div>
        ))}
        <div className='row mt-5 p-5'>
          <div className='button-organizer'>
            <div className='icon-side p-4'>
            <span className="material-symbols-rounded icon-xxl font-tertiary">{category.categoryimage}</span>
            </div>
            <div className='content-side text-start'>
            <h3 className='opensans font-tertiary'>
              What tasks belongs to {category.category}?
            </h3>
            <p>{category.categorydescription}</p>
            </div>
          </div>
        </div>
        </div>


        <CategoriesHome />

      
    </section>
  )
}

export default ServiceProvidersCategory
