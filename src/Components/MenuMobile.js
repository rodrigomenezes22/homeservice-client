import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import useScrollDirection from "./useScrollDirection";

function MenuMobile() {
  const [isVisible, setIsVisible] = useState(true);
  const scrollDirection = useScrollDirection();

  console.log("whaaaaaaat", scrollDirection);

  const checkDirection = () => {
    if (scrollDirection === "down") {
      setIsVisible(false);
    } else if (scrollDirection === "up") {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    checkDirection();
  }, [scrollDirection]);

  return (
    <nav className={`mobile-nav ${isVisible ? "is-visible" : "is-hidden"}`}>
      <NavLink className="navfooter-item" to="/">
        <span className="material-symbols-rounded">home</span>
        HOME
      </NavLink>
      <NavLink className="navfooter-item" to="/">
        <span className="material-symbols-rounded">person</span>
        MY ACCOUNT
      </NavLink>
      <NavLink className="navfooter-item searchnav" to="/">
        <span className="material-symbols-rounded">search</span>
        SEARCH
      </NavLink>
      <NavLink className="navfooter-item" to="/">
        <span className="material-symbols-rounded">real_estate_agent</span>
        PROPERTIES
      </NavLink>
      <NavLink className="navfooter-item" to="/">
        <span className="material-symbols-rounded">menu</span>
        MENU
      </NavLink>
    </nav>
  );
}

export default MenuMobile;
