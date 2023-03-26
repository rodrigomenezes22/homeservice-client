import { Fragment } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import './App.css';
import Header from "./Components/Header";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Admin from "./Components/Admin";

function App() {

  const [ isAuthenticated, setIsAuthenticated ] = useState(false);
  
  const [ userid, setUserid ] = useState();

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  return (
    <Fragment>
      <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={ isAuthenticated ?  <Admin setAuth={setAuth} userid={userid} /> : <Navigate to="/login" /> } />
          <Route path="/register" element={ !isAuthenticated ? <Register setAuth={setAuth} setUserid={setUserid} /> : <Navigate to="/login" />  } />
          <Route path="/login" element={  !isAuthenticated ? <Login setAuth={setAuth} setUserid={setUserid} /> : <Navigate to="/admin" /> } />
        </Routes>


      <Footer />
   </Fragment>
  );
}

export default App;
