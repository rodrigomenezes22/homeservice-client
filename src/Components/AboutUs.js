import React from "react";
import "../App.css";
import { Container, Row, Col } from "react-bootstrap";
import blackWidow from "../images/priyanka.jpg";
import womenHero from "../images/savitha.jpg";
import ironMan from '../images/rodrigo-profile.jpg';
import { useNavigate } from "react-router-dom";


function AboutUs() {

  const navigate = useNavigate();

  const goToContact = () => {
    navigate("/contact-us");
  }

  return (
    <div>
      <div className="container">
      <div className="AboutUs mt-5">
        <h2 className="About trykker font-primary">About Us</h2>
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
        <div className="wrapper-pic text-center">
        <img src={ironMan} alt="Founder1" className="circle" />
        <p className="opensans h6 font-primary mt-3">Rodrigo Menezes</p>

        </div>
        <div className="wrapper-pic text-center">
        <img src={blackWidow} alt="Founder2" className="circle" />
        <p className="opensans h6 font-primary mt-3">Priyanka Davara</p>

        </div>
        <div className="wrapper-pic text-center">
        <img src={womenHero} alt="Founder3" className="circle" />
        <p className="opensans h6 font-primary mt-3">Savitha Krishnan</p>

        </div>
      </div>
      </div>
      <Container fluid>


          <Row>
            <Col xs={12} md={6} className="d-flex justify-content-center align-items-center bg-light p-0">
              <div className="companytext">
                <h2 className="trykker font-primary">Our Company</h2>
                <p className="text-justify">MyHomeServices is a leading home services platform that connects homme owners and home residents
                  with the right service providers to meet their needs. Our mission is to simplify the process of finding reliable ,
                  affordable and trustworthy serviceproviders for all types of home services. Our platform offers a wide range of categories
                  including cleaning , handyman , plumbing electrical pest contrl , lawn and garden, HVAC, roofing, painting and more .
                  Our team of experts works tirelessly to ensure that all our service providers are vetted and meet the highest standards of quality
                  and professionalism. We understand that finding the right service provider can be stressful and time-consuming which is why we make
                  it easy for customers to connect with the right professionals . At MyHomeServices, we are commited to providing the best customer
                  experience and helping homeowners and residents keep their homes in top condition.</p>
              </div>
            </Col>
            <Col xs={12} md={6} className=" p-0">
                
                <img src="../images/background_my_home_services.jpg" className="img-fluid"  style={{ height: '100vh', objectFit: 'cover' }} alt="Home-image" />
            
            </Col>
            </Row>


      </Container>
      
      <div className="Contactline mt-5 mb-5">
        <h3 className="trykker font-primary">Contact Us</h3>
        <p>To connect with us and to learn more about us, please visit our websit or reach out to us to our contact page</p>
        <button className="btn btn-primary rounded-pill color-primary m-2" onClick={goToContact}>
          <div className='button-organizer' >
            Contact Us
            <span class="material-symbols-rounded">&#9993;</span>
          </div>
        </button>
      </div>
    </div>
  );
}



export default AboutUs;