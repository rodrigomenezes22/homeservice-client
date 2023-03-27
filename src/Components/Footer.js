import React from 'react'
import Logo from "../images/myhomeservices.svg"
import { Link, NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <img src={Logo} alt="My Home Services Logo" className='logo-brand footer-logo mb-5' /> 
      <NavLink className="footer-item" to="/">Home</NavLink>
      <NavLink className="footer-item" to="about-us">About Us</NavLink>
      <NavLink className="footer-item" to="locations">Participating Locations</NavLink>
      <NavLink className="footer-item" to="terms-and-conditions">Terms and Conditions</NavLink>
      <NavLink className="footer-item" to="terms-of-service">Terms of Service</NavLink>
      <NavLink className="footer-item" to="pricing">Pricing</NavLink>
      <NavLink className="footer-item" to="contact-us">Contact Us</NavLink>

      <p className='text-white small mt-5'>All Rights Reserved © MyHomeServices 2023</p>
    </footer>
  )
}

export default Footer
