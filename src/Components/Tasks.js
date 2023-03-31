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
    <h2>Showing all tasks</h2>
    {/*fluid className='task-grid mt-5  p-4 y'>*/}
    {task.map((item) => (
      <Container className="task">
        <Card className="task-card">
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
                <Row className="font-primary h4">
                  {item.title}
                </Row>
                <Row>Estimated 5 days of work</Row>
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

                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    md={3}
                    className="d-flex justify-content-center my-1"
                  >

                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    md={3}
                    className="d-flex justify-content-center my-1"
                  >
                    <button className="btn btn-primary rounded-pill color-blue mb-5" onClick={() => GoTask(item?.taskid)}>Details</button>
                    
                    
                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    md={3}
                    className="d-flex justify-content-center my-1"
                  >
                    <button className="btn btn-primary rounded-pill button-organizer text-uppercase">
                      SubmitQuote
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>


      </Container>

    ))}

  </>
  );
}

export default Tasks;