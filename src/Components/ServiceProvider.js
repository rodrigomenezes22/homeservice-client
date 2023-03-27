import React, { useState, useEffect } from "react";
import axios from "axios";

function ServiceProvider() {
  const [service, setServices] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/serviceProviders`)
      .then((res) => {
        setServices(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return service.map((e) => <h1>{e.username}</h1>);
}

export default ServiceProvider;
