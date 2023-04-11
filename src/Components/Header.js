import React, { useState, useEffect } from "react";
import Logo from "../images/my-home-services-logo.svg";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Header({ isAuthenticated, isSerProvider, name, userid, serviceproviderid, openSearch, openSearchBar }) {


  const [categoyList, setCategoryList] = useState([]);
  const navigate = useNavigate();

  // Error on empty search
  const [err, setErr] = useState(false);

  const [city, setCity] = useState("all");
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm === "") {
      setErr(true);
    } else {
      navigate(`/search-results/${searchTerm}/${category}/${city}`);
      setErr(false);
      const formFields = document.querySelector("#searchform");
      openSearchBar();
      formFields.reset();
      setSearchTerm("");
    }
  };

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

  const closeToast = (e) => {
    const toast = document.querySelector('.toast');
    toast.classList.remove('show');
  }

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
                <NavLink className="navbar-item" to="/pricing">
                  <span class="material-symbols-rounded icon-large">
                    euro
                  </span>
                  Pricing
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
      {err ? (
        <div class="toast show align-items-center text-bg-warning border-0" role="alert" aria-live="assertive" aria-atomic="true" onClick={closeToast}>
          <div class="d-flex">
            <div class="toast-body">
              Search can not be empty.
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      ) : ""}
      <div className={openSearch ? "search" : "search mobile-hidden"}>
        <form id="searchform" onSubmit={handleSearch}>
          <div class="input-group">


            <input
              type="text"
              className={err ? "form-control is-invalid" : "form-control"}
              placeholder="Search"
              name="searchterm"
              onChange={handleSearchTerm}
            />
            <select
              id="inputGroupSelect04"
              className="form-select"
              aria-label="Example select with button addon"

              onChange={handleCategoryChange}
            >
              <option value="all">Select a Category..</option>
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

              onChange={handleCityChange}
            >
              <option selected value="all">Select a City...</option>
              <option value="hamburg">Hamburg</option>
              <option value="berlin">Berlin</option>
              <option value="leipzig">Leipzig</option>
            </select>
            <button class="btn btn-search" type="submit">
              <span
                class="material-symbols-rounded icon-medium"
              >
                search
              </span>
              <span className="text-search">Find a Service Provider</span>
            </button>


          </div>
        </form>
      </div>
    </header>
  );
}

export default Header;
