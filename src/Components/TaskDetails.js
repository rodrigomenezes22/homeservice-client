import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";



const TaskDetails = () => {
  const [item, setTask] = useState(Object);
  const { id } = useParams();
  const taskid = id;
  const navigate = useNavigate();
  console.log("taskdetails "+taskid)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/task/${taskid}`)
      .then((res) =>  setTask(res.data))
      .catch((e) => console.log(e));
  }, [taskid]);

   
  

  return (
    
    <div className="container mx-auto">

        <div className="max-w-md mx-auto my-16 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src={item.image}
                alt={`A ${item.title} ${item.description}`}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-lg text-indigo-500 font-semibold">
                {item.title}
              </div>
              <h1 className="block mt-1 text-lg leading-tight font-bold text-black">
                {item.description}
              </h1>
              <p className="mt-2 text-gray-500">
                <span className="text-gray-800 font-medium">Category:</span>{" "}
                {item.category}
              </p>
              <p className="mt-2 text-gray-500">
                <span className="text-gray-800 font-medium">Status:</span>{" "}
                {item.status}
              </p>
              <p className="mt-2 text-gray-500">
                <span className="text-gray-800 font-medium">Due date:</span>{" "}
                {item.date}
              </p>

              <div className="grid gap-4 grid-cols-2">
                <button className="btn btn-primary rounded-pill button-organizer ">Submit Quote</button>
              </div>
            </div>
          </div>
        </div>

    </div>
  );
};

export default TaskDetails;
