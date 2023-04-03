import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom"; 


function TasksCarousel() {

    const [ tasksList, setTasksList ] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/task/`)
        .then((res) => {
          setTasksList(res.data);
        })
        .catch((e) => console.log(e));
    }, [setTasksList]);

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1921 },
          items: 3
        },
        desktop: {
          breakpoint: { max: 1920, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

      const viewTask = (taskid) => {
        navigate(`/task-details/${taskid}`)
      }

  return (
    <section  className="bg-light pt-5 pb-4">
        <div className="container">

        <h2 className="pacifico font-tertiary mt-5 mb-5
        ">Current Tasks</h2>
        <div className="row">
        <Carousel responsive={responsive}>
            {tasksList && Array.isArray(tasksList) && tasksList.map((task)=> 
            ( 
                <div className="col-11 col-md-11 col-lg-11">
                    <div key={task?.taskid} className="card-admin-properties task-card">
                        <div className="card-header capitalize">{task?.title.substring(0, 30) }{task?.description.length > 30 ? "..." : "" }</div>
                        <div className="card-with-image">
                            <div className="image-thumb-card ps-3 pt-3">
                                <img src={task?.image} className="img-fluid" />
                            </div>
                            <div className="content-card">
                                <div className="button-organizer font-tertiary">
                                <span class="material-symbols-rounded">
                                task
                                </span>
                                 &nbsp; Quotes Received
                                </div>

                                <div className="button-organizer font-tertiary">
                                <span class="material-symbols-rounded">
                                calendar_month
                                </span>
                                 &nbsp; {moment(task?.date).utc().format('DD-MM-YYYY')}
                                </div>
                                
                            </div>

                        </div>
                        <div className="card-desc p-1">
                            <div className="service-cat-card">
                                <p className="m-0 ps-3 opensans font-tertiary bolder">Service Category:  &nbsp;</p>
                                <span class="material-symbols-rounded icon-medium font-tertiary">
                                {task?.categoryimage}
                                </span>
                                 &nbsp; {task?.category}
                            </div>
                            <p className="opensans font-gray pe-2 ps-3">{task?.description.substring(0, 120) }{task?.description.length > 120 ? "..." : "" }</p>

                        </div>
                        <div className="buttons-card">


                            <button className="card-button button-tertiary" onClick={()=>viewTask(task?.taskid)}>
                            <span className="material-symbols-rounded">
                            add
                            </span>
                            <p>MORE</p>
                            <p>DETAILS</p>
                            </button>


                            <button className="card-button button-green" onClick={()=>submitQuote(task?.taskid)}>
                            <span className="material-symbols-rounded">
                            request_quote
                            </span>
                            <p>Submit</p>
                            <p>quote</p>
                            </button>
                        </div>
                    </div>

                </div>
            ))}
            </Carousel>
            <div className="search service-pro-search my-3">
          <Link
            to={`/tasks`}
            className="btn btn-search color-white rounded-pill"
            type="button"
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <div className="button-organizer">
            Search for tasks
            <span className="material-symbols-rounded icon-medium">search</span>
            </div>
          </Link>
        </div>
            </div>

        </div>
    </section>
  )
}

export default TasksCarousel
