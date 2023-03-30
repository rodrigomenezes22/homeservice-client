import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import AddServiceProviderForm from "./AddServiceProvider";
import Testing from "./Testing";
import ServiceProviderCarousel from "./ServiceProviderCarousel";

function ServiceProvider() {
  const [service, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

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

  return (
    <>
      <Container>
        {filteredCategories.map((provider) => (
          <div key={provider.serviceproviderid}>
            {provider.category && (
              <Card className="service-provider-card">
                <Card.Body>
                  <Row>
                    <Col xs={12} sm={6} md={4} lg={2}>
                      <Image
                        src={provider.image}
                        alt={provider.username}
                        rounded
                        className="servieprovider-profile-pic"
                      ></Image>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={4}>
                      <Row className="font-primary h4">
                        {provider.firstname} {provider.lastname}
                      </Row>
                      <Row>Service Offered</Row>
                      <Row>{provider.category.category}</Row>
                      <Row className="mt-3">{provider.description}</Row>
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
        <AddServiceProviderForm />
        <h1>Test image upload</h1>
        <Testing />
        {/* <ServiceProviderCarousel /> */}
      </Container>
    </>
  );
}

export default ServiceProvider;
