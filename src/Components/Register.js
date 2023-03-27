import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ setAuth, setUserid }) => {
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
        "http://localhost:8000/api/auth/register",
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
        setAuth(true);
        setUserid(parseRes.userId);
        toast.success("Register Successfully");
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
      <h1 className="mt-5 text-center">Register</h1>
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
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login">login</Link>
    </Fragment>
  );
};

export default Register;