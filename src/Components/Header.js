import React, { useState, useEffect } from "react";
import Logo from "../images/myhomeservices.svg";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Header({ isAuthenticated, isSerProvider, name, userid, serviceproviderid}) {
  const { keyword } = useParams();
  const [city, setCity] = useState();
  const [category, setCategory] = useState();

  const [categoyList, setCategoryList] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/api/serviceProviders/search/${keyword}`);
      return () => {
        console.log("Return clear");
      };
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const searchByCityAndCategory = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/search?city=${city}&category=${category}`
      );
      // handle search result
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchByCityAndCategory();
  }, [city, category]);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/search/${keyword}`)
  //     .then((res) => setCity(res.data))
  //     .catch((e) => console.log(e));
  // }, [city]);

  const getAllCategories = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/category`,
        {
          method: "GET",
          headers: { jwtToken: localStorage.jwtToken },
        }
      );

      const categoryData = await res.json();

      console.log(categoryData);

      setCategoryList(categoryData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <header>
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img
                src={Logo}
                className="logo-brand"
                alt="My Home Services Logo"
              />
            </Link>

            <div className="mobile-hidden" id="navbarNav">
              <ul className="navbar-nav">
                <NavLink className="navbar-item" to="/">
                  <span className="material-symbols-rounded icon-large">
                    home
                  </span>
                  Home
                </NavLink>
                <NavLink className="navbar-item" to="/tasks">
                  <span className="material-symbols-rounded icon-large">
                    task
                  </span>
                  Tasks
                </NavLink>
                <NavLink className="navbar-item" to="/service-providers">
                  <span className="material-symbols-rounded icon-large">
                    construction
                  </span>
                  Service Provider
                </NavLink>
                <NavLink className="navbar-item" to="/about-us">
                  <span className="material-symbols-rounded icon-large">
                    apartment
                  </span>
                  About Us
                </NavLink>
                <NavLink className="navbar-item" to="/contact-us">
                  <span className="material-symbols-rounded icon-large">
                    mail
                  </span>
                  Contact Us
                </NavLink>
              </ul>
            </div>

            {!isAuthenticated && !isSerProvider ? (
              <div className="navbar-end">
                <span className="material-symbols-rounded font-primary icon-xxl">
                  account_circle
                </span>
                <div>
                  <Link to="/register">Register</Link> |{" "}
                  <Link to="/login">Login</Link>
                </div>
              </div>
            ) : isSerProvider ? (
              <Link className="link-user" to="/admin-service">
                <div className="navbar-end">
                  <span className="material-symbols-rounded font-primary icon-xxl">
                    account_circle
                  </span>
                  <div>{name}</div>
                </div>
              </Link>
            ) : isAuthenticated ? (
              <Link className="link-user" to="/admin">
                <div className="navbar-end">
                  <span className="material-symbols-rounded font-primary icon-xxl">
                    account_circle
                  </span>
                  <div>{name}</div>
                </div>
              </Link>
            ) : (
              ""
            )}
          </div>
        </nav>
      </div>

      <div className="search mobile-hidden">
        <div class="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type your search term"
            style={{ width: 150, minwidth: 100, maxwidth: 200 }}
          />
          <select
            id="inputGroupSelect04"
            className="form-select"
            aria-label="Example select with button addon"
            style={{ width: 200, minwidth: 100, maxwidth: 400 }}
            onChange={handleCategoryChange}
          >
            <option value="">Select a Category..</option>
            {categoyList &&
              categoyList.map((category) => (
                <option value={category?.categoryid}>
                  {category?.category}
                </option>
              ))}
          </select>
          <select
            class="form-select"
            id="inputGroupSelect04"
            aria-label="Example select with button addon"
            style={{ width: 150, minwidth: 100, maxwidth: 200 }}
            onChange={handleCityChange}
          >
            <option selected>Select a City...</option>
            <option value="1">Hamburg</option>
            <option value="2">Berlin</option>
            <option value="3">Leipzig</option>
          </select>
          <button class="btn btn-search" type="button">
            <span
              class="material-symbols-rounded icon-medium"
              onClick={handleSearch}
            >
              search
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
