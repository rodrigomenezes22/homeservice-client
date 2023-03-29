import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
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

  return (
    <>
      <section className="bg-light">
        <br></br>
        <h1 className="pacifico mt-5 mb-5">Service providers</h1>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          customTransition={customTransition}
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          arrows={true}
        >
          {filteredCategories.map((provider) => (
            <div key={provider.serviceproviderid}>
              {provider.category && (
                <Card className="my-3">
                  <Card.Body>
                    <Row>
                      <Col xs={12} sm={3} md={3}>
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
                        <span className="material-symbols-rounded  action-item">
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
                        <span className="material-symbols-rounded  action-item">
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
                        <span className="material-symbols-rounded action-item">
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
                        <span className="material-symbols-rounded action-item">
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
        </Carousel>
        <div className="search service-pro-search my-3">
          <Link
            to={`/service-providers`}
            className="btn btn-search rounded-pill"
            type="button"
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            Search service provider
            <span className="material-symbols-rounded icon-medium">search</span>
          </Link>
        </div>
        <br></br>
      </section>
    </>
  );
};

export default ServiceProviderCarousel;
