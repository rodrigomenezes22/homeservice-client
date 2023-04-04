import React from "react";
import Logo from "../images/myhomeservices.svg";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons";
import { faPinterestSquare } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer>
      <div className="container mb-4">
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-around flex-column">
            <img
              src={Logo}
              alt="My Home Services Logo"
              className="logo-brand mt-5 mb-2"
            />
            <p className="text-white">
              MyHomeServices is a leading home services platform that connects
              home owners and home residents with the right service providers to
              meet their needs. Our mission is to simplify the process of
              finding reliable, affordable, and...
            </p>
            <Link to="/about-us">Read More +</Link>
          </div>
          <div className="col-12 col-md-6 col-lg-2 d-flex flex-column">
            <p className="text-white mt-5">
              <b>MAIN NAVIGATION</b>
            </p>

            <NavLink className="footer-item" to="/">
              Home
            </NavLink>
            <NavLink className="footer-item" to="/tasks">
              Tasks
            </NavLink>
            <NavLink className="footer-item" to="/service-providers">
              Service Providers
            </NavLink>
            <NavLink className="footer-item" to="/about-us">
              About Us
            </NavLink>
            <NavLink className="footer-item" to="/contact-us">
              Contact us
            </NavLink>
          </div>
          <div className="col-12 col-md-6 col-lg-2 d-flex flex-column">
            <p className="text-white mt-5">
              <b>MAIN CATEGORIES</b>
            </p>

            <NavLink className="footer-item" to="/service-provider/1">
              Cleaning Services
            </NavLink>
            <NavLink className="footer-item" to="/service-provider/4">
              Electrical Services
            </NavLink>
            <NavLink className="footer-item" to="/service-provider/9">
              Painting Services
            </NavLink>
            <NavLink className="footer-item" to="/service-provider/3">
              Plumbing Services
            </NavLink>
            <NavLink className="footer-item" to="/service-provider/14">
              Appliance repair Services
            </NavLink>
          </div>
          <div className="col-12 col-md-6 col-lg-3 d-flex flex-column">
            <p className="text-white mt-5">
              <b>Social Media</b>
            </p>
            <div className="button-organizer">
              <FontAwesomeIcon icon={faFacebookSquare} />
              <FontAwesomeIcon icon={faInstagramSquare} />
              <FontAwesomeIcon icon={faPinterestSquare} />
              <FontAwesomeIcon icon={faLinkedin} />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid  bg-dark">
        <div className="container  d-flex justify-content-between align-items-center">
          <div className="button-organizer">
            <Link to="/terms-and-conditions" className="text-white pe-4">
              Terms and Conditions
            </Link>
            <Link to="/terms-of-service" className="text-white">
              Terms of Service
            </Link>
          </div>
          <p className="text-white small mt-3">
            All Rights Reserved © MyHomeServices 2023
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
