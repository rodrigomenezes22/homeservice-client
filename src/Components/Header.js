import React from 'react'
import Logo from '../images/myhomeservices.svg'
import { Link, NavLink } from 'react-router-dom';


function Header({ isAuthenticated, isSerProvider, name}) {
  return (
    <header>
      <div className='container'>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={Logo} className="logo-brand" alt="My Home Services Logo" />
            </Link>

            <div className='mobile-hidden'  id="navbarNav">
              <ul className="navbar-nav">
                <NavLink className="navbar-item" to="/">
                  <span className="material-symbols-rounded icon-large">
                  home
                  </span>
                  Home
                </NavLink>
                <NavLink  className="navbar-item" to="/tasks">
                  <span className="material-symbols-rounded icon-large">
                  task
                  </span>
                  Tasks
                </NavLink>
                <NavLink  className="navbar-item" to="/service-providers">
                  <span className="material-symbols-rounded icon-large">
                  construction
                  </span>
                  Service Provider
                </NavLink>
                <NavLink  className="navbar-item" to="/about-us">
                  <span className="material-symbols-rounded icon-large">
                  apartment
                  </span>
                  About Us
                </NavLink>
                <NavLink  className="navbar-item" to="/contact-us">
                  <span className="material-symbols-rounded icon-large">
                  mail
                  </span>
                  Contact Us
                </NavLink>
              </ul>
            </div>



            { !isAuthenticated && !isSerProvider ? 
            (

              <div className='navbar-end'>
                <span className="material-symbols-rounded font-primary icon-xxl">
                account_circle
                </span>
                <div><Link to="/register">Register</Link> | <Link to="/login">Login</Link></div> 
              </div>
              ) : isSerProvider ? 
              (
                <Link className='link-user' to="/admin-service">
                <div className='navbar-end'>
                  <span className="material-symbols-rounded font-primary icon-xxl">
                  account_circle
                  </span>
                    <div>{name}</div> 
                </div></Link>
              )
              : isAuthenticated ?
              (
                <Link className='link-user' to="/admin">
                <div className='navbar-end'>
                  <span className="material-symbols-rounded font-primary icon-xxl">
                  account_circle
                  </span>
                    <div>{name}</div> 
                </div></Link>
                )
                : ""
              }
          </div>
        </nav>

      </div>
      <div className="search mobile-hidden">
        <div class="input-group">
          <input type="text" className='form-control' placeholder='Type your search term' />
          <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
            <option selected>Select a City...</option>
            <option value="1">Hamburg</option>
            <option value="2">Berlin</option>
            <option value="3">Leipsig</option>
          </select>
          <button class="btn btn-search" type="button">
          <span class="material-symbols-rounded icon-medium">
          search
          </span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
