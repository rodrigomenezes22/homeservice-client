import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

function AvailableTasks() {
  const { id } = useParams();
  const serviceproviderid = id;
  const navigate = useNavigate();

  const [serviceProviderData, setServiceProviderData] = useState(null);
  const [tasks, setTasks] = useState([]);

  const getServiceProvider = async () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/serviceProviders/${serviceproviderid}`
      )
      .then((res) => {
        console.log(res.data);
        setServiceProviderData(res.data);
      })
      .catch((e) => console.log(e));
  };

  // Go to submit quote form
  function goToSubmitQuote(taskid) {
    navigate(`/submit-quotes/${serviceProviderData.serviceproviderid}`, {
      state: { taskid: taskid },
    });
  }

  useEffect(() => {
    getServiceProvider();
  }, []);

  useEffect(() => {
    if (serviceProviderData) {
      console.log(serviceProviderData.categoryid);
      axios
        .get(
          `${process.env.REACT_APP_SERVER_BASE_URL}/api/task/search/${serviceProviderData.categoryid}`
        )
        .then((res) => {
          console.log(res.data);
          setTasks(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, [serviceProviderData]);

  return (
    <section>
      <div className="container">
        <h1 className="opensans font-primary h3 mt-5">
          Available tasks for your Business Activity
        </h1>
        {tasks &&
          tasks.map((task) => (
            <div className="card-admin-properties">
              <div className="container">
                <div className="row">
                  <div className="col-3">
                    <div className="profile-thumb">
                      <img
                        src={task?.image}
                        className="img-fluid"
                        alt={task?.imagedescription}
                      />
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="card-body">
                      <div className="icon-card">
                        <span class="material-symbols-rounded font-primary icon-xxl">
                          {task?.categoryimage}
                        </span>
                      </div>
                      <div className="text">
                        <h3 className="font-primary h4">{task?.title}</h3>
                        <p>{task?.description}</p>
                        <p>
                          This Tasks has received {task?.quote_count} quote(s).
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 p-0 d-flex align-items-center">
                    <div className="button-organizer h5">
                      <span class="material-symbols-rounded pe-2 icon-medium">
                        calendar_month
                      </span>
                      Posted: {moment(task?.date).utc().format("DD-MM-YYYY")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="buttons-card">
                <button className="card-button button-primary">
                  <span class="material-symbols-rounded">visibility</span>
                  <p>View Task </p>
                  <p>Details</p>
                </button>

                <button
                  className="card-button button-primary"
                  onClick={() => goToSubmitQuote(task.taskid)}
                >
                  <span class="material-symbols-rounded">add_box</span>
                  <p>Submit</p>
                  <p>Quote</p>
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default AvailableTasks;
