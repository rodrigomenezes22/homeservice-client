import React from "react";
import "../App.css";
import { Container, Row, Col, Form } from "react-bootstrap";

function ContactUs() {
    return (
        <div>
            <div className="Contactline mt-5">
                <h3>Contact Us</h3>
                <div className="ContactPara">
                    <p>To connect with us and to learn more about us, please visit our websit or reach out to us to our contact page</p>
                </div>
            </div>
            
                <Container  fluid>
                    <Row>
                        <div className="Contact-us-Container mt-5" style={{ height: '100vh', objectFit: 'cover' }}>
                            <Col md={6}>
                                <div className="Contact-Form">
                                    <div className="Contact-Us mt-2 " >
                                        <h2>Send us a message</h2>
                                    </div>

                                    <Col md={8}>
                                        <Form>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter your name" />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicLastName">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter your last name" />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control type="text" placeholder="Enter your phone number" />
                                            </Form.Group>

                                            <Form.Group controlId="formBasicMessage">
                                                <Form.Label>Message</Form.Label>
                                                <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
                                            </Form.Group>
                                            <button className="btn btn-primary rounded-pill color-dark m-5" type="submit" style={{ backgroundColor: "black" }}>
                                                <div className='button-organizer'>
                                                    Contact Us
                                                    <span class="material-symbols-rounded">&#9993;</span>
                                                </div>
                                            </button>
                                        </Form>
                                    </Col>
                                </div>
                            </Col>
                            <Col md={6}>
                                <img src="./images/contactus.jpg" className="img-fluid" style={{ height: '100vh', objectFit: 'cover' }} alt="home-image" />
                            </Col>
                        </div>
                    </Row>
                </Container>
            
        </div >
    );
}

export default ContactUs;