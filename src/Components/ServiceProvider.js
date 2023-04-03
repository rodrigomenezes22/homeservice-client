import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import AddServiceProviderForm from "./AddServiceProvider";
import Testing from "./Testing";
import ServiceProviderCarousel from "./ServiceProviderCarousel";
import { useNavigate } from "react-router-dom";

function ServiceProvider() {
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

  const viewProfile = (value) => {
    navigate(`/service-provider-profile/${value}`);
  }

  return (
    <>
      <Container>
        {filteredCategories.map((provider) => (
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
                        {provider.category.category}
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
        <AddServiceProviderForm />
        <h1>Test image upload</h1>
        <Testing />
        {/* <ServiceProviderCarousel /> */}
      </Container>
    </>
  );
}

export default ServiceProvider;
