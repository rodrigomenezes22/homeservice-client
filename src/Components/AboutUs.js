import React from "react";
import "../App.css";
import { Container, Row, Col } from "react-bootstrap";
import blackWidow from "../images/black-widow.jpg";
import womenHero from "../images/women-hero.jpg";
import ironMan from '../images/iron-man.jpg';



function AboutUs() {
  return (
    <div>
      <div className="AboutUs mt-5">
        <h2 className="About">About Us</h2>
        <p className="AboutDesc">
          Rodrigo, Priyanka and Savitha are the passionate founders of MyHomeServices.
          Each one brings uniques skills and expertise to the company.
          Rodrigo has extensive experience in business management and stratergy,
          while Priyanka has a background in technology and software development. Savitha ,
          on the other hand, has a expertise in customer service and experience.
          Together they combine their skills to create a  powerful team that is dedicated to providing the best home services platform.
          They have a shared vision to simplify the process of finding reliable and affordable home service providers and they are
          commited to make their platform a success.With their combined skills and experience.Rodrigo , Priyanka and Savitha
          have built a company poised to revolutionize the home services industry.
        </p>
      </div>
      <div className="foundersPic">
        <img src={ironMan} alt="Founder1" className="circle" />
        <img src={blackWidow} alt="Founder2" className="circle" />
        <img src={womenHero} alt="Founder3" className="circle" />
      </div>
      <Container fluid>
        <Row>
          <div className="OurCompany">
            <Col md={6}>
              <div className="companytext">
                <h2>Our Company</h2>
                <p>MyHomeServices is a leading home services platform that connects homme owners and home residents
                  with the right service providers to meet their needs. Our mission is to simplify the process of finding reliable ,
                  affordable and trustworthy serviceproviders for all types of home services. Our platform offers a wide range of categories
                  including cleaning , handyman , plumbing electrical pest contrl , lawn and garden, HVAC, roofing, painting and more .
                  Our team of experts works tirelessly to ensure that all our service providers are vetted and meet the highest standards of quality
                  and professionalism. We understand that finding the right service provider can be stressful and time-consuming which is why we make
                  it easy for customers to connect with the right professionals . At MyHomeServices, we are commited to providing the best customer
                  experience and helping homeowners and residents keep their homes in top condition.</p>
              </div>
            </Col>
            <Col md={6}>
                
                <img src="../images/background_my_home_services.jpg" className="img-fluid"  style={{ height: '100vh', objectFit: 'cover' }} alt="Home-image" />
            
            </Col>
          </div>
        </Row>
      </Container>
      
      <div className="Contactline mt-5">
        <h3>Contact Us</h3>
        <p>To connect with us and to learn more about us, please visit our websit or reach out to us to our contact page</p>
        <button className="btn btn-primary rounded-pill color-dark m-2"style={{backgroundColor:"black"}}>
          <div className='button-organizer'>
            Contact Us
            <span class="material-symbols-rounded">&#9993;</span>
          </div>
        </button>
      </div>
    </div>
  );
}



export default AboutUs;