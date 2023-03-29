import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card, Col, Image, Row } from "react-bootstrap";

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
        <div className="container">
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
            <div className="p-2" key={provider.serviceproviderid}>
              {provider.category && (
                <Card className="p-0 my-3">
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

                  </Card.Body>
                  <div className="buttons-card">
                    <button className="card-button button-primary">
                      <span class="material-symbols-rounded">
                      phone_in_talk
                      </span>
                      <p>Call</p>
                      <p>Now!</p>
                    </button>

                    <button className="card-button button-primary">
                      <span class="material-symbols-rounded">
                      globe_uk
                      </span>
                      <p>Visit our</p>
                      <p>Website</p>
                    </button>


                    <button className="card-button button-primary">
                      <span class="material-symbols-rounded">
                      chat
                      </span>
                      <p>Message</p>
                      <p>Us</p>
                    </button>

                    <button className="card-button button-primary">
                      <span class="material-symbols-rounded">
                      euro_symbol
                      </span>
                      <p>Get a</p>
                      <p>Quote</p>
                    </button>
                  </div>

                 
                </Card>
              )}
            </div>
          ))}
        </Carousel>
        <div className="search service-pro-search my-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search service provider"
            />
            <button className="btn btn-search" type="button">
              <span className="material-symbols-rounded icon-medium">
                search
              </span>
            </button>
          </div>
        </div>
        <br></br>
        </div>
      </section>
    </>
  );
};

export default ServiceProviderCarousel;
