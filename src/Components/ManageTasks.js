import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from 'axios';
import moment from "moment";

function ManageTasks() {

  const { id } = useParams();

  const navigate = useNavigate();

  const propertyid = id;

  const [ tasksList, setTasksList ] = useState([]);
  const [ taskCount, setTaskCount ] = useState([]);

  const [ property, setProperty ] = useState([]);

  const getTasks = async () => {
    console.log(propertyid)
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/task/property/${propertyid}`, {
          method: "GET",
          headers: { jwtToken: localStorage.jwtToken }
        });
  
        const tasksData = await res.json();

        setTaskCount(tasksData.length);
        setTasksList(tasksData);
        let date = new Date(tasksData.date);
        tasksList.date = date.toUTCString();

      } catch (error) {
        console.log(error);
      }
    };

    const getProperty = async () => {
      console.log(propertyid)
        try {
          const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/property/${propertyid}`, {
            method: "GET",
            headers: { jwtToken: localStorage.jwtToken }
          });
    
          const propertyData = await res.json();


          setProperty(propertyData);


        } catch (error) {
          console.log(error);
        }
      };


      const addTask = (value) => {
        return navigate(`/add-task/${value}`);
      };

    const handleDelete = async (taskid) => {
      console.log("What is the taskid", taskid)
      axios
      .delete(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/task/${taskid}`
      )
      .then((res) => setTasksList(tasksList.filter((task)=> task.taskid !== taskid)))
      .catch((e) => console.log(e));
      
    };

  useEffect(()=> {
    getProperty();
    getTasks();
  },[])

// Test

  return (
    <div className="container justify-content-center d-flex align-items-center">
      <div className="has-max-width mt-5">
        <div className=" p-4">
          <h3 className="font-tertiary h3 pb-4">Manage your tasks for:</h3>
          <div className='property-header'>
            <div className='icon-container'>
              <span class="material-symbols-rounded font-tertiary icon-xxl">
                real_estate_agent
              </span>
            </div>
            <div className='header-body'>
              <h4 className='font-tertiary h5 capitalize'>{property && property?.description}</h4>
              <p>{property && property?.address} - {property && property?.city} <br />
              {property && property?.state}, {property && property?.country}
              </p>
            </div>
          </div>

          <button className="btn btn-primary rounded-pill color-green mb-5" onClick={() => addTask(property?.propertyid)}>
              <div className='button-organizer'>
                  Publish a new Task
                  <span class="material-symbols-rounded">
                    task
                  </span>
              </div>

          </button>

    {tasksList && tasksList.map((task, index) => 
    
    <div className="card-admin-properties" key={task?.taskid}>
    <div className="card-body">
      <div className="icon-card">
        <img src={task?.image} alt={task?.title} className="task-image-thumb" />
      </div>
      <div className="text">
        <h3 className="font-tertiary h4">{task?.title}</h3>
        <p className='m-1'>Description: {task?.description},  </p>
        <p className="m-1">Status: {task?.status}</p>
        <p>Task Date:  {moment(task?.date).utc().format('DD-MM-YYYY')}</p>
        
      </div>
    </div>
    
    <div className="buttons-card">


      <button className="card-button button-tertiary">
        <span class="material-symbols-rounded">
        edit_square
        </span>
        <p>Edit</p>
        <p>task</p>
      </button>


      <button className="card-button button-tertiary" onClick={()=>handleDelete(task?.taskid)}>
        <span class="material-symbols-rounded">
        delete
        </span>
        <p>Delete</p>
        <p>TASK</p>
      </button>
    </div>
  </div>
    )}

    <Link className="btn btn-primary rounded-pill color-secondary  m-2" to={-1}>
        <div className='button-organizer'>
        <span class="material-symbols-rounded">
            chevron_left
        </span>
            Back to properties
        </div>
    </Link>
        </div>
      </div>
    </div>
  )
}

export default ManageTasks
