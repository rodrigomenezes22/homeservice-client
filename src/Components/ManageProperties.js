import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Loading from "./Loading";


function ManageProperties({ userid }) {
  const navigate = useNavigate();
 
  const [propertyCount, setPropertyCount] = useState("");

  const [tasksCount, setTasksCount] = useState("");

  const [properties, setProperties] = useState([]);

  const [tasks, setTasks] = useState([]);
   
  const [ isLoading, setIsLoading ] = useState(false);

  const getProperties = async () => {
    setIsLoading(true);
    console.log(userid);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/property/user/${userid}`,
        {
          method: "GET",
          headers: { jwtToken: localStorage.jwtToken },
        }
      );

      const propertyData = await res.json();

      setPropertyCount(propertyData.length);
      setProperties(propertyData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  const handleTasks = (value) => {
    return navigate(`/manage-tasks/${value}`);
  };

  const handleDelete = async (propertyidentity) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/property/${propertyidentity}`,
        {
          method: "DELETE",
          headers: { jwtToken: localStorage.jwtToken },
        }
      );

      const propertyData = await res.json();

      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <>
     {isLoading ? <Loading /> : "" }
    <div className="container justify-content-center d-flex align-items-center">
      <div className="has-max-width mt-5">
        <div className=" p-4">
          <h3 className="font-primary h4 pb-4">Manage your properties</h3>

          {properties && Array.isArray(properties) &&
            properties.map((property, index) => (
              <div className="card-admin-properties" key={property?.propertyid}>
                <div className="card-body">
                  <div className="icon-card">
                    <span class="material-symbols-rounded font-primary icon-xxl">
                      real_estate_agent
                    </span>
                  </div>
                  <div className="text">
                    <h3 className="font-primary h4">{property?.description}</h3>
                    <p className="m-1">Address: {property?.address}, </p>
                    <p className="m-1">
                      {property?.city} - {property?.zipcode},{" "}
                      {property?.country}{" "}
                    </p>
                    <p>
                      You have {property?.taskcount} task(s) in this Property.
                    </p>
                  </div>
                </div>

                <div className="buttons-card">
                  <button
                    className="card-button button-primary"
                    onClick={() => handleTasks(property?.propertyid)}
                  >
                    <span class="material-symbols-rounded">task</span>
                    <p>MANAGE</p>
                    <p>TASKS</p>
                  </button>

                  <button className="card-button button-primary">
                    <span class="material-symbols-rounded">edit_square</span>
                    <p>Edit</p>
                    <p>Property</p>
                  </button>

                  <button
                    className="card-button button-primary"
                    onClick={() => handleDelete(property?.propertyid)}
                  >
                    <span class="material-symbols-rounded">delete</span>
                    <p>Delete</p>
                    <p>Property</p>
                  </button>
                </div>
              </div>
            ))}
          <Link
            className="btn btn-primary rounded-pill color-secondary  m-2"
            to="/admin"
          >
            <div className="button-organizer">
              <span class="material-symbols-rounded">chevron_left</span>
              Back to dashboard
            </div>
          </Link>
        </div>
      </div>
    </div>
  </>  
  );
}

export default ManageProperties;
