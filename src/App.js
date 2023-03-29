import { Fragment } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import Task from "./Components/Task";
import ManageProperties from "./Components/ManageProperties";
import ServiceProvider from "./Components/ServiceProvider";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [userid, setUserid] = useState();

  const [name, setName] = useState("");

  async function isAuth() {
    try {
      const response = await fetch(`http://localhost:8000/api/auth/isverify`, {
        method: "GET",
        headers: { jwtToken: localStorage.jwtToken },
      });
      const parseRes = await response.json();
      console.log(parseRes);

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.messsage);
    }
  }

  async function getUserId() {
    const userid = localStorage.getItem("userId");
    setUserid(JSON.parse(userid));
  }

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  useEffect(() => {
    isAuth();
    getUserId();
  }, []);

  return (
    <Fragment>
      <Header isAuthenticated={isAuthenticated} name={name} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={ isAuthenticated ?  <Admin setAuth={setAuth} userid={userid} setName={setName} name={name} /> : <Navigate to="/login" /> } />
          <Route path="/register" element={ !isAuthenticated ? <Register setAuth={setAuth} setUserid={setUserid} /> : <Navigate to="/login" />  } />
          <Route path="/login" element={  !isAuthenticated ? <Login setAuth={setAuth} setUserid={setUserid} /> : <Navigate to="/admin" /> } />
          <Route path="/manage-properties" element={ isAuthenticated ?  <ManageProperties setAuth={setAuth} userid={userid} setName={setName} name={name} /> : <Navigate to="/login" /> } />
          <Route path="/task" element={<Task/>}/>
          <Route path="/service-providers" element={<ServiceProvider />} />
        </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
