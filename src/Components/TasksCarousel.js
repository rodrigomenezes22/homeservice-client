import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card, Col, Container, Image, Row } from "react-bootstrap";


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

  return (
    <div>
        <h2>Current Tasks</h2>
      {tasksList && tasksList.map((task)=> <p key={task?.taskid}>{task.title}</p>)}
    </div>
  )
}

export default TasksCarousel
