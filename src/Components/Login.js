
import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonRight from "./ui/ButtonRight";


const Login = ({ setAuth, setUserid }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const [invalidLogin, setInvalidLogin ] = useState(false);

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();

    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:8000/api/auth/login",
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
        setAuth(true);
        setUserid(parseRes.userId);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Login</h1>
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
        {/* <button className="btn btn-success btn-block">Submit</button> */}
        <ButtonRight name="Submit" icon="search" styles="btn btn-success rounded-pill " />

      </form>
      <Link to="/register">register</Link>
    </Fragment>
  );
};

export default Login;