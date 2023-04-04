import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const TaskDetails = () => {
  const [item, setTask] = useState(Object);
  const { id } = useParams();
  const taskid = id;
  const navigate = useNavigate();
  console.log("taskdetails " + taskid);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/task/${taskid}`)
      .then((res) => setTask(res.data))
      .catch((e) => console.log(e));
  }, [taskid]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 image-profile-column mt-5 mb-5">
            <div className="profile-picture">
              <img src={item?.image} className="img-fluid" />
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-8 content-profile">
            <h1 className="trykker mt-5 font-primary">
              {item?.title} | {item?.city}
              <span class="material-symbols-rounded icon-large">
                location_pin
              </span>
            </h1>
            <div className="button-organizer mt-3">
              <h3 className="font-primary h5">{item?.category}</h3>
              <span class="material-symbols-rounded  icon-large">
                {item?.categoryimage}
              </span>
            </div>
            <p>{item?.description}</p>
            <p>Quotes received: {item?.quote_count}</p>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-light inner-shadow">
        <div className="container">
          <div className="row p-3 text-center">
            <div className="buttons-profie">
              <button className="btn btn-primary rounded-pill button-organizer color-primary text-uppercase me-3">
                Message
                <span className="material-symbols-rounded">message</span>
              </button>

              <button className="btn btn-primary rounded-pill button-organizer color-primary text-uppercase me-3">
                Share
                <span className="material-symbols-rounded">share</span>
              </button>

              <button className="btn btn-primary rounded-pill button-organizer color-green text-uppercase me-3">
                Submit a Quote
                <span className="material-symbols-rounded">request_quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
