import React from "react";
import { useHistory } from "react-router-dom";

const ReservationForm = ({ form, handleChange, handleSubmit }) => {
  const history = useHistory();

  return (
    <form onSubmit={handleSubmit}>
      <h3>New Reservation</h3>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">First name:</label>
        <div className="col-sm-10">
          <input
            name="first_name"
            type="text"
            value={form.first_name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Last name:</label>
        <div className="col-sm-10">
          <input
            name="last_name"
            type="text"
            value={form.last_name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Mobile Number:</label>
        <div className="col-sm-10">
          <input
            name="mobile_number"
            type="text"
            value={form.mobile_number}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Reservation Date:</label>
        <div className="col-sm-10">
          <input
            name="reservation_date"
            type="date"
            value={form.reservation_date}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Time:</label>
        <div className="col-sm-10">
          <input
            name="reservation_time"
            type="time"
            value={form.reservation_time}
            onChange={handleChange}
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
            value={form.people}
            onChange={handleChange}
          />
        </div>
      </div>

      <button className="btn btn-success" type="submit">
        Submit
      </button>
      <button className="btn btn-danger" onClick={() => history.goBack()}>
        Cancel
      </button>
    </form>
  );
};

export default ReservationForm;
