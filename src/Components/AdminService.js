import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddServiceProviderForm from "./AddServiceProvider";
import axios from "axios";

function AdminService({
  setAuthServ,
  setProviderid,
  providerid,
  name,
  setName,
}) {
  console.log(providerid);

  const [serviceProviderData, setServiceProviderData] = useState({});
  const [categoyList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  // Check if contact data is filled up
  const [incompleteRegis, setIncompleteRegis] = useState(true);

  const [formError, setFormError] = useState("");
  const [quotesCount, setQuotesCount] = useState("");

  const navigate = useNavigate();

  const getServiceProvider = async () => {
    console.log(providerid);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/adminService/${providerid}`,
        {
          method: "POST",
          headers: { jwtToken: localStorage.jwtToken },
        }
      );

      const parseData = await res.json();
      console.log(parseData);

      setName(parseData.email);
      // Getting user information.
      setServiceProviderData(parseData);

      if (parseData.firstname === null) {
        setIncompleteRegis(true);
      } else if (parseData.firstname !== null) {
        setIncompleteRegis(false);
        setName(parseData.firstname);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getAllCategories = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/category`,
        {
          method: "GET",
          headers: { jwtToken: localStorage.jwtToken },
        }
      );

      const categoryData = await res.json();

      console.log(categoryData);

      setCategoryList(categoryData);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId");
      setAuthServ(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };
  const goToquotes = () => {
    navigate("/manage-quotes");
  };
  const addQuote = () => {
    navigate(`/add-quotes/${providerid}`);
  };
  useEffect(() => {
    getServiceProvider();
    getAllCategories();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceProviderData({ ...serviceProviderData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (serviceProviderData.firstname === null) {
      return setFormError(`Please enter your name`);
    } else {
      console.log("input value is NOT empty");
    }

    if (serviceProviderData.lastname === null) {
      return setFormError(`Please enter your last name`);
    } else {
      console.log("input value is NOT empty");
    }

    if (serviceProviderData.email === null) {
      return setFormError(`E-mail can not be empty`);
    } else {
      console.log("input value is NOT empty");
    }

    if (serviceProviderData.phone === null) {
      return setFormError(`Phone number can not be empty`);
    } else {
      console.log("input value is NOT empty");
    }
    if (serviceProviderData.city === null) {
      return setFormError(`city number can not be empty`);
    } else {
      console.log("input value is NOT empty");
    }

    axios
      .put(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/serviceProviders/${providerid}`,
        serviceProviderData
      )
      .then((res) => navigate("/login-service"))
      .catch((e) => console.log(e));
  };

  return (
    <section className="admin-panel">
      <div className="container justify-content-center d-flex align-items-center">
        <div className="has-max-width mt-5">
          <h2 className="opensans font-primary">Welcome {name}</h2>
          {incompleteRegis ? (
            <form onSubmit={handleSubmit}>
              <h3 className="opensans font-primary h4 mt-3 text-start">
                Admin Service Provider Page
              </h3>
              <label for="firstname" className="label mt-3">
                First Name
              </label>
              <input
                type="text"
                placeholder="First name"
                className="form-control"
                name="firstname"
                value={serviceProviderData.firstname}
                onChange={handleChange}
                required
              />
              <label for="lastname" className="label mt-3">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last name"
                className="form-control"
                name="lastname"
                value={serviceProviderData.lastname}
                onChange={handleChange}
                required
              />
              <label for="email" className="label mt-3">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={serviceProviderData.email}
                onChange={handleChange}
                required
              />
              <label for="city" className="label mt-3">
                City:
              </label>
              <input
                name="city"
                className="form-control"
                type="text"
                value={serviceProviderData.city}
                onChange={handleChange}
                required
              />

              <label for="phone" className="label mt-3">
                Phone:
              </label>
              <input
                type="number"
                placeholder="Phone"
                className="form-control"
                name="phone"
                value={serviceProviderData.phone}
                onChange={handleChange}
                required
              />

              <label for="task" className="label mt-3">
                Category:
              </label>
              <select
                name="categoryid"
                id="categoryid"
                onChange={handleChange}
                required
                value={serviceProviderData.categoryId}
                className="form-control"
              >
                <option value="">Please Select a Category</option>
                {categoyList &&
                  categoyList.map((category) => (
                    <option value={category?.categoryid}>
                      {category?.category}
                    </option>
                  ))}
              </select>
              <button className="btn btn-primary prirmary-color mt-3 mb-3">
                Update Info
              </button>
            </form>
          ) : (
            <>
              <h2 className="opensans font-primary"></h2>
              <div className="card-admin-properties">
                <div className="card-body">
                  <div className="icon-card">
                    <span class="material-symbols-rounded font-primary icon-xxl">
                      real_estate_agent
                    </span>
                  </div>
                  <div className="text">
                    <h3 className="font-primary h4">Your Quotes</h3>
                    <p>You have {quotesCount} Quotes</p>
                  </div>
                </div>

                <div className="buttons-card">
                  <button
                    className="card-button button-primary"
                    onClick={goToquotes}
                  >
                    <span class="material-symbols-rounded">
                      real_estate_agent
                    </span>
                    <p>Manage</p>
                    <p>Quotes</p>
                  </button>

                  <button
                    className="card-button button-primary"
                    onClick={addQuote}
                  >
                    <span class="material-symbols-rounded">add_box</span>
                    <p>Add</p>
                    <p>Quotes</p>
                  </button>
                </div>
              </div>
            </>
          )}

          {formError !== "" ? (
            <div className="alert alert-warning" role="alert">
              {formError}
            </div>
          ) : (
            <></>
          )}

          <button
            onClick={(e) => logout(e)}
            className="btn btn-primary color-danger rounded-pill"
          >
            <div className="button-organizer">
              Logout
              <span class="material-symbols-rounded">logout</span>
            </div>
          </button>
        </div>
      </div>
    </section>
    // <section>
    //    <div className="container admin-panel">
    //     Admin Service Provider Page
    //     <button
    //       onClick={(e) => logout(e)}
    //       className="btn btn-primary color-danger rounded-pill"
    //     >
    //       <div className="button-organizer">
    //         Logout
    //         <span class="material-symbols-rounded">logout</span>
    //       </div>
    //     </button>
    //     {incompleteRegis ? (
    //       <AddServiceProviderForm
    //         providerid={providerid}
    //         serviceProviderData={serviceProviderData}
    //       />
    //      ) : (
    //       <>
    //         <h2 className="opensans font-primary"></h2>
    //         <div className="card-admin-properties">
    //           <div className="card-body">
    //             <div className="icon-card">
    //               <span class="material-symbols-rounded font-primary icon-xxl">
    //                 real_estate_agent
    //               </span>
    //             </div>
    //             <div className="text">
    //               <h3 className="font-primary h4">Your quotes</h3>
    //               <p>You have {propertyCount} Qutoes</p>
    //             </div>
    //           </div>

    //           <div className="buttons-card">
    //             <button
    //               className="card-button button-primary"
    //               onClick={goToProperties}
    //             >
    //               <span class="material-symbols-rounded">
    //                 real_estate_agent
    //               </span>
    //               <p>Manage</p>
    //               <p>quotes</p>
    //             </button>

    //             <button
    //               className="card-button button-primary"
    //               onClick={addProperty}
    //             >
    //               <span class="material-symbols-rounded">add_box</span>
    //               <p>Add</p>
    //               <p>quotes</p>
    //             </button>
    //           </div>
    //         </div>
    //       </>
    //     )}
    //     {formError !== "" ? (
    //       <div className="alert alert-warning" role="alert">
    //         {formError}
    //       </div>
    //     ) : (
    //       <></>
    //     )}
    //   </div>
    // </section>
  );
}

export default AdminService;
