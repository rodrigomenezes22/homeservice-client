import React from 'react'

function ButtonRight(props) {
  return (
    <button className={props.styles} >
        <div className='button-organizer'>
            {props.name} 
            <span className="material-symbols-rounded">
            {props.icon}
            </span>
        </div>
    </button>
  )
}

export default ButtonRight