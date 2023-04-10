import React from "react";
import "../App.css";
import { Container, Row, Col, Form } from "react-bootstrap";

function ContactUs() {
  return (
    <div>
      <div className="Contactline mt-5">
        <h3 className="trykker font-primary">Contact Us</h3>
        <div className="ContactPara mb-5">
          <p>
            To connect with us and to learn more about us, please visit our
            websit or reach out to us to our contact page
          </p>
        </div>
      </div>

      <Container fluid className="bg-light">
        <Row>
          <Col
            xs={12}
            sm={12}
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <div className="Contact-Form">
              <div className="Contact-Us mt-2 ">
                <h2 className="trykker font-primary h5">Send us a message</h2>
              </div>

              <Form>
                <Form.Group controlId="formBasicName">
                  <Form.Label className="mt-3">Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                  <Form.Label className="mt-3">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                  <Form.Label className="mt-3">Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your phone number"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicMessage">
                  <Form.Label className="mt-3">Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter your message"
                  />
                </Form.Group>
                <button
                  className="btn btn-primary rounded-pill color-primary mt-4"
                  type="submit"
                >
                  <div className="button-organizer">
                    Contact Us
                    <span class="material-symbols-rounded">&#9993;</span>
                  </div>
                </button>
              </Form>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <img
              src="./images/contactus.jpg"
              className="img-fluid"
              style={{ height: "100vh", objectFit: "cover" }}
              alt="home-image"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactUs;
