import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container"

const RegisterServiceProvider = ({ setAuthServ, setProviderid }) => {
  const [inputs, setInputs] = useState({

    email: "",
    password: "",
    confirmPass: ""
  });

  const [isError, setIsError ] = useState(false);

  const [passwordMatch, setPasswordMatch ] = useState(false);

  const { email, password, confirmPass } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = {  email, password, confirmPass };
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/authService/register`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();
      
      setPasswordMatch(false);
      setIsError(false);


      if (parseRes === "User already exists!") {
        return setIsError(true);
      } else if (parseRes === "Passwords do not match!") {
        return setPasswordMatch(true);
      }


      if (parseRes.jwtToken) {
        localStorage.setItem("jwtToken", parseRes.jwtToken);
        localStorage.setItem("userId", parseRes.userId);
        setAuthServ(true);
        setProviderid(parseRes.userId);
        toast.success("Register Successfully");
        console.log("whaaat usuario registrado");
      } else {
        setAuthServ(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <div className="container justify-content-center d-flex align-items-center">
        <div className="has-max-width mt-5">
      
        <ul class="nav nav-pills nav-fill mb-3">
          <li class="nav-item">
            <Link className="nav-link " aria-current="page" to="/register">Home Owner</Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link active" to="/register-service">Service Provider</Link>
          </li>

        </ul>
      <p>Register here to publish the tasks needed at your home!</p>
      <h2 className="opensans font-primary h4 mt-3 text-start">Register here</h2>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="confirmPass"
          value={confirmPass}
          placeholder="Confirm Password"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        { isError ? <div className="alert alert-warning d-flex align-items-center" role="alert">User already Exists - Got to&nbsp;  <Link to="/login"> login</Link></div> : <></> }
        { passwordMatch ? <div className="alert alert-warning d-flex align-items-center" role="alert">Password do not match!</div> : <></> }
        <button className="btn btn-success btn-block rounded-pill color-primary">
          <div className="button-organizer">Submit
          <span className="material-symbols-rounded">
            how_to_reg
          </span>
          </div>
        </button>
      </form>
      <p>Already have an account with us? <Link to="/login-service">Click here to Login</Link></p>
      
      </div>
      </div>
    </Fragment>
  );
};

export default RegisterServiceProvider;