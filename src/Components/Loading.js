import React from 'react'

function Loading() {
  return (
    <div className='loading'>
        <div className='loading-body'>
            <h3 className='opensans font-primary h6'>Please wait, while we organize the space:</h3>
            <img src='/images/rozowa_laseczka_v2.gif' width={300} height={200} />
        </div>
    </div>
  )
}

export default Loading
