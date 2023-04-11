import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
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
    console.log("taskid " + value);
    return navigate(`/task-details/${value}`);
  };

  return (
    <>
      {/*fluid className='task-grid mt-5  p-4 y'>*/}
      <Container>
        <h1 className="mt-5 mb-5 pacifico font-tertiary">Showing all tasks</h1>
        {task.map((item) => (
          <Card className="task-card-wide">
            <div className="card-header">
              <div className="start">{item.title}</div>
              <div className="end me-3">
                <div className="button-organizer">
                  <span class="material-symbols-rounded pe-2">
                    request_quote
                  </span>
                  {item?.quote_count} Quotes Received
                  <span class="material-symbols-rounded pe-2">
                    calendar_month
                  </span>
                  Posted: {moment(item?.date).utc().format("DD-MM-YYYY")}
                </div>
              </div>
            </div>
            <Card.Body>
              <Row className="d-flex align-items-center justify-content-center">
                <Col xs={8} sm={6} md={4} lg={2} className="text-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    rounded
                    className="task-profile-pic"
                  ></Image>
                </Col>
                <Col xs={12} sm={12} md={5} lg={5}>
                  {/*<Row>{provider.category.category}</Row>*/}
                  <Row className="mt-3">
                    <h2 className="h3 font-tertiary">
                      <div className="button-organizer">
                        <span className="material-symbols-rounded icon-medium font-tertiary me-2">
                          {item.categoryimage}
                        </span>
                        {item?.category.substring(0, 30)}
                        {item?.category.length > 30 ? "..." : ""}
                      </div>
                    </h2>
                  </Row>
                  <Row className="mt-3">
                    <p className="ps-4">{item.description}</p>
                  </Row>
                </Col>
                <Col xs={12} sm={12} md={12} lg={5}>
                  <Row className="mt-3 buttons-card">
                    <Col xs={12} sm={6} md={6} className="text-center my-1">
                      <button
                        className="btn btn-primary rounded-pill color-tertiary"
                        onClick={() => GoTask(item?.taskid)}
                      >
                        <div className="button-organizer">
                          <span class="material-symbols-rounded">add</span>
                          Details
                        </div>
                      </button>
                    </Col>
                    <Col xs={12} sm={6} md={6} className="text-center my-1">
                      <button className="btn btn-primary rounded-pill color-green">
                        <div className="button-organizer">
                          send Quote
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
