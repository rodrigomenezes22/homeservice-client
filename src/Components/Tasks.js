import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { Link, Navigate } from 'react-router-dom';



function Tasks() {
  const [task, setTask] = useState([]);
  //const [categories, setCategories] = useState([]);
  //const [id ] =useParams

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/task/`)
      .then((res) => {
        //console.log(res.data);
        setTask(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  const navigate = useNavigate();

  
  const GoTask = (value) => {
    console.log("taskid "+value);
    return navigate(`/task-details/${value}`);
  };

  return (<>

    {/*fluid className='task-grid mt-5  p-4 y'>*/}
    <Container>
    <h1 className='mt-5 mb-5 pacifico font-tertiary'>Showing all tasks</h1>
    {task.map((item) => (

        <Card className="task-card-wide">
          <div className='card-header'>
          {item.title}
          </div>
          <Card.Body>
            <Row>
              <Col xs={12} sm={6} md={4} lg={2}>
                <Image
                  src={item.image}
                  alt={item.title}
                  rounded
                  className="task-profile-pic"
                ></Image>
              </Col>
              <Col xs={12} sm={6} md={4} lg={4}>

    
                {/*<Row>{provider.category.category}</Row>*/}
                <Row className="mt-3">{item.description}</Row>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                <Row className="mt-3 buttons-card">
                  <Col
                    xs={12}
                    sm={6}
                    md={3}
                    className="d-flex justify-content-center my-1"
                  >
                    <button className="btn btn-primary rounded-pill color-tertiary" onClick={() => GoTask(item?.taskid)}>

                      <div className='button-organizer'>
                      <span class="material-symbols-rounded">
                      add
                      </span>
                      Details
                      </div>
                    </button>
                    
                    
                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    md={3}
                    className="d-flex justify-content-center my-1"
                  >
                    <button className="btn btn-primary rounded-pill color-tertiary">
                    <div className='button-organizer'>

                      Details
                      <span class="material-symbols-rounded">
                      request_quote
                      </span>
                      </div>
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>


      

    ))}
    </Container>
  </>
  );
}

export default Tasks;