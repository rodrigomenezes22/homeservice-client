import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { Link , Navigate} from 'react-router-dom';

import { Container } from 'react-bootstrap';

function Task() {
  const [task, setTask] = useState([]);
  //const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/task`)
      .then((res) => {
        //console.log(res.data);
        setTask(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  const navigate = useNavigate();
  const goHome =(e)=> {
    
    navigate("/");
}

  return (<>
    <h2>Showing all tasks</h2>
    <Container fluid  className='task-grid mt-5  p-4 y'>
    {task.map((item)=>(
      <Container fluid  className='task-grid mt-5  p-4 y'>
      <Card>
      <Card.Header>Propertyid</Card.Header>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.description}
        </Card.Text>
        <div className='home'>
        <button className="btn btn-primary rounded-pill color-primary" onClick={goHome} >Home</button>
        {/*<Button variant="primary">Home</Button>*/}
        </div>
        <div className='details'>
        <button className="btn btn-primary rounded-pill color-primary" >
        <Link to="/task-details">
          Details
          </Link>  
          </button>
        </div>
      </Card.Body>
    </Card>
    </Container>
    ))}
    </Container>
    </>
  );
}

export default Task;