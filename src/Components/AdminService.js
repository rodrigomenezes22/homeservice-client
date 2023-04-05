import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

function AdminService({
  setAuthServ,
  serviceproviderid,
  setProviderid,
  setIsAuthenticated,
  setIsSerProvider,
  providerid,
  name,
  setName,
}) {
  console.log(providerid);
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [serviceProviderData, setServiceProviderData] = useState({});
  const [categoyList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  // Check if contact data is filled up
  const [incompleteRegis, setIncompleteRegis] = useState(true);

  const [formError, setFormError] = useState("");
  const [quotesCount, setQuotesCount] = useState("");

  const navigate = useNavigate();

  const getCompleteServiceProvider = () => {
    axios
    .get(
      `${process.env.REACT_APP_SERVER_BASE_URL}/api/serviceProviders/${providerid}`
    )
    .then((res) =>   setServiceProviderData(res.data))
    .catch((e) => console.log(e));
  }


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
        getCompleteServiceProvider();
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
      localStorage.removeItem("providerId");
      setAuthServ(false);
      setAuthServ(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  // Go to add Quote page.
  const addQuote = () => {
    navigate(`/add-quotes/${providerid}`);
  };
  // Loads data
  useEffect(() => {
    getServiceProvider();
    getAllCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceProviderData({ ...serviceProviderData, [name]: value });
  };

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    console.log(`File selected: ${file}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!serviceProviderData) {
    //   return setFormError(`Service provider data is null`);
    // }
    if (serviceProviderData.username === null) {
      return setFormError(`username number can not be empty`);
    } else {
      console.log("input value is NOT empty");
    }
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
    if (serviceProviderData.state === null) {
      return setFormError(`state number can not be empty`);
    } else {
      console.log("input value is NOT empty");
    }
    if (serviceProviderData.country === null) {
      return setFormError(`country number can not be empty`);
    } else {
      console.log("input value is NOT empty");
    }
    if (serviceProviderData.zipcode === null) {
      return setFormError(`zipcode number can not be empty`);
    } else {
      console.log("input value is NOT empty");
    }
    if (serviceProviderData.address === null) {
      return setFormError(`address number can not be empty`);
    } else {
      console.log("input value is NOT empty");
    }
    if (serviceProviderData.description === null) {
      return setFormError(`description number can not be empty`);
    } else {
      console.log("input value is NOT empty");
    }

    // remove the empty key from serviceprovider object - if present
    console.log(`Data: ${JSON.stringify(serviceProviderData)}`);
    const { [""]: _, ...cleanServiceProviderData } = serviceProviderData;
    console.log(`Cleaned Data: ${JSON.stringify(cleanServiceProviderData)}`);

    const formData = new FormData();
    Object.entries(cleanServiceProviderData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("file", file);
    console.log(`Formdata: ${JSON.stringify(formData)}`);
    axios
      .put(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/serviceProviders/${providerid}`,
        formData
      )
      .then((res) => navigate("/login-service"))
      .catch((e) => console.log(e));
  };

  const editAccount = () => {
    setIncompleteRegis(true);
  }
// Go to available tass
const goToAvailableTasks = () => {
  navigate(`/available-tasks/${serviceProviderData.serviceproviderid}`)
}
const viewProfile = () => {
  navigate(`/service-provider-profile/${serviceProviderData?.serviceproviderid}`)
}

  // Go to quotes
  const goToquotes = () => {
    navigate(`/manage-quotes/${serviceProviderData.serviceproviderid}`);
  };

  return (
    <section className="admin-panel">
      <div className="container justify-content-center d-flex align-items-center">
        <div className="has-max-width mt-5">
          <h2 className="opensans font-primary mb-4">Welcome {name}</h2>
          {incompleteRegis ? (
            <form onSubmit={handleSubmit}>
              <h3 className="opensans font-primary h4 mt-3 text-start">
                Admin Service Provider Page
              </h3>
              <label for="file" className="label mt-3">
                Profile Image:
              </label>
              <input
                id="file"
                name="file"
                className="form-control"
                type="file"
                onChange={handleFileInputChange}
                required
              />
              <label for="username" className="label mt-3 form-label">
                Username:
              </label>
              <input
                type="text"
                placeholder="User name"
                className="form-control"
                name="username"
                value={serviceProviderData.username}
                onChange={handleChange}
                required
              />
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
                readOnly
              />
              <label for="Country" className="label mt-3">
                Country:
              </label>
              <input
                name="country"
                className="form-control"
                type="text"
                value={serviceProviderData.country}
                onChange={handleChange}
                required
              />
              <label for="state" className="label mt-3">
                State:
              </label>
              <input
                name="state"
                className="form-control"
                type="text"
                value={serviceProviderData.state}
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
              <label for="address" className="label mt-3">
                Address:
              </label>
              <input
                name="address"
                className="form-control"
                type="text"
                value={serviceProviderData.address}
                onChange={handleChange}
                required
              />
              <label for="zipcode" className="label mt-3">
                Zipcode:
              </label>
              <input
                name="zipcode"
                className="form-control"
                type="text"
                value={serviceProviderData.zipcode}
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
              <label for="state" className="label mt-3">
                Description:
              </label>
              <input
                name="description"
                className="form-control"
                type="text"
                value={serviceProviderData.description}
                onChange={handleChange}
                required
              />
              <button className="btn btn-primary prirmary-color mt-3 mb-3">
                Update Info
              </button>
            </form>
          ) : (
            <>

              <div className="card-admin-properties">
                <div className="card-body">
                  <div className="icon-card">
                    <span class="material-symbols-rounded font-primary icon-xxl">
                      {serviceProviderData?.categoryimage}
                    </span>
                  </div>
                  <div className="text">
                    <h3 className="font-primary h4">Welcome to your Account </h3>
                    <p>{serviceProviderData?.firstname} {serviceProviderData?.lastname} - {serviceProviderData?.category}</p>
                    
                    <p>You have {quotesCount} Quotes</p>
                  </div>
                </div>

                <div className="buttons-card">


                  <button
                    className="card-button button-primary"
                    onClick={editAccount}
                  >
                    <span class="material-symbols-rounded">edit</span>
                    <p>Edit My </p>
                    <p>Account</p>
                  </button>

                  <button
                    className="card-button button-primary"
                    onClick={viewProfile}
                  >
                    <span class="material-symbols-rounded">person</span>
                    <p>View my</p>
                    <p>Profile</p>
                  </button>

                  <button
                    className="card-button button-primary"
                    onClick={goToAvailableTasks}
                  >
                    <span class="material-symbols-rounded">task</span>
                    <p>Available Tasks </p>
                    <p>to Send Quotes</p>
                  </button>

                  <button
                    className="card-button button-primary"
                    onClick={goToquotes}
                  >
                    <span class="material-symbols-rounded">
                      request_quote
                    </span>
                    <p>Manage</p>
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
