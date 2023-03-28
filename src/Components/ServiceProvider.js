import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

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
    <div>
      {filteredCategories.map((e) => (
        <div key={e.id}>
          {e.category && (
            <Container>
              {/* first row */}
              <Row>
                <Col xs={12} sm={4} md={3}>
                  <Image
                    src={e.category.image}
                    alt={e.category.category}
                    roundedCircle
                    className="servieprovider-profile-pic"
                  ></Image>
                </Col>
                <Col>
                  <Row>
                    {e.firstname} {e.lastname}
                  </Row>
                  <Row>Service Offered</Row>
                  <Row>{e.category.category}</Row>
                </Col>
              </Row>
              {/* Second row */}
              <Row>{e.category.description}</Row>

              {/* Third Row */}
              <Row>
                {/* call action */}
                <Col>
                  <Row>
                    <span class="material-symbols-rounded icon-large action-item">
                      phone_in_talk
                    </span>
                  </Row>
                  <Row className="action-item">Call Now!</Row>
                </Col>

                {/* website */}
                <Col>
                  <Row>
                    <span class="material-symbols-rounded icon-large action-item">
                      globe_uk
                    </span>
                  </Row>
                  <Row className="action-item">Website</Row>
                </Col>
                <Col>
                  <Row>
                    <span class="material-symbols-rounded icon-large action-item">
                      chat
                    </span>
                  </Row>
                  <Row className="action-item">Message</Row>
                </Col>
                <Col>
                  <Row>
                    <span class="material-symbols-rounded icon-large action-item">
                      euro_symbol
                    </span>
                  </Row>
                  <Row className="action-item">Get a quote</Row>
                </Col>
              </Row>
            </Container>
          )}
        </div>
      ))}
    </div>
  );
}

export default ServiceProvider;
