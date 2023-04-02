
import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonRight from "./ui/ButtonRight";


const LoginServiceProvider = ({ setAuthServ, setProviderid }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const [ invalidLogin, setInvalidLogin ] = useState(false);

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();

    try {
      const body = { email, password };
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/authService/login`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();
    
      console.log(parseRes);
      setInvalidLogin(false)
      if(parseRes === "Invalid Credential") {
        setInvalidLogin(true);
      }


      if (parseRes.jwtToken) {
        localStorage.setItem("jwtToken", parseRes.jwtToken);
        localStorage.setItem("userId", parseRes.userId);
        setAuthServ(true);
        setProviderid(parseRes.userId);
        toast.success("Logged in Successfully");
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
            <Link className="nav-link " aria-current="page" to="/login">Home Owner</Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link active" to="/login-service">Service Provider</Link>
          </li>

        </ul>
        <p>Login area for Home Owners and Residents.</p>
      <h2 className="opensans font-primary h4 mt-3 text-start">Login here</h2>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        { invalidLogin ? <div className="alert alert-warning d-flex align-items-center" role="alert">Username or Password is not correct.</div> : <></> }
        <button className="btn btn-success btn-block rounded-pill color-primary">
          <div className="button-organizer">
          Submit
          <span className="material-symbols-rounded icon-small">
            login
          </span>
          </div>
        </button> 



      </form>
      <p>If you do not have an account <Link to="/register-service">Click here to Register.</Link></p>
      </div>
      </div>
    </Fragment>
  );
};

export default LoginServiceProvider;