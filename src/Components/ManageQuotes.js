import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Container, Col, Image } from "react-bootstrap"
import moment from "moment";
import axios from 'axios';

function ManageQuotes() {

    const { id } = useParams();

    const serviceproviderid = id;

    const [ quotes, setQuotes ] = useState([]);

    console.log(quotes.length)

    useEffect(()=> {
        axios
        .get(
          `${process.env.REACT_APP_SERVER_BASE_URL}/api/quotes/serviceprovider/${serviceproviderid}`
        )
        .then((res) => {
          console.log(res.data);
          setQuotes(res.data);
        })
        .catch((e) => console.log(e));
    }, []);


    // Format price
    function formatPrice(price) {
        return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

  return (
    <section className='mt-5 mb-5'>
        <div className='container'>
        <h1>Manage your quotes</h1>
        {quotes && quotes.length !== 0 ? 
        <>
        
        {quotes && quotes.map((quote) => (
          <Card key={quote?.quoteid} className="task-card-wide">
            <div className="card-header">
              <div className="start">{quote?.quotedescription}</div>
              <div className="end me-3">
                <div className="button-organizer">
                  <span class="material-symbols-rounded pe-2">
                    calendar_month
                  </span>
                  Posted: {moment(quote?.date).utc().format("DD-MM-YYYY")}
                  <span class="material-symbols-rounded pe-2">
                    calendar_month
                  </span>
                  Possible due date: {moment(quote?.duedate).utc().format("DD-MM-YYYY")}
                </div>
              </div>
            </div>
            <Card.Body>
              <Row>
                <Col xs={12} sm={6} md={4} lg={2}>
                  <Image
                    src={quote?.image}
                    alt={quote?.taskdescription}
                    rounded
                    className="task-profile-pic"
                  ></Image>
                </Col>
                <Col xs={12} sm={12} md={5} lg={5}>
                  {/*<Row>{provider.category.category}</Row>*/}

                  <Row className="mt-3">
                    <p className='h6'>Service Description:</p>
                    <p >{quote.taskdescription}</p>
                    <p className='h6'>Price: {formatPrice(quote?.price)}</p>
                    <p className='h6'>Client Approval:</p>
                    <p>{quotes?.approval === "false" ? "Waiting for customer approval" : "<span class='material-symbols-rounded'>request_quote</span> Approved!"}</p>
                    {}
                  </Row>
                </Col>
                <Col xs={12} sm={12} md={12} lg={5}>
                  <Row className="mt-3 buttons-card">
                    <Col xs={12} sm={6} md={6} className="text-center my-1">
                      <button
                        className="btn btn-primary rounded-pill color-tertiary"
                        
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
        
        </>
        : 
        <>
        
        No Data!
        
        </>
        }
        </div>
    </section>
  )
}

export default ManageQuotes
