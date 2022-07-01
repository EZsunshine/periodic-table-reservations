import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const ReservationForm = ({ handleSubmit }) => {
  const history = useHistory();
  const initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };
  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const [formData, setFormData] = useState(initialState);
  function changeHandler({ target: { name, value } }) {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function changeHandlerNum({ target: { name, value } }) {
    setFormData((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>New Reservation</h3>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">First name:</label>
        <div className="col-sm-10">
          <input
            name="first_name"
            value={formData.first_name}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Last name:</label>
        <div className="col-sm-10">
          <input
            name="last_name"
            value={formData.last_name}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Mobile Number:</label>
        <div className="col-sm-10">
          <input
            name="mobile_number"
            type="tel"
            value={formData.mobile_number}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Reservation Date:</label>
        <div className="col-sm-10">
          <input
            name="reservation_date"
            type="date"
            value={formData.reservation_date}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Time:</label>
        <div className="col-sm-10">
          <input
            name="reservation_time"
            type="time"
            value={formData.reservation_time}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Number of people:</label>
        <div className="col-sm-10">
          <input
            name="people"
            type="number"
            min={1}
            value={formData.people}
            onChange={changeHandlerNum}
          />
        </div>
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default ReservationForm;
