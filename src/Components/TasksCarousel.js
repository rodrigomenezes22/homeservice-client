import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import moment from "moment";


function TasksCarousel() {

    const [ tasksList, setTasksList ] = useState([]);
    const [ taskCount, setTaskCount ] = useState([]);

    const getTaskAllTasks = async () => {

          try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/task`, {
              method: "GET",
              headers: { jwtToken: localStorage.jwtToken }
            });
      
            const tasksData = await res.json();
            console.log(tasksData)
            setTaskCount(tasksData.length);
            setTasksList(tasksData);

    
          } catch (error) {
            console.log(error);
          }
        };

    useEffect(()=>{
        getTaskAllTasks();
    },[]);

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

  return (
    <section>
        <div className="container">

        <h2 className="pacifico font-primary mt-5 mb-5
        ">Current Tasks</h2>
        <div className="row">
        <Carousel responsive={responsive}>
            {tasksList && tasksList.map((task)=> 
            ( 
                <div className="col-11 col-md-11 col-lg-11">
                    <div key={task?.taskid} className="card-admin-properties task-card">
                        <div className="card-header capitalize">{task?.title}</div>
                        <div className="card-with-image">
                            <div className="image-thumb-card ps-3 pt-3">
                                <img src={task?.image} className="img-fluid" />
                            </div>
                            <div className="content-card">
                                <div className="button-organizer font-primary">
                                <span class="material-symbols-rounded">
                                task
                                </span>
                                 &nbsp; Quotes Received
                                </div>

                                <div className="button-organizer font-primary">
                                <span class="material-symbols-rounded">
                                calendar_month
                                </span>
                                 &nbsp; {moment(task?.date).utc().format('DD-MM-YYYY')}
                                </div>
                                
                                
                                
                            </div>

                        </div>
                        <div className="card-desc p-1">
                            <div className="service-cat-card">
                                <p className="m-0 ps-3 opensans font-primary bolder">Service Category:  &nbsp;</p>
                                <span class="material-symbols-rounded  font-primary">
                                bolt
                                </span>
                                 &nbsp; {task?.category}
                            </div>
                            <p className="opensans font-gray pe-2 ps-3">{task?.description}</p>

                        </div>
                        <div className="buttons-card">


                            <button className="card-button button-primary" onClick={()=>viewTask(task?.taskid)}>
                            <span class="material-symbols-rounded">
                            add
                            </span>
                            <p>MORE</p>
                            <p>DETAILS</p>
                            </button>


                            <button className="card-button button-green" onClick={()=>submitQuote(task?.taskid)}>
                            <span class="material-symbols-rounded">
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
            </div>
        </div>
    </section>
  )
}

export default TasksCarousel
