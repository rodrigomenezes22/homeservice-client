import React from 'react'

function HowItWorks() {
  return (
    <section className='mt-5 mb-5'>
      <div className='container'>
        <div className='row text-center'>
            <h1 className='trykker font-gray'>How this Website Works?</h1>
            <p className='mb-5'>Home Owners can choose to directly contact a Registered Service provider or submit a Task.</p>
        </div>
        <div className='row'>
            <div className='col-12 col-md-6 col-lg-3 how-it-works'>
                <span className='number-icon bebas display-2'>1</span>
                <h2 className='trykker h3 mt-2'>Create a Task</h2>
                <p>You register in our website and register as many properties and tasks as you need.</p>
            </div>
            <div className='col-12 col-md-6 col-lg-3 how-it-works'>
            <span className='number-icon bebas display-2'>2</span>
                <h2 className='trykker h3 mt-2'>Receive Quotes</h2>
                <p>Services providers related to your task will receive notification that a job is open, and submit a quote.</p>
            </div>
            <div className='col-12 col-md-6 col-lg-3 how-it-works'>
            <span className='number-icon bebas display-2'>3</span>
                <h2 className='trykker h3 mt-2'>Approve Quote</h2>
                <p>You can check as many quotes as you like, and approve the one you feel better with. Only the approved Service Provider will receive your contact information.</p>
            </div>
            <div className='col-12 col-md-6 col-lg-3 how-it-works'>
            <span className='number-icon bebas display-2'>4</span>
                <h2 className='trykker h3 mt-2'>Task is Done!</h2>
                <p>Service provider will contact you and schedule a date that best fits your schedule! Done!</p>
            </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
