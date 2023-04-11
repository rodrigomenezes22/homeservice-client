import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import axios from 'axios';
import CategoriesHome from './CategoriesHome';
import Loading from './Loading';

function SearchResults() {

  const navigate = useNavigate();

  const [ isLoading, setIsLoading ] = useState(false);

    const { search } = useParams();
    const { category } = useParams();
    const { city } = useParams();

    const searchTerm = search;
    const categorySearch = category;
    const citySearch = city;

    const [ serviceProviders, setServiceProviders ] = useState([]);



    const getResults = () => {
      setIsLoading(true);
        axios
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/serviceProviders/search/${searchTerm}/${categorySearch}/${citySearch}`)
        .then((res) => {
          console.log(res.data);
          setServiceProviders(res.data);
          setIsLoading(false);
        })
        .catch((e) => console.log(e));
    }

    useEffect(()=> {
        getResults();
    }, [search, category, city]);

    const viewProfile = (value) => {
      navigate(`/service-provider-profile/${value}`);
    };
  

  return (
<>
{isLoading ? <Loading /> : "" }
      <Container className='mb-5'>
        {serviceProviders.length === 0 ? "" : (
         <h1 className="mt-5 mb-5 pacifico font-primary">
         Showing the results for: {searchTerm} , {citySearch}
         </h1>
        ) }


        {serviceProviders.length === 0 ? (
        <h1 className="mt-5 mb-5 pacifico font-primary">
        Found no results with the: {searchTerm}
        </h1>

        ) : (

       
        serviceProviders.map((provider) => (
          <div key={provider.serviceproviderid}>

              <Card className="service-provider-card">
                <div className="card-header">
                  {provider.firstname} {provider.lastname}

                  <div className='end'>
                    <div className='button-organizer pe-3'>
                        <span className='material-symbols-rounded'>
                            location_on
                        </span>
                        {provider.city}
                    </div>
                  </div>
                </div>

                <Card.Body>
                  <Row>
                    <Col xs={12} sm={12} md={4} lg={2}>
                      <Image
                        src={provider.image}
                        alt={provider.username}
                        rounded
                        className="servieprovider-profile-pic"
                      ></Image>
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={10}>
                      <Row className="font-primary h4"></Row>

                      <Row>
                        <h2 className="h2 font-primary">
                          <div className="button-organizer">
                            <span className="material-symbols-rounded icon-large font-primary">
                              {provider.categoryimage}
                            </span>
                            {provider.category}
                          </div>
                        </h2>
                      </Row>
                      <Row>
                        <p className="ps-4">{provider.description}</p>
                      </Row>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6}></Col>
                  </Row>
                  <Row className="mt-3 buttons-card">
                    <Col
                      xs={12}
                      sm={6}
                      md={3}
                      className="d-flex justify-content-center my-1"
                    >
                      <button className="btn btn-primary rounded-pill button-organizer color-primary text-uppercase">
                        Call
                        <span className="material-symbols-rounded">
                          phone_in_talk
                        </span>
                      </button>
                    </Col>
                    <Col
                      xs={12}
                      sm={6}
                      md={3}
                      className="d-flex justify-content-center my-1"
                    >
                      <button
                        className="btn btn-primary rounded-pill button-organizer color-primary text-uppercase"
                        onClick={() => viewProfile(provider?.serviceproviderid)}
                      >
                        View our profile
                        <span className="material-symbols-rounded">person</span>
                      </button>
                    </Col>
                    <Col
                      xs={12}
                      sm={6}
                      md={3}
                      className="d-flex justify-content-center my-1"
                    >
                      <button className="btn btn-primary rounded-pill button-organizer color-primary text-uppercase">
                        Message
                        <span className="material-symbols-rounded">chat</span>
                      </button>
                    </Col>
                    <Col
                      xs={12}
                      sm={6}
                      md={3}
                      className="d-flex justify-content-center my-1"
                    >
                      <button className="btn btn-primary rounded-pill button-organizer color-green text-uppercase">
                        Request Quote
                        <span className="material-symbols-rounded">
                          request_quote
                        </span>
                      </button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
           
          </div>
        ))

        ) }



      </Container>
      <CategoriesHome />
    </>
       
  )
}

export default SearchResults
