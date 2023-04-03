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
        {services && services.map((provider) => (
          <div key={provider?.serviceproviderid}>
            {provider?.category && (
              <Card className="service-provider-card">
                <Card.Body>
                  <Row>
                    <Col xs={12} sm={6} md={4} lg={2}>
                      <Image
                        src={provider?.image}
                        alt={provider?.username}
                        rounded
                        className="servieprovider-profile-pic"
                      ></Image>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={4}>
                      <Row className="font-primary h4">
                        {provider?.firstname} {provider?.lastname}
                      </Row>
                      <Row>Service Offered</Row>
                      <Row>{provider?.category.category}</Row>
                      <Row className="mt-3">{provider?.description}</Row>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6}>
                      <Row className="mt-3 buttons-card">
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="d-flex justify-content-center my-1"
                        >
                          <button className="btn btn-primary rounded-pill button-organizer text-uppercase">
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
                          <button className="btn btn-primary rounded-pill button-organizer text-uppercase">
                            Website
                            <span className="material-symbols-rounded">
                              globe_uk
                            </span>
                          </button>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          md={3}
                          className="d-flex justify-content-center my-1"
                        >
                          <button className="btn btn-primary rounded-pill button-organizer text-uppercase">
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
                          <button className="btn btn-primary rounded-pill button-organizer text-uppercase">
                            Quote
                            <span className="material-symbols-rounded">
                              euro_symbol
                            </span>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
            
          </div>
        ))}
        </div>
        <CategoriesHome />

      
    </section>
  )
}

export default ServiceProvidersCategory
