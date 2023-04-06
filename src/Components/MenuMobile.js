import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import useScrollDirection from "./useScrollDirection";

function MenuMobile() {
  const [isVisible, setIsVisible] = useState(true);
  const scrollDirection = useScrollDirection();

  const checkDirection = () => {
    if (scrollDirection === "down") {
      setIsVisible(false);
      setShowNavi(false);
    } else if (scrollDirection === "up") {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    checkDirection();
  }, [scrollDirection]);

  const [showNavi, setShowNavi] = useState(false);

  const handleMenu = () => {
    console.log("click");
    if (showNavi) {
      setShowNavi(false);
    } else {
      setShowNavi(true);
    }
  };

  return (
    <>
      <div className={`mainfooter-nav ${showNavi ? "visible" : "hidden"}`}>
        <NavLink className="footer-nav" onClick={handleMenu} to="/">
          Home <span className="material-symbols-rounded">chevron_right</span>
        </NavLink>
        <NavLink className="footer-nav" onClick={handleMenu} to="/tasks">
          Tasks<span className="material-symbols-rounded">chevron_right</span>
        </NavLink>
        <NavLink className="footer-nav" onClick={handleMenu} to="/service-providers">
          Service Providers
          <span className="material-symbols-rounded">chevron_right</span>
        </NavLink>
        <NavLink className="footer-nav" onClick={handleMenu} to="/about-us">
          About Us
          <span className="material-symbols-rounded">chevron_right</span>
        </NavLink>
        <NavLink className="footer-nav" onClick={handleMenu} to="/contact-us">
          Contact us
          <span className="material-symbols-rounded">chevron_right</span>
        </NavLink>
      </div>
      <nav className={`mobile-nav ${isVisible ? "is-visible" : "is-hidden"}`}>
        <NavLink className="navfooter-item" to="/">
          <span className="material-symbols-rounded">home</span>
          HOME
        </NavLink>
        <NavLink className="navfooter-item" to="/admin">
          <span className="material-symbols-rounded">person</span>
          MY ACCOUNT
        </NavLink>
        <NavLink className="navfooter-item searchnav" to="/">
          <span className="material-symbols-rounded">search</span>
          SEARCH
        </NavLink>
        <NavLink className="navfooter-item" to="/admin">
          <span className="material-symbols-rounded">real_estate_agent</span>
          PROPERTIES
        </NavLink>
        <button className="navfooter-item no-border" onClick={handleMenu}>
          <span className="material-symbols-rounded">
            {showNavi ? "close" : "menu"}
          </span>
          MENU
        </button>
      </nav>
    </>
  );
}

export default MenuMobile;
