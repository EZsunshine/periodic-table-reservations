import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listTables, updateSeatReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationSeat() {
  const history = useHistory();
  const params = useParams();

  const [tables, setTables] = useState([]);
  const [formValue, setFormValue] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setError(null);

    listTables()
      .then(setTables)
      .catch(setError);
    return () => abortController.abort();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const tableObj = JSON.parse(formValue);
    updateSeatReservation(tableObj.table_id, params.reservation_id)
      .then((response) => {
        const newTables = tables.map((table) => {
          return table.table_id === response.table_id ? response : table
        })
        setTables(newTables);
        history.push(`/dashboard`);
      })
      .catch(setError);
  }

  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  }

  if (tables)
  {
    return (
      <div>
        <ErrorAlert error={error} />

        <h3>Seating Reservation {params.reservation_id}</h3>

        <div>
          <form onSubmit={handleSubmit} >
            <label >Table Number:</label>
            <br />
            <select name="table_id" onChange={(e) => setFormValue(e.target.value)}>
              <option value="">--Please Choose a Table--</option>
              {tables && tables.map((table) => (
                <option key={table.table_id}
                  value={JSON.stringify(table)}
                  required
                >
                  {table.table_name} - {table.capacity}
                </option>
              ))}
            </select>
            <br />
            <div>
              <button className="btn btn-primary mr-5 mt-1" type="submit">Submit</button>
              <button className="btn btn-danger mt-1" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  } else
  {
    return (
      <div>Loading...</div>
    )
  }
}

export default ReservationSeat;