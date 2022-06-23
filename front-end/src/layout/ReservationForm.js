import React from 'react';
import {useHistory} from "react-router-dom";

const ReservationForm = ({formData, setFormData, handleSubmit}) => {
    const history = useHistory();

    const handleCancel = (e) => {
        e.preventDefault();
        history.goBack();
    }

    console.log(formData);
    

  return (
    <form onSubmit={handleSubmit}>
        <header><h3>New Reservation</h3></header>

        <div>
            <label htmlFor="firstName">
                First Name:
                <input type="tex" id="firstName" name="firstName" required
                onChange={(e) => setFormData({
                    first_name: e.target.value,
                    last_name: formData.last_name,
                    mobile_number: formData.mobile_number,
                    reservation_date: formData.reservation_date,
                    reservation_time: formData.reservation_time,
                    people: formData.people,
                })}
                value={formData.first_name} />
            </label>
            <br />
            <label htmlFor="lastName">
                Last Name:
                <input type="tex" id="lastName" name="lastName" required
                onChange={(e) => setFormData({
                    first_name: formData.first_name,
                    last_name: e.target.value,
                    mobile_number: formData.mobile_number,
                    reservation_date: formData.reservation_date,
                    reservation_time: formData.reservation_time,
                    people: formData.people,
                })}
                value={formData.last_name} />
            </label>
            <br />
            <label htmlFor="phoneNumber">
                Phone Number:
                <input type="number" id="phoneNumber" name="phoneNumber" required
                onChange={(e) => setFormData({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    mobile_number: e.target.value,
                    reservation_date: formData.reservation_date,
                    reservation_time: formData.reservation_time,
                    people: formData.people,
                })}
                value={formData.mobile_number} />
            </label>
            <br />
            <label htmlFor="date">
                Reservation Date:
                <input type="date" id="date" name="date" required
                onChange={(e) => setFormData({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    mobile_number: formData.mobile_number,
                    reservation_date: e.target.value,
                    reservation_time: formData.reservation_time,
                    people: formData.people,
                })}
                value={formData.reservation_date} />
            </label>
            <br />
            <label htmlFor="time">
                Reservation Time:
                <input type="time" id="time" name="time" required
                onChange={(e) => setFormData({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    mobile_number: formData.mobile_number,
                    reservation_date: formData.reservation_date,
                    reservation_time: e.target.value,
                    people: formData.people,
                })}
                value={formData.reservation_time} />
            </label>
            <br />
            <label htmlFor="size">
                Party Size:
                <input type="number" id="size" name="size" required
                onChange={(e) => setFormData({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    mobile_number: formData.mobile_number,
                    reservation_date: formData.reservation_date,
                    reservation_time: formData.reservation_time,
                    people: e.target.valueAsNumber,
                })}
                value={formData.people} />
            </label>
            <div>
                <button>Submit</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    </form>
  )
}

export default ReservationForm