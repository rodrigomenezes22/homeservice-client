import React from 'react'
import { useParams } from "react-router-dom"

function ManageTasks() {

  const { id } = useParams();

  const propertyid = id;

  return (
    <div className="container justify-content-center d-flex align-items-center">
      <div className="has-max-width mt-5">
        <div className=" p-4">
          <h3 className="font-primary h4 pb-4">Manage your tasks</h3>
          
        </div>
      </div>
    </div>
  )
}

export default ManageTasks
