import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { format, parseISO } from "date-fns";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";

function SubmitQuotes() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const taskAndServiceProviderId = {
    taskid: location.state.taskid,
    serviceproviderid: id,
  };

  const [ isLoading, setIsLoading ] = useState(false);

  const [quote, setQuote] = useState({
    description: "",
    duedate: "",
    price: "",
    approval: false,
    taskid: "",
    serviceproviderid: "",
  });

  const [formError, setFormError] = useState("");

  console.log("********************");
  console.log(quote);
  console.log(JSON.stringify(quote));
  console.log("********************");

  useEffect(() => {
    setQuote({
      ...quote,
      ...taskAndServiceProviderId,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuote({ ...quote, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quote.description === "") {
      return setQuote(`Please enter your description `);
    } else {
      console.log("input value is not empty");
    }
    if (quote.price.toString() === "") {
      return setQuote(`Please enter the price `);
    } else {
      console.log("input value is not empty");
    }
    if (quote.duedate.toString() === "") {
      return setQuote(`Please select correct date `);
    } else {
      console.log("input value is not empty");
    }
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_SERVER_BASE_URL}/api/quotes/`, quote)
      .then((res) => {
        navigate(`/available-tasks/${id}`);
        setIsLoading(false);
    })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    console.log(formError);
  }, [setFormError]);

  const { description, price } = quote;



  return (
    <>
       {isLoading ? <Loading /> : "" }
      <div className="container justify-content-center d-flex align-items-center">
        <div className="has-max-width mt-5">
          <div className=" p-4">
            <h3 className="font-primary h4 pb-4">Submit Quotes</h3>
            <form onSubmit={handleSubmit}>
              <h3 className="opensans font-primary h4 mt-3 text-start">
                Submit Quotes:
              </h3>
              <label for="firstname" className="label mt-3">
                Description
              </label>
              <input
                type="text"
                placeholder="description"
                className="form-control"
                name="description"
                value={quote.description}
                onChange={handleChange}
              />

              <label for="date" className="label mt-3">
                Date:
              </label>
              <input
                type="date"
                placeholder="date"
                className="form-control"
                name="duedate"
                value={quote.duedate}
                onChange={handleChange}
                required
              />
              <label for="firstname" className="label mt-3">
                Price
              </label>
              <input
                type="text"
                placeholder="price"
                className="form-control"
                name="price"
                value={quote.price}
                onChange={handleChange}
              />

              <input type="hidden" className="label mt-3" name="approval" />
              <input type="hidden" className="label mt-3" name="taskid" />
              <input
                type="hidden"
                className="label mt-3"
                name="serviceproviderid"
              />
              {formError !== "" ? (
                <div className="alert alert-warning" role="alert">
                  {formError}
                </div>
              ) : (
                <></>
              )}
              <button className="btn btn-primary rounded-pill color-primary mt-4">
                <div className="button-organizer">
                  Save Quotes
                  <span class="material-symbols-rounded">add_box</span>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubmitQuotes;
