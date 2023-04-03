import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { format, parseISO } from "date-fns";

function EditTask() {
  const { id } = useParams();

  const navigate = useNavigate();

  const taskid = id;
  console.log(`TaskID: ${taskid}`);

  const [task, setTask] = useState({
    file: "",
    title: "",
    description: "",
    status: "",
    date: "",
    propertyid: "",
    image: "",
    imagedescription: "",
    categoryid: "",
  });
  const [file, setFile] = useState(null);
  const [formError, setFormError] = useState("");
  const [formattedDate, setDate] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/task/${taskid}`)
      .then((res) => {
        const dataFetch = res.data;

        setTask(dataFetch);
        const formattedDate = format(parseISO(res.data.date), "yyyy-MM-dd");
        setDate(formattedDate);
        console.log(task);
      })
      .catch((e) => console.log(e));
  }, []);
  const formData = new FormData();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
    console.log(`Value changes: ${name} - value: ${value}`);
  };

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
    console.log(`File selected: ${file}`);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    //   Check if title is empty
    if (task.title.toString().trim().length !== 0) {
      console.log("input value is NOT empty");
    } else {
      return setFormError(`Please do not send empty Title`);
    }
    //   Check if description is empty
    if (task.description.toString().trim().length !== 0) {
      console.log("input value is NOT empty");
    } else {
      return setFormError(`Please do not send empty description`);
    }
    //   Check if status is empty
    if (task.status.toString().trim().length !== 0) {
      console.log("input value is NOT empty");
    } else {
      return setFormError(`Please do not send empty status`);
    }

    //   Check if propertyid is empty
    if (task.propertyid.toString().trim().length !== 0) {
      console.log("input value is NOT empty");
    } else {
      return setFormError(`Please do not send empty propertyid`);
    }

    //   Check if categoryid is empty
    if (task.categoryid.toString().trim().length !== 0) {
      console.log("input value is NOT empty");
    } else {
      return setFormError(`Please do not send empty categoryid`);
    }

    //   Check if imagedescription is empty
    if (task.imagedescription.toString().trim().length !== 0) {
      console.log("input value is NOT empty");
    } else {
      return setFormError(`Please do not send empty imagedescription`);
    }


    task.file = file;
 
    console.log("What is this",file, task)

    axios
      .put(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/task/${taskid}`,
        task
      )
      .then((res) => navigate(`/manage-tasks/${task.propertyid}`))
      .catch((e) => console.log(e));
  };


  useEffect(() => {
    console.log(formError);
  }, [setFormError]);


  console.log("whaaaaaaaaaat", task.file)

  return (
    <>
      <div className="container justify-content-center d-flex align-items-center">
        <div className="has-max-width mt-5">
          <div className=" p-4">
            <h3 className="font-primary h4 pb-4">Edit Task</h3>
            <form onSubmit={handleSubmit}>
              <h3 className="opensans font-primary h4 mt-3 text-start"></h3>
              <label for="title" className="label mt-3">
                Title:
              </label>
              <input
                type="text"
                placeholder="Title Name"
                className="form-control"
                name="title"
                value={task.title}
                onChange={handleChange}
                required
              />
              <label for="Description" className="label mt-3">
                Description:
              </label>
              <input
                type="text"
                placeholder="Description name"
                className="form-control"
                name="description"
                value={task.description}
                onChange={handleChange}
                required
              />
              <label for="status" className="label mt-3">
                Status:
              </label>
              <select
                defaultValue={""}
                className="form-control"
                onChange={handleChange}
                required
              >
                <option value="">Please Select Task Status</option>
                <option value="Pending">Pending</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>

              <label for="date" className="label mt-3">
                Date:
              </label>
              <input
                type="date"
                placeholder="dd.mm.yy"
                className="form-control"
                name="date"
                value={formattedDate}
                onChange={handleChange}
                required
              />

              <label for="file" className="label mt-3">
                Image File:
                <input
                  name="file"
                  id="file"
                  className="form-control"
                  type="file"
                  onChange={handleFileInputChange}
                />
              </label>
              <div className="col-6">
                <img src={task.image} alt={task.title} className="img-fluid" />
              </div>
              <label for="imagedescription" className="label mt-3">
                Image Description:
                <input
                  type="text"
                  placeholder="imagedescription"
                  className="form-control"
                  name="imagedescription"
                  value={task.imagedescription}
                  onChange={handleChange}
                  required
                />
              </label>

              <input type="hidden" className="form-control" name="propertyid" />

              <br></br>
              <button type="submit" className="btn btn-primary mt-3">
                Save Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTask;
