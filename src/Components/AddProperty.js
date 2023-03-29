import React from 'react'
import { useNavigate,  useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios';


function AddProperty({userid}) {


    
    // Sets the user data values
    const [ propertyData, setPropertyData ] = useState({
        "description": "",
        "address": "",
        "city": "",
        "state": "",
        "country":"", 
        "userid": 60,
        "zipcode": ""
    });

    const [ formError, setFormError] = useState("");

    console.log(propertyData)

    const navigate = useNavigate();

    useEffect(()=>{
        propertyData.userid = userid;
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPropertyData({ ...propertyData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (propertyData.description === "" ) {
          return setFormError(`Please enter your property Name`);
        } else {
          console.log("input value is NOT empty");
        }
    
        if (propertyData.address === "") {
          return setFormError(`Please enter your address`);
        } else {
          console.log("input value is NOT empty");
        }
    
        if (propertyData.city === "") {
          return setFormError(`City can not be empty`);
        } else {
          console.log("input value is NOT empty");
        }
    
        if (propertyData.state === "") {
          return setFormError(`State can not be empty`);
        } else {
          console.log("input value is NOT empty");
        }

        if (propertyData.country === "") {
            return setFormError(`Country can not be empty`);
          } else {
            console.log("input value is NOT empty");
          }

          if (propertyData.zipcode === "") {
            return setFormError(`Zipcode can not be empty`);
          } else {
            console.log("input value is NOT empty");
          }
        axios
          .post(`${process.env.REACT_APP_SERVER_BASE_URL}/api/property/${userid}`, propertyData)
          .then((res) => navigate("/admin"))
          .catch((e) => console.log(e));
      };

  return (
    <div className="container justify-content-center d-flex align-items-center">
        <div className="has-max-width mt-5">
            <div className=" p-4">
            <h3 className="font-primary h4 pb-4">Add a Property</h3>
            <form onSubmit={handleSubmit}>
                <h3 className="opensans font-primary h4 mt-3 text-start">Add a new Property:</h3>
                <label for="firstname" className="label mt-3">Property Name (Example:. Vacation home)</label>
                <input type="text" placeholder="Property Name" className="form-control" name="description" value={propertyData.description} onChange={handleChange} />
                <label for="address"  className="label mt-3">Address (Street name and number)</label>
                <input type="text" placeholder="Last name" className="form-control" name="address" value={propertyData.address} onChange={handleChange} />
                <label for="city"  className="label mt-3">City name:</label>
                <input type="text"  className="form-control" name="city" value={propertyData.city} onChange={handleChange} />
                <label for="state"  className="label mt-3">State: </label>
                <input type="text"  placeholder="State" className="form-control" name="state" value={propertyData.state} onChange={handleChange} />
                <label for="country"  className="label mt-3">Country: </label>
                <input type="text"  placeholder="State" className="form-control" name="country" value={propertyData.country} onChange={handleChange} />
                <input type="hidden" className="form-control" name="userid" value={userid}/>
                <label for="zipcode"  className="label mt-3">Zipcode: </label>
                <input type="text"  placeholder="zipcode" className="form-control mb-3" name="zipcode" value={propertyData.zipcode} onChange={handleChange} />
                {formError !== "" ? (
                      <div className="alert alert-warning" role="alert">
                        {formError}
                      </div>
                    ) : (
                      <></>
                    )}
                <button className="btn btn-primary rounded-pill color-primary m-2">
                    <div className='button-organizer'>
                    Add Property
                        <span class="material-symbols-rounded">
                            add_box
                        </span>
                    </div>
                </button>
                <Link className="btn btn-primary rounded-pill color-secondary  m-2" to="/admin">
                    <div className='button-organizer'>
                    <span class="material-symbols-rounded">
                        chevron_left
                    </span>
                        Back to dashboard
                    </div>
                </Link>
            </form>

            </div>
        </div>  
    </div>
  )
}

export default AddProperty
