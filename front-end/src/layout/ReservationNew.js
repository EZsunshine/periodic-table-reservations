import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import { createReservation } from "../utils/api";
import ErrorAlert from "./ErrorAlert";
import { formatAsTime, formatAsDate } from "../utils/date-time";

const ReservationNew = () => {
  const history = useHistory();

  const initial = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [form, setForm] = useState({ ...initial });
  const [showError, setShowError] = useState(false);

  function handleChange({ target }) {
    const { name, value } = target;
    switch (name) {
      case "people":
        setForm({ ...form, [name]: parseInt(value) });
        break;
      case "reservation_date":
        setForm({ ...form, [name]: formatAsDate(value) });
        break;
      case "reservation_time":
        setForm({ ...form, [name]: formatAsTime(value) });
        break;
      default:
        setForm({ ...form, [name]: value });
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowError(null);
    const reservation = {
      ...form,
      status: "booked",
    };
    createReservation(reservation)
      .then(() => {
        history.push(`/dashboard?date=${form.reservation_date}`);
      })
      .catch(setShowError);
  };

  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   setShowError(false);
  //   const newRes = {
  //     first_name: form.first_name,
  //     last_name: form.last_name,
  //     mobile_number: form.mobile_number,
  //     people: Number(form.people),
  //     reservation_date: form.reservation_date,
  //     reservation_time: form.reservation_time,
  //     status: "booked",
  //   };
  //   try {
  //     await createReservation(newRes, abortController.signal);
  //     history.push(`/dashboard?date=${newRes.reservation_date}`);
  //   } catch (error) {
  //     if (error.name !== "AbortError") setShowError(error);
  //   }

  //   return () => {
  //     abortController.abort();
  //   };
  //}

  return (
    <div>
      <ErrorAlert error={showError} />
      <ReservationForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ReservationNew;
