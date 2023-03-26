import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Admin = ({ setAuth, userid }) => {
  const [name, setName] = useState("");

  const getProfile = async () => {

    try {
      const res = await fetch(`http://localhost:8000/api/admin/${userid}`, {
        method: "POST",
        headers: { token: localStorage.jwtToken }
      });

      const parseData = await res.json();
      setName(parseData.email);
      console.log(parseData);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h1 className="mt-5">Admin</h1>
      <h2>Welcome {name}</h2>
      <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Admin;