import React from 'react'
import ButtonRight from './ui/ButtonRight';
import { Navigate, useNavigate, Link } from "react-router-dom";

function Hero() {

    const navigate = useNavigate();

    const goRegister =(e)=> {
        
         navigate("/register");
    }

  return (
    <section className='hero'>
        <div className='overlay'>

        </div>
        <div className='hero-body'>
            <h1 className='text-white trykker'>Find a Service Provider 
                <span className='pacifico d-block display-2'>for your home</span>
            </h1>
            <p className='text-white mt-3 h4'>More transparency when hiring Services!</p>

            <button className="btn btn-primary rounded-pill color-primary" onClick={goRegister} >
                <div className='button-organizer'>
                    Free Fregistration 
                    <span className="material-symbols-rounded">
                    chevron_right
                    </span>
                </div>
            </button>
            <Link className="service-provider d-block" to="/register-service">Service Provider Register here!</Link>

        </div>
    </section>
  )
}

export default Hero
