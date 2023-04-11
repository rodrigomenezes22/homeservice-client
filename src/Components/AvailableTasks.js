import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, Link  } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Loading from "./Loading";

function AvailableTasks() {
  const { id } = useParams();
  const serviceproviderid = id;
  const navigate = useNavigate();

  const [serviceProviderData, setServiceProviderData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
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
    return navigate(`/submit-quotes/${serviceProviderData.serviceproviderid}`, {
      state: { taskid: taskid },
    });
  }

  function viewTaskDetails(taskid) {
    return navigate(`/task-details/${taskid}`);
  }

  useEffect(() => {
    getServiceProvider();
  }, []);

  useEffect(() => {
    if (serviceProviderData) {
      setIsLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVER_BASE_URL}/api/task/search/${serviceProviderData.categoryid}`
        )
        .then((res) => {
          setTasks(res.data);
          console.log("whhaaaat", res.data);
          setIsLoading(false);
        })
        .catch((e) => console.log(e));
    }
  }, [serviceProviderData]);

  return (
    <>    
    {isLoading ? <Loading /> : "" }
    <section>
      <div className="container">
        <div className="container-fluid button-organizer">
          <h1 className="opensans font-primary h3 mt-5 mb-5 flex-grow-1 text-start">
            Available tasks for your Business Activity
          </h1>
          <Link
            className="btn btn-primary rounded-pill color-secondary  m-2"
            to={-1}
          >
            <div className="button-organizer">
              <span class="material-symbols-rounded">chevron_left</span>
              Back to properties
            </div>
          </Link>
        </div>

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
                <button className="card-button button-primary" onClick={() => viewTaskDetails(task.taskid)}>
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
      <Link
        className="btn btn-primary rounded-pill color-secondary  m-2 mb-5"
        to={-1}
      >
        <div className="button-organizer">
          <span class="material-symbols-rounded">chevron_left</span>
          Back to properties
        </div>
      </Link>
      </div>


    </section>
    </>
  );
}

export default AvailableTasks;
