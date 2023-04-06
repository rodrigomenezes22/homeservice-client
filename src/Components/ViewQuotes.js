import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';


function ViewQuotes() {
    
    const { id } = useParams();
    const taskid = id;
    
    const [ task, setTask ] = useState();
    const [ quotes, setQuotes ] = useState();

    const [ updateValues, setUpdateValues ] = useState(false);

    const navigate = useNavigate();

    const [approve, setApprove] = useState({
        approval: "true"
      });




    useEffect(() => {
        getTask();
        getQuotes();
    }, [id]);


    const getTask = () => {
        axios
          .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/task/${taskid}`)
          .then((res) => setTask(res.data))
          .catch((e) => console.log(e));
    }

    const getQuotes = () => {
        axios
        .get(
          `${process.env.REACT_APP_SERVER_BASE_URL}/api/quotes/task/${taskid}`
        )
        .then((res) => {
          console.log(res.data);
          setQuotes(res.data);
        })
        .catch((e) => console.log(e));
    }

    // Format price
    function formatPrice(price) {
        return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const viewProfile = (value) => {
        navigate(`/service-provider-profile/${value}`, "_blank")
    }

    const handleQuote = (value) => {
        axios
        .put(`${process.env.REACT_APP_SERVER_BASE_URL}/api/quotes/approve/${value}`, approve)
        .then((res) => {
            console.log(res.data);
            getQuotes();
        }
        )
        .catch((e) => console.log(e));
        setUpdateValues(true);
    }


  return (
    <section>
        <div className='container'>
            <h3 class="font-primary h4 pb-4 mt-5 mb-0">View and approve your the quotes for Task: </h3>
            <p>{task?.title} , Task id: #{task?.taskid}</p>
            {quotes && quotes.map((quote)=>(

                <div class="card mb-4">
                <div class="card-header color-primary m-0 text-white d-flex justify-content-between">
                    Service Provider: {quote?.firstname} {quote?.lastname} 
                    <div className='end'>
                        <div className='button-organizer'>
                        <span class="material-symbols-rounded pe-2">
                        calendar_month
                        </span>
                        Posted: {moment(quote?.duedate).utc().format("DD-MM-YYYY")}
                    </div>
                    </div>

                </div>
                <div class="card-body">
                    <div className='row'>
                        <div className='col-12 col-xs-12 col-md-12 col-lg-4'>
                            <div className='profile-thumb m-0'>
                                <img src={quote?.image} className='img-fluid' />
                            </div>
                        </div>
                        <div className='col-12 col-xs-12 col-md-12 col-lg-4'>
                        <h6 class="card-title">Service Provider info:</h6>
                        <p class="card-text">{quote?.quote_description}</p>
                            <div className='button-organizer'>
                                <span className="material-symbols-rounded">
                                phone
                                </span>&nbsp;
                                <p class="card-text">{quote?.phone}</p>
                            </div>
                            <div className='button-organizer'>
                                <span className="material-symbols-rounded">
                                mail
                                </span>&nbsp;
                                <p class="card-text">{quote?.email}</p>
                            </div>
                        <h6 class="card-title mt-3">Location info:</h6>
                        <p>{quote?.address}, {quote?.city}   <br />
                        {quote?.zipcode} - {quote?.country}
                        </p>                         
                        </div>
                        <div className='col-12 col-xs-12 col-md-12 col-lg-4'>
                            <h4 className='opensans h6'>Suggested price:</h4>
                            <h5 className='opensans h4  font-primary'>{formatPrice(quote?.price)}</h5>
                        <button className='btn btn-secondary rounded-pill color-secondary me-2' onClick={()=> viewProfile(quote?.serviceproviderid)}>View Profile</button>
                        {quote.approval !== 'true' ? (
                        <button  class="btn btn-primary rounded-pill color-primary"  onClick={()=>handleQuote(quote?.quoteid)}>Approve this Quote</button>
                        ) : (
                        <button  class="btn btn-primary rounded-pill color-green">
                            <div className='button-organizer pe-3'>
                            <span className='material-symbols-rounded icon-medium'>
                            check_circle
                            </span>    
                            &nbsp;Approved!
                            </div>
                        </button>
                        ) }

                        </div>
                    </div>
                </div>
            
                </div>
            ))}
        </div>
    </section>
  )
}

export default ViewQuotes
