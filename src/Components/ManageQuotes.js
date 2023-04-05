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

    const handleAddress = (e) => {

        const taskCardWide = e.target.closest('.task-card-wide');
        const addressElement = taskCardWide.querySelector('.address');
        addressElement.classList.toggle('is-hidden');
        const targetElement = e.target;
        if(targetElement.innerHTML === 'View contact') {
            targetElement.innerHTML = 'hide address';
        } else {
            targetElement.innerHTML = 'View contact';
        }

    }

    const getDirection = (address, city, zipcode, country) => {
        window.open(`https://www.google.com/maps/place/${address}+${city}+${zipcode}+${country}`, "_blank");
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
                    <div className='task-profile-pic'>
                  <Image
                    src={quote?.image}
                    alt={quote?.taskdescription}
                    rounded
                    className="img-fluid"
                  ></Image></div>
                </Col>
                <Col xs={12} sm={12} md={5} lg={5}>
                  {/*<Row>{provider.category.category}</Row>*/}

                  <Row className="mt-3">
                    <p className='h6'>Service Description:</p>
                    <p >{quote.taskdescription}</p>
                    <p className='h6'>Client Approval:</p>
                    <p>       
                    {quote.approval === "false" ? "Waiting for customer approval" : (
                    <span className="material-symbols-rounded">request_quote</span>
                    , "Approved!"
                    )}
                    </p>
                    {quote.approval === "true" ? ( 
                        
                    <div className='card address is-hidden p-3'>
                        <h3 className='h5 font-primary'>Client Name: </h3>
                        <p>{quote?.firstname} {quote?.lastname}</p>
                        <h3 className='h6 font-primary'>Client contacts: </h3>
                        <div className='button-organizer'>
                        <span className="material-symbols-rounded">
                          phone
                        </span>
                         &nbsp;{quote.phone}
                        </div>
                        <div className='button-organizer'>
                        <span className="material-symbols-rounded">
                          mail
                        </span>
                         &nbsp;{quote.email}
                        </div>
                        <h3 className='h6 font-primary mt-3'>Client Address: </h3>
                        <p>{quote?.address}, {quote.city} <br />
                        {quote?.zipcode} - {quote.country}
                        </p>
                        <button className='btn btn-primary rounded-pill color-primary' onClick={()=> getDirection(quote.address, quote.city, quote.zipcode, quote.country)}>
                            Get Directions
                        </button>

                    </div>
                   
                   ) : "" }
                  </Row>
                </Col>
                <Col xs={12} sm={12} md={5} lg={5}>
                  <Row className="mt-3 buttons-card">
                    <Col xs={12} sm={6} md={6} className="text-center my-1">

                    <p className='h6'>Price: {formatPrice(quote?.price)}</p>
                    

                     {quote.approval === "false" ? "" : (
                        <div className='button-organizer'>
                        <button
                        className="btn btn-primary rounded-pill color-primary" onClick={handleAddress}>


                          View contact

                      </button>
                      </div>
                      )
                    }


                      
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
