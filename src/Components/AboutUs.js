import React from "react";
import "../App.css";
import blackWidow from "../images/black-widow.jpg";
import womenHero from "../images/women-hero.jpg";
import ironMan from '../images/iron-man.jpg';

//import Container from 'react-bootstrap/Container';

//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';

function AboutUs() {
  return (
    <div>
      <div className="AboutUs">
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
      
    </div>
  );
}



export default AboutUs;