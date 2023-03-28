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
      {filteredCategories.map((provider) => (
        <div key={provider.serviceproviderid}>
          {provider.category && (
            <Card className="my-3">
              <Card.Body>
                <Row>
                  <Col xs={12} sm={2} md={2}>
                    <Image
                      src={provider.image}
                      alt={provider.username}
                      rounded
                      className="servieprovider-profile-pic"
                    ></Image>
                  </Col>
                  <Col>
                    <Row className="font-primary h4">
                      {provider.firstname} {provider.lastname}
                    </Row>
                    <Row>Service Offered</Row>
                    <Row>{provider.category.category}</Row>
                  </Col>
                </Row>
                <Row className="mt-3">{provider.description}</Row>
                <Row className="mt-3 buttons-card">
                  <Col
                    xs={3}
                    sm={3}
                    md={3}
                    className="card-button button-primary"
                  >
                    <span className="material-symbols-rounded icon-large action-item">
                      phone_in_talk
                    </span>
                    <p className="action-item">Call Now!</p>
                  </Col>
                  <Col
                    xs={3}
                    sm={3}
                    md={3}
                    className="card-button button-primary"
                  >
                    <span className="material-symbols-rounded icon-large action-item">
                      globe_uk
                    </span>
                    <p className="action-item">Website</p>
                  </Col>
                  <Col
                    xs={3}
                    sm={3}
                    md={3}
                    className="card-button button-primary"
                  >
                    <span className="material-symbols-rounded icon-large action-item">
                      chat
                    </span>
                    <p className="action-item">Message</p>
                  </Col>
                  <Col
                    xs={3}
                    sm={3}
                    md={3}
                    className="card-button button-primary"
                  >
                    <span className="material-symbols-rounded icon-large action-item">
                      euro_symbol
                    </span>
                    <p className="action-item">Get a quote</p>
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
      <ServiceProviderCarousel />
    </>
  );
}

export default ServiceProvider;
