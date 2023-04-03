import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from 'react-router-dom';

function CategoriesHome() {

    const navigate = useNavigate();

    const [ listOfCategories , setListOfCategories ] = useState([]);

    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/category`)
          .then((res) => {
            setListOfCategories(res.data);
          })
          .catch((e) => console.log(e));
      }, []);

      
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1921 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 1920, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
      };

      const handleClickCategory = (value) => {
        navigate(`/service-provider/${value}`)
      }


  return (
    <section className='bg-light'>
      <div className='container pt-5 pb-5'>
        <h2 className='pacifico font-primary'>Services that We Offer</h2>
        <div className='row'>
        <Carousel responsive={responsive}>
            {listOfCategories && listOfCategories.map((item)=> 
                (
                <button className='col-12 home-categories mt-3 mb-3' key={item.categoryid} onClick={()=> handleClickCategory(item.categoryid)}>
                
                <span class="material-symbols-rounded icon-xxl text-center">
                {item?.categoryimage}
                </span>
                {item?.category}
                
                </button>
                
                ))}
        </Carousel>
        </div>
      </div>
    </section>
  )
}

export default CategoriesHome
