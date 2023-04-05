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
import Tasks from "./Components/Tasks";
import AboutUs from "./Components/AboutUs";
import TaskDetails from "./Components/TaskDetails";
import ManageProperties from "./Components/ManageProperties";
import ServiceProvider from "./Components/ServiceProvider";
import AddProperty from "./Components/AddProperty";
import AddTask from "./Components/AddTask";
import ManageTasks from "./Components/ManageTasks";
import ServiceProviderProfile from "./Components/ServiceProviderProfile";
import EditTask from "./Components/EditTask";
import RegisterServiceProvider from "./Components/RegisterServiceProvider";
import LoginServiceProvider from "./Components/LoginServiceProvider";
import AdminService from "./Components/AdminService";
import ServiceProvidersCategory from "./Components/ServiceProvidersCategory";
import ScrollToTop from "./Components/ScrollToTop";
import MenuMobile from "./Components/MenuMobile";
import AvailableTasks from "./Components/AvailableTasks";
import ContactUs from "./Components/ContactUs";
import ManageQuotes from "./Components/ManageQuotes"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isSerProvider, setIsSerProvider] = useState(false);

  const [userid, setUserid] = useState();

  const [providerid, setProviderid] = useState();

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

  async function isAuthServ() {
    try {
      const response = await fetch(`http://localhost:8000/api/authService/isverify`, {
        method: "GET",
        headers: { jwtToken: localStorage.jwtToken },
      });
      const parseRes = await response.json();
      console.log(parseRes);

      parseRes === true ? setIsSerProvider(true) : setIsSerProvider(false);
    } catch (error) {
      console.error(error.messsage);
    }
  }

  async function getUserId() {
    const userid = localStorage.getItem("userId");
    setUserid(JSON.parse(userid));
  }

  async function getProviderId() {
    const userid = localStorage.getItem("providerId");
    setProviderid(JSON.parse(userid));
  }

  const setAuthServ = (boolean) => {
    setIsSerProvider(boolean);
  };

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  useEffect(() => {
    isAuth();
    isAuthServ();
    getUserId();
    getProviderId();
  }, []);

  return (
    <Fragment>
      <Header
        isAuthenticated={isAuthenticated}
        isSerProvider={isSerProvider}
        name={name}
      />

      <Routes>
        <Route
          path="/admin-service"
          element={
            isSerProvider ? (
              <AdminService
                setAuthServ={setAuthServ}
                providerid={providerid}
                setName={setName}
                name={name}
              />
            ) : (
              <Navigate to="/login-service" />
            )
          }
        />

        <Route
          path="/manage-quotes/:id"
          element={
            isSerProvider ? (
              <ManageQuotes
                setAuthServ={setAuthServ}
                setAuth={setAuth}
                providerid={providerid}
                setName={setName}
                name={name}
              />
            ) : (
              <Navigate to="/login-service" />
            )
          }
        />

        <Route
          path="/service-provider/:id"
          element={<ServiceProvidersCategory />}
        />
        <Route
          path="/login-service"
          element={
            !isSerProvider ? (
              <LoginServiceProvider
                setAuthServ={setAuthServ}
                setProviderid={setProviderid}
              />
            ) : (
              <Navigate to="/admin-service" />
            )
          }
        />
        <Route
          path="/register-service"
          element={
            !isSerProvider ? (
              <RegisterServiceProvider
                setAuthServ={setAuthServ}
                setProviderid={setProviderid}
              />
            ) : (
              <Navigate to="/login-register" />
            )
          }
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <Admin
                setAuth={setAuth}
                setAuthServ={setAuthServ}
                userid={userid}
                setName={setName}
                name={name}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <Register setAuth={setAuth} setUserid={setUserid} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setAuth={setAuth} setUserid={setUserid} />
            ) : (
              <Navigate to="/admin" />
            )
          }
        />
        <Route
          path="/manage-properties"
          element={
            isAuthenticated ? (
              <ManageProperties
                setAuth={setAuth}
                userid={userid}
                setName={setName}
                name={name}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/add-property/:id"
          element={
            isAuthenticated ? (
              <AddProperty
                setAuth={setAuth}
                userid={userid}
                setName={setName}
                name={name}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/manage-tasks/:id"
          element={
            isAuthenticated ? (
              <ManageTasks
                setAuth={setAuth}
                userid={userid}
                setName={setName}
                name={name}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/tasks" element={<Tasks />} />
        <Route path="/task-details/:id" element={<TaskDetails />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />

        <Route
          path="/service-provider-profile/:id"
          element={<ServiceProviderProfile />}
        />
        <Route
          path="/add-task/:id"
          element={
            isAuthenticated ? (
              <AddTask
                setAuth={setAuth}
                userid={userid}
                setName={setName}
                name={name}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/edit-task/:id"
          element={
            isAuthenticated ? (
              <EditTask
                setAuth={setAuth}
                userid={userid}
                setName={setName}
                name={name}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/service-providers" element={<ServiceProvider />} />
        <Route path="/available-tasks/:id" element={<AvailableTasks />} />
      </Routes>

      <MenuMobile />
      <Footer />
      <ScrollToTop />
    </Fragment>
  );
}

export default App;
