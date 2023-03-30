import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";



const TaskDetails = () => {
  const [task, setTask] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/task/${id}`)
      .then((res) => setTask(res.data))
      .catch((e) => console.log(e));
  }, [id]);


  

  return (
    <div className="container mx-auto">
      {setTask ? (
        <div className="max-w-md mx-auto my-16 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src={setTask.image}
                alt={`A ${setTask.title} ${setTask.description}`}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-lg text-indigo-500 font-semibold">
                {setTask.title}
              </div>
              <h1 className="block mt-1 text-lg leading-tight font-bold text-black">
                {setTask.description}
              </h1>
              <p className="mt-2 text-gray-500">
                <span className="text-gray-800 font-medium">Status:</span>{" "}
                {setTask.status}
              </p>
              <p className="mt-2 text-gray-500">
                <span className="text-gray-800 font-medium">Due date:</span>{" "}
                {setTask.date}
              </p>
              
              <div className="grid gap-4 grid-cols-2">
                <button className ="btn btn-primary rounded-pill button-organizer ">Submit Quote</button>  
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TaskDetails;
